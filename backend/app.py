"""
Flask backend for the portfolio website.
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
import db
import json
import os
import requests
from utils import Config, setup_logging, validate_contact_data, sanitize_input

# Set up logging
logger = setup_logging()

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = Config.SECRET_KEY

# Configure Flask-Mail
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True').lower() == 'true'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')
mail = Mail(app)

# Enable CORS for all routes with specific origins
CORS(app, resources={
    r"/api/*": {
        "origins": Config.CORS_ORIGINS,
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Initialize database
db.init_db()

def verify_recaptcha(token):
    """Verify reCAPTCHA token with Google."""
    try:
        logger.info("Verifying reCAPTCHA token...")
        logger.debug(f"Token: {token[:10]}...")  # Log first 10 chars for debugging
        
        response = requests.post(
            'https://www.google.com/recaptcha/api/siteverify',
            data={
                'secret': os.getenv('RECAPTCHA_SECRET_KEY'),
                'response': token
            }
        )
        result = response.json()
        logger.debug(f"reCAPTCHA response: {result}")
        
        if not result['success']:
            logger.warning(f"reCAPTCHA verification failed: {result.get('error-codes', [])}")
            return False
            
        score = result.get('score', 0)
        min_score = float(os.getenv('RECAPTCHA_MIN_SCORE', 0.5))
        
        if score < min_score:
            logger.warning(f"reCAPTCHA score too low: {score} < {min_score}")
            return False
            
        logger.info("reCAPTCHA verification successful")
        return True
    except Exception as e:
        logger.error(f"Error verifying reCAPTCHA: {str(e)}")
        return False

# API Routes
@app.route('/api/contact', methods=['POST'])
def submit_contact_form():
    """Handle contact form submissions."""
    try:
        data = request.json
        logger.info(f"Received contact form submission from {request.remote_addr}")
        
        # Verify reCAPTCHA token
        recaptcha_token = data.get('recaptchaToken')
        if not recaptcha_token:
            logger.warning("No reCAPTCHA token provided")
            return jsonify({'error': 'Missing reCAPTCHA token'}), 400
            
        if not verify_recaptcha(recaptcha_token):
            logger.warning("reCAPTCHA verification failed")
            return jsonify({'error': 'Invalid reCAPTCHA token'}), 400
        
        # Validate input data
        is_valid, error_message = validate_contact_data(data)
        if not is_valid:
            logger.warning(f"Invalid contact form submission: {error_message}")
            return jsonify({'error': error_message}), 400
        
        # Sanitize input
        sanitized_data = {
            'name': sanitize_input(data['name'], max_length=100),
            'email': sanitize_input(data['email'], max_length=100),
            'message': sanitize_input(data['message'], max_length=1000)
        }
        
        # Save to database
        db_success = db.save_contact_message(
            sanitized_data['name'],
            sanitized_data['email'],
            sanitized_data['message']
        )
        
        if not db_success:
            logger.error("Failed to save message to database")
            return jsonify({'error': 'Failed to save message'}), 500
        
        # Send email notification
        try:
            msg = Message(
                subject=f"New arina.sh Contact Form Submission from {sanitized_data['name']}",
                recipients=[os.getenv('MAIL_RECIPIENT')],
                body=f"""
                Name: {sanitized_data['name']}
                Email: {sanitized_data['email']}
                
                Message:
                {sanitized_data['message']}
                
                ---
                This message was sent from your portfolio website contact form.
                """,
                reply_to=sanitized_data['email']
            )
            mail.send(msg)
            logger.info(f"Successfully sent email notification for message from {sanitized_data['name']}")
        except Exception as e:
            logger.error(f"Failed to send email notification: {str(e)}")
            # Return error since email is a critical part of the contact form
            return jsonify({'error': 'Failed to send email notification. Please try again later.'}), 500
        
        return jsonify({'success': True, 'message': 'Message sent successfully'}), 201
            
    except Exception as e:
        logger.error(f"Unexpected error in contact form submission: {str(e)}")
        return jsonify({'error': 'An unexpected error occurred'}), 500

# Run the app
if __name__ == '__main__':
    logger.info("Starting Flask app on port 5000")
    app.run(debug=True, port=5000)

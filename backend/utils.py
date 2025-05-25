"""
Utility functions for the portfolio backend.
"""
import os
import re
from email_validator import validate_email, EmailNotValidError
from dotenv import load_dotenv
import logging
from logging.handlers import RotatingFileHandler

# Load environment variables
load_dotenv()

class Config:
    """Configuration settings for the application."""
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-here')
    DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///data/portfolio.db')
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:3000,https://www.arina.sh').split(',')
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')

def setup_logging():
    """Set up logging configuration."""
    # Create logs directory if it doesn't exist
    os.makedirs('logs', exist_ok=True)
    
    # Set up file handler
    file_handler = RotatingFileHandler(
        'logs/backend.log',
        maxBytes=10000,
        backupCount=3
    )
    file_handler.setLevel(logging.INFO)
    
    # Set up console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)
    
    # Create formatter
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)
    
    # Get the root logger
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    
    # Add handlers
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)
    
    return logger

def sanitize_input(text: str, max_length: int = 1000) -> str:
    """Sanitize input text by removing potentially harmful characters."""
    if not text:
        return ""
    # Remove any HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Remove any potentially harmful characters
    text = re.sub(r'[^\w\s@.-]', '', text)
    # Limit length
    return text[:max_length]

def validate_contact_data(data: dict) -> tuple[bool, str]:
    """Validate contact form data."""
    if not data:
        return False, "No data provided"
    
    # Validate name
    name = data.get('name', '').strip()
    if not name or len(name) > 100:
        return False, "Invalid name"
    
    # Validate email
    try:
        email = data.get('email', '').strip()
        validate_email(email)
    except EmailNotValidError:
        return False, "Invalid email address"
    
    # Validate message
    message = data.get('message', '').strip()
    if not message or len(message) > 1000:
        return False, "Invalid message"
    
    return True, "" 
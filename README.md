# Portfolio Website

Created by Arina Momajjed

A modern, responsive portfolio website built with Next.js, React, TypeScript, Tailwind CSS, SQLite, and Python.

## ⚠️ Security Notice

This repository is public, but contains sensitive configuration. **Never commit**:
- `.env` files
- `.env.local` files
- Database files
- API keys
- Secret keys
- Passwords
- reCAPTCHA keys
- Email credentials

Instead, use the provided template files:
- `backend/.env.template` for backend configuration
- `.env.template` for frontend configuration

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive
- 🎯 SEO optimized
- 🚀 Fast performance
- 📝 Blog system with markdown support
- 📬 Contact form with email notifications and database storage
- 🔄 Automatic deployment on push to main

## Deployment

This project uses GitHub Actions for automatic deployment:

### Frontend (Vercel)
- Deploys automatically when changes are pushed to main
- Environment variables are set in Vercel dashboard
- Required secrets:
  - `VERCEL_TOKEN`
  - `VERCEL_ORG_ID`
  - `VERCEL_PROJECT_ID`
  - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
  - `NEXT_PUBLIC_API_URL`

### Backend (Heroku)
- Deploys automatically when backend changes are pushed to main
- Environment variables are set in Heroku dashboard
- Required secrets:
  - `HEROKU_API_KEY`
  - `HEROKU_APP_NAME`
  - `HEROKU_EMAIL`
- Required Heroku add-ons:
  - PostgreSQL (for database)
  - Heroku Scheduler (optional, for maintenance tasks)

## Blog System

The website includes a blog system that supports markdown content. Here's how to use it:

### Creating Blog Posts

1. Create a new markdown file in the `content/blog` directory
2. Use the template file (`content/blog/template.md`) as a reference
3. Include the required frontmatter:
   ```markdown
   ---
   title: "Your Blog Post Title"
   date: "YYYY-MM-DD"
   excerpt: "A brief description of your post"
   tags: ["tag1", "tag2"]
   ---
   ```
4. Write content using markdown formatting

### Blog Features

- Markdown support with syntax highlighting
- Tag-based filtering
- Responsive design
- SEO optimized
- Automatic date formatting
- Code block syntax highlighting
- Support for images, links, and other markdown features

### Processing Blog Posts

Blog posts are processed automatically during build time.
To process them manually:

```bash
npm run process-blog
```

## Development

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   ```bash
   cp .env.template .env
   # Edit .env with your email configuration
   ```
5. Start the backend server:
   ```bash
   python app.py
   ```
6. In a new terminal, start the frontend development server:
   ```bash
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Backend Setup

The backend is built with Flask and provides the following features:

- Contact form submission handling
- Input validation and sanitization
- Email notifications for new messages
- Database storage for message history
- Environment-based configuration
- Comprehensive logging

### Environment Variables

Copy `.env.template` to `.env` and configure the following variables:

- `SECRET_KEY`: Your Flask secret key
- `FLASK_ENV`: Development or production environment
- `DATABASE_URL`: SQLite database URL
- `MAIL_SERVER`: SMTP server (e.g., smtp.gmail.com)
- `MAIL_PORT`: SMTP port (usually 587 for TLS)
- `MAIL_USE_TLS`: Whether to use TLS (True/False)
- `MAIL_USERNAME`: Your email address
- `MAIL_PASSWORD`: Your email password or app-specific password
- `MAIL_DEFAULT_SENDER`: Your email address
- `MAIL_RECIPIENT`: Email address to receive notifications
- `CORS_ORIGINS`: Allowed origins for CORS
- `LOG_LEVEL`: Logging level (INFO, DEBUG, etc.)

### Email Setup

For Gmail:
1. Enable 2-factor authentication
2. Generate an app-specific password
3. Use the app-specific password in `MAIL_PASSWORD`

### Database

Messages are stored in a SQLite database located at `data/portfolio.db`. The database is automatically initialized when the application starts.

## Building for Production

```bash
npm run build
```

## Technologies Used

- Next.js
- React
- Tailwind CSS
- TypeScript
- Markdown processing
- SQLite
- Python
- Flask
- Email validation
- Environment configuration

## License

MIT

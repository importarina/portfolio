"""
Database operations for the portfolio website.
"""
import sqlite3
import os
from typing import List, Dict, Any, Optional, Tuple

# Database file path
DB_PATH = os.path.join('data', 'portfolio.db')

def init_db():
    """Initialize the database with required tables."""
    os.makedirs('data', exist_ok=True)
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Create contact messages table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    conn.commit()
    conn.close()

def save_contact_message(name: str, email: str, message: str) -> bool:
    """Save a contact message to the database."""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute(
            'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
            (name, email, message)
        )
        
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Error saving contact message: {e}")
        return False

def get_all_contact_messages() -> List[Dict[str, Any]]:
    """Get all contact messages from the database."""
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM contact_messages ORDER BY created_at DESC')
        messages = [dict(row) for row in cursor.fetchall()]
        
        conn.close()
        return messages
    except Exception as e:
        print(f"Error getting contact messages: {e}")
        return []

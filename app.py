from flask import Flask, request, redirect, send_from_directory, flash, jsonify
import os
import fitz  # PyMuPDF
import json
from datetime import datetime

app = Flask(__name__, static_folder='dist', static_url_path='/')
app.secret_key = 'urmila_portfolio_secret_2025'

# ─────────────────────────────────────────────────────────────
# MongoDB — optional, graceful fallback if not running
# ─────────────────────────────────────────────────────────────
contacts_collection = None
try:
    from pymongo import MongoClient
    from pymongo.errors import ServerSelectionTimeoutError
    _client = MongoClient('mongodb://localhost:27017/', serverSelectionTimeoutMS=2000)
    _client.admin.command('ping')  # test connection
    _db = _client['portfolio_db']
    contacts_collection = _db['contacts']
    print("[MongoDB] Connected successfully.")
except Exception as _e:
    print(f"[MongoDB] Not available — contact messages will not be stored. ({_e})")

# ─────────────────────────────────────────────────────────────
# ROUTES FOR REACT APP
# ─────────────────────────────────────────────────────────────
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    return send_from_directory('dist', 'index.html')

# ─────────────────────────────────────────────────────────────
# CONTACT FORM API
# ─────────────────────────────────────────────────────────────
CONTACT_FILE = os.path.join(os.path.dirname(__file__), 'data', 'contact_messages.json')

def _save_contact_to_file(contact_data):
    """Always persist every message to a local JSON file."""
    os.makedirs(os.path.dirname(CONTACT_FILE), exist_ok=True)
    messages = []
    if os.path.exists(CONTACT_FILE):
        try:
            with open(CONTACT_FILE, 'r', encoding='utf-8') as f:
                messages = json.load(f)
        except (json.JSONDecodeError, IOError):
            messages = []
    messages.append(contact_data)
    with open(CONTACT_FILE, 'w', encoding='utf-8') as f:
        json.dump(messages, f, indent=2, ensure_ascii=False)

def _send_email_notification(contact_data):
    """Try to send an email notification (optional — won't crash if not configured)."""
    import smtplib
    from email.mime.text import MIMEText

    SMTP_EMAIL    = os.environ.get('SMTP_EMAIL')
    SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD')
    NOTIFY_TO     = os.environ.get('NOTIFY_TO', SMTP_EMAIL)

    if not SMTP_EMAIL or not SMTP_PASSWORD:
        return  # Email not configured — skip silently

    subject = f"Portfolio Contact from {contact_data['name']}"
    body = (
        f"Name:    {contact_data['name']}\n"
        f"Email:   {contact_data['email']}\n"
        f"Time:    {contact_data['timestamp']}\n"
        f"\nMessage:\n{contact_data['message']}"
    )
    msg = MIMEText(body, 'plain', 'utf-8')
    msg['Subject'] = subject
    msg['From']    = SMTP_EMAIL
    msg['To']      = NOTIFY_TO

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=10) as smtp:
            smtp.login(SMTP_EMAIL, SMTP_PASSWORD)
            smtp.sendmail(SMTP_EMAIL, NOTIFY_TO, msg.as_string())
        print(f"[Email] Notification sent to {NOTIFY_TO}")
    except Exception as e:
        print(f"[Email] Could not send notification: {e}")

@app.route('/contact', methods=['POST'])
def contact():
    # Allow both JSON and Form submissions
    if request.is_json:
        data = request.get_json()
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        message = data.get('message', '').strip()
    else:
        name    = request.form.get('name', '').strip()
        email   = request.form.get('email', '').strip()
        message = request.form.get('message', '').strip()

    if not name or not email or not message:
        return jsonify({"success": False, "error": "Please fill in all fields."}), 400

    contact_data = {
        "name": name,
        "email": email,
        "message": message,
        "timestamp": datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }

    try:
        _save_contact_to_file(contact_data)
        print(f"[Contact] Saved to {CONTACT_FILE}")
    except Exception as e:
        print(f"[Contact] File save error: {e}")

    if contacts_collection is not None:
        try:
            contacts_collection.insert_one(contact_data.copy())
        except Exception as e:
            print(f"[MongoDB] Insert error: {e}")

    try:
        _send_email_notification(contact_data)
    except Exception as e:
        print(f"[Email] Error: {e}")

    print(f"[Contact] From: {name} <{email}>\n{message}")

    if request.is_json:
        return jsonify({"success": True, "message": "Message sent successfully! I will get back to you soon."})
    else:
        # Fallback for normal form submission
        return redirect('/portfolio#contact')

# ─────────────────────────────────────────────────────────────
# RESUME DOWNLOAD
# ─────────────────────────────────────────────────────────────
@app.route('/resume')
def resume():
    return send_from_directory(directory='static', path='Urmila_CV.pdf', as_attachment=True)

# ─────────────────────────────────────────────────────────────
# CHATBOT API
# ─────────────────────────────────────────────────────────────
@app.route('/chat', methods=['POST'])
def chat():
    import urllib.request
    import json
    
    data       = request.get_json(silent=True) or {}
    user_input = data.get('message', '').strip()

    if not user_input:
        return jsonify({'reply': "Please ask a question."})

    api_key = os.environ.get('GROQ_API_KEY')
    if not api_key:
        return jsonify({'reply': "I'm sorry, the chatbot is currently unavailable due to missing configuration."})
    url = "https://api.groq.com/openai/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"
    }
    
    system_prompt = (
        "You are an AI assistant for Urmila Kshirsagar's portfolio. "
        "Your only job is to answer questions about Urmila, her portfolio, projects, skills, education, and contact details. "
        "Urmila is a Python Developer & AI/Data Science Student at DMCE (CGPA: 8.7). "
        "Skills: Python, Flask, Scikit-learn, Pandas, SQL, Java, HTML/CSS. "
        "She has 15+ projects (AI Career Recommender, Plagiarism Detector, Face Recognition System, Weather App). "
        "She has 8+ certifications (IBM, Google, AWS, deeplearning.ai). "
        "Contact: urmilakshirsagar1945@gmail.com. "
        "Location: Mumbai, Maharashtra, India. "
        "If a user asks about something completely unrelated to Urmila or her portfolio, politely refuse to answer and remind them that you are Urmila's portfolio assistant. "
        "Keep responses concise, friendly, and professional."
    )
    
    payload = {
        "model": "llama-3.1-8b-instant",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_input}
        ],
        "temperature": 0.3,
        "max_tokens": 150
    }
    
    try:
        req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode('utf-8'))
            reply = result['choices'][0]['message']['content']
    except Exception as e:
        print("Groq API Error:", e)
        reply = "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later or contact Urmila directly at urmilakshirsagar1945@gmail.com."

    return jsonify({'reply': reply})

# ─────────────────────────────────────────────────────────────
# RESUME ANALYZER API
# ─────────────────────────────────────────────────────────────
@app.route('/analyze_resume', methods=['POST'])
def analyze_resume_route():
    if 'resume' not in request.files:
        return jsonify({"success": False, "error": "No file uploaded."}), 400

    file = request.files['resume']
    if file.filename == '' or not file.filename.lower().endswith('.pdf'):
        return jsonify({"success": False, "error": "Please upload a valid PDF file."}), 400

    os.makedirs('resume_data', exist_ok=True)
    safe_name = os.path.basename(file.filename)
    file_path = os.path.join('resume_data', safe_name)
    file.save(file_path)

    try:
        analysis = analyze_resume(file_path)
    except Exception as e:
        print("Resume analysis error:", e)
        return jsonify({"success": False, "error": "Could not analyze the PDF. Please ensure it is a valid text PDF."}), 400

    # Since the frontend might still be using the old form submit logic, we can return HTML or JSON.
    # React uses fetch to hit API endpoints usually, but if not we can redirect.
    # We will return JSON here and update the frontend component to expect JSON.
    return jsonify({"success": True, "analysis": analysis})

# ─────────────────────────────────────────────────────────────
# HELPER FUNCTIONS
# ─────────────────────────────────────────────────────────────
def extract_text_from_pdf(file_path):
    doc  = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()
    return text.lower()

def analyze_resume(file_path):
    text = extract_text_from_pdf(file_path)

    skill_keywords = [
        "python", "flask", "machine learning", "deep learning",
        "data analysis", "react", "sql", "mongodb", "numpy",
        "pandas", "scikit", "tensorflow", "keras", "nlp",
        "computer vision", "java", "html", "css", "javascript"
    ]
    project_ideas = {
        "python":           "Build a CLI automation tool or a web scraper.",
        "machine learning": "Try building a house price predictor or sentiment analyzer.",
        "flask":            "Create a blog CMS or a REST API backend.",
        "deep learning":    "Experiment with image classification or GANs.",
        "sql":              "Build a data pipeline with SQLite or PostgreSQL.",
        "mongodb":          "Create a NoSQL-backed REST API.",
        "nlp":              "Build a chatbot or text summarization tool.",
        "computer vision":  "Try object detection with YOLO or OpenCV.",
    }

    found_skills = [s for s in skill_keywords if s in text]
    missing      = [s for s in skill_keywords[:8] if s not in found_skills]

    suggestions = (
        f"Consider adding these to your resume: {', '.join(missing[:4])}."
        if missing else
        "Excellent! Your resume covers all key skill areas."
    )
    ideas = list({project_ideas[s] for s in found_skills if s in project_ideas})[:3]

    return {
        "skills":      ', '.join(found_skills) if found_skills else "No major skills detected",
        "suggestions": suggestions,
        "projects":    ' | '.join(ideas) if ideas else "Explore more ML/NLP/CV projects",
    }

# ─────────────────────────────────────────────────────────────
# RUN — use_reloader=False is critical for OneDrive stability
# ─────────────────────────────────────────────────────────────
if __name__ == '__main__':
    app.run(debug=True, use_reloader=False, port=5000)

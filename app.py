from flask import Flask, request, redirect, send_from_directory, flash, jsonify
import os
import fitz  # PyMuPDF
import json
from datetime import datetime

app = Flask(__name__)
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
    if path.startswith('assets/'):
        return send_from_directory('dist/assets', path[7:])
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

    SMTP_EMAIL    = os.environ.get('SMTP_EMAIL', 'urmilakshirsagar1945@gmail.com')       # your Gmail address
    SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', 'mywy prws svft hpop')    # Gmail App Password
    NOTIFY_TO     = os.environ.get('NOTIFY_TO', 'urmilakshirsagar1945@gmail.com')

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
    data       = request.get_json(silent=True) or {}
    user_input = data.get('message', '').lower().strip()

    if any(g in user_input for g in ['hi', 'hello', 'hey', 'hii', 'helo']):
        reply = "Hello! I'm Urmila's portfolio assistant. Ask me about her skills, projects, education, or how to contact her!"
    elif any(k in user_input for k in ['skill', 'language', 'tech', 'know']):
        reply = "Urmila is skilled in Python, Flask, Scikit-learn, Pandas, SQL, Java, HTML/CSS and more. She also works with Git, Jupyter Notebook and Google Colab!"
    elif any(k in user_input for k in ['project', 'built', 'work', 'made']):
        reply = "Urmila has 15+ projects including an AI Career Recommender, Plagiarism Detector, Face Recognition System, Weather App, and more. Check /projects to see them all!"
    elif any(k in user_input for k in ['education', 'college', 'study', 'cgpa', 'grade', 'score']):
        reply = "She is pursuing B.E. in AI & Data Science at DMCE (CGPA: 8.7). Previously scored 85% in HSC and 93% in SSC!"
    elif any(k in user_input for k in ['contact', 'reach', 'email', 'hire', 'connect']):
        reply = "You can reach Urmila at urmilakshirsagar1945@gmail.com, or connect via LinkedIn and GitHub. Links are in the Contact section!"
    elif any(k in user_input for k in ['certificate', 'cert', 'course', 'award']):
        reply = "Urmila has 8+ certifications from IBM, Google, AWS, deeplearning.ai and more! Visit /certificates to see them all."
    elif any(k in user_input for k in ['thank', 'thanks', 'great', 'awesome', 'nice']):
        reply = "You are most welcome! Feel free to explore the portfolio or drop a message in the contact section!"
    elif any(k in user_input for k in ['name', 'who', 'about', 'tell me']):
        reply = "I'm the AI assistant for Urmila Kshirsagar's portfolio — a Python Developer & AI enthusiast from Mumbai, India!"
    elif any(k in user_input for k in ['location', 'from', 'where', 'city']):
        reply = "Urmila is based in Mumbai, Maharashtra, India. She is currently studying at DMCE, Airoli."
    else:
        reply = "I'm here to help! Try asking about Urmila's skills, projects, education, certificates, location or contact info."

    return jsonify({'reply': reply})

# ─────────────────────────────────────────────────────────────
# RESUME ANALYZER API
# ─────────────────────────────────────────────────────────────
@app.route('/analyze_resume', methods=['POST'])
def analyze_resume_route():
    if 'resume' not in request.files:
        return jsonify({"success": False, "error": "No file uploaded."}), 400

    file = request.files['resume']
    if file.filename == '' or not file.filename.endswith('.pdf'):
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

"""
fix_portfolio.py — Rewrites all broken/missing OneDrive templates
and CSS with premium enhanced versions.
Run once, then restart app.py (with --no-reload for OneDrive stability).
"""
import os

BASE       = r"c:\Users\URMILA\OneDrive\Documents\Desktop\Portfolio"
TEMPLATES  = os.path.join(BASE, "templates")
STATIC     = os.path.join(BASE, "static")

# ─────────────────────────────────────────────────────────────
# SHARED BASE TEMPLATE FUNCTION
# ─────────────────────────────────────────────────────────────
def page(title, body, extra_head=""):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{title} | Urmila Kshirsagar</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{{% raw %}}{{{{ url_for('static', filename='style.css') }}}}{{% endraw %}}">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <script defer src="{{% raw %}}{{{{ url_for('static', filename='script.js') }}}}{{% endraw %}}"></script>
  {extra_head}
</head>
<body>
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="orb orb-3"></div>
  <canvas id="particles-canvas"></canvas>
  <header class="header" id="main-header">
    <div class="logo">UK</div>
    <nav class="navbar" id="main-nav">
      <a href="/portfolio">Home</a>
      <a href="/projects">Projects</a>
      <a href="/certificates">Certificates</a>
      <a href="/knowledge">Knowledge</a>
      <a href="/portfolio#contact">Contact</a>
      <a href="/resume_analyzer" class="resume-analyzer-icon"><i class="fas fa-magic"></i>&nbsp;AI Resume</a>
      <button id="theme-toggle" class="theme-toggle" title="Toggle Dark Mode"><i class="fas fa-moon"></i></button>
    </nav>
    <button class="nav-hamburger" id="nav-hamburger"><i class="fas fa-bars"></i></button>
  </header>
{body}
  <footer class="footer">
    <div class="footer-content">
      <h3>Urmila Kshirsagar</h3>
      <p>Python Developer &middot; AI Enthusiast &middot; Lifelong Learner</p>
      <div class="footer-social">
        <a href="https://github.com/Urmila1945" target="_blank"><i class="fab fa-github"></i></a>
        <a href="https://linkedin.com/in/urmila-kshirsagar-97b9a9276/" target="_blank"><i class="fab fa-linkedin"></i></a>
        <a href="mailto:urmilakshirsagar1945@gmail.com"><i class="fas fa-envelope"></i></a>
      </div>
    </div>
    <div class="footer-bottom"><p>&copy; 2025 Urmila Kshirsagar &nbsp;&middot;&nbsp; Crafted with <span style="color:#a855f7">&#9829;</span> &amp; Python</p></div>
  </footer>
</body>
</html>"""

# ─────────────────────────────────────────────────────────────
# FIX Jinja raw tags — remove the placeholder we used above
# ─────────────────────────────────────────────────────────────
def fix(s):
    return s.replace("{% raw %}", "").replace("{% endraw %}", "")

# ─────────────────────────────────────────────────────────────
# PROJECTS PAGE
# ─────────────────────────────────────────────────────────────
projects_body = """
  <main style="padding-top:90px; min-height:80vh;">
    <section style="padding:60px 8%; text-align:center;">
      <h1 class="section-title reveal">My Projects</h1>
      <span class="section-accent reveal"></span>
      <p class="section-subtitle reveal">Things I have built — from AI systems to web apps.</p>

      <div class="card-container stagger-children">

        <div class="info-card reveal">
          <div class="card-icon">&#129302;</div>
          <h3>AI Career Recommender</h3>
          <p>ML-based system that recommends career paths based on skills, interests, and academic background using classification algorithms.</p>
          <div class="card-tags"><span class="skill-tag">Python</span><span class="skill-tag cyan">Scikit-learn</span><span class="skill-tag">Flask</span></div>
          <a href="https://github.com/Urmila1945" target="_blank" class="card-link"><i class="fab fa-github"></i> View Code</a>
        </div>

        <div class="info-card reveal">
          <div class="card-icon">&#128202;</div>
          <h3>Plagiarism Detector</h3>
          <p>NLP-powered tool to detect text similarity and plagiarism across documents using cosine similarity and TF-IDF vectorization.</p>
          <div class="card-tags"><span class="skill-tag">Python</span><span class="skill-tag cyan">NLP</span><span class="skill-tag">Flask</span></div>
          <a href="https://github.com/Urmila1945" target="_blank" class="card-link"><i class="fab fa-github"></i> View Code</a>
        </div>

        <div class="info-card reveal">
          <div class="card-icon">&#127775;</div>
          <h3>Weather App</h3>
          <p>Real-time weather application with location search, 5-day forecast, and dynamic UI updates using the OpenWeather API.</p>
          <div class="card-tags"><span class="skill-tag">Python</span><span class="skill-tag cyan">REST API</span><span class="skill-tag">Flask</span></div>
          <a href="https://github.com/Urmila1945" target="_blank" class="card-link"><i class="fab fa-github"></i> View Code</a>
        </div>

        <div class="info-card reveal">
          <div class="card-icon">&#127919;</div>
          <h3>Student Performance Predictor</h3>
          <p>Predicts student exam scores using regression models trained on study hours, attendance, and previous grades datasets.</p>
          <div class="card-tags"><span class="skill-tag">ML</span><span class="skill-tag cyan">Pandas</span><span class="skill-tag">Matplotlib</span></div>
          <a href="https://github.com/Urmila1945" target="_blank" class="card-link"><i class="fab fa-github"></i> View Code</a>
        </div>

        <div class="info-card reveal">
          <div class="card-icon">&#128064;</div>
          <h3>Face Recognition System</h3>
          <p>Computer vision project using OpenCV and deep learning to detect and recognize faces in real-time from webcam feed.</p>
          <div class="card-tags"><span class="skill-tag">OpenCV</span><span class="skill-tag cyan">Deep Learning</span><span class="skill-tag">Python</span></div>
          <a href="https://github.com/Urmila1945" target="_blank" class="card-link"><i class="fab fa-github"></i> View Code</a>
        </div>

        <div class="info-card reveal">
          <div class="card-icon">&#128203;</div>
          <h3>Portfolio Website</h3>
          <p>This very portfolio! Built with Flask, MongoDB for contact storage, AI Resume Analyzer, chatbot, and smooth animations.</p>
          <div class="card-tags"><span class="skill-tag">Flask</span><span class="skill-tag cyan">MongoDB</span><span class="skill-tag">CSS</span></div>
          <a href="https://github.com/Urmila1945" target="_blank" class="card-link"><i class="fab fa-github"></i> View Code</a>
        </div>

      </div>
    </section>
  </main>
"""

# ─────────────────────────────────────────────────────────────
# CERTIFICATES PAGE
# ─────────────────────────────────────────────────────────────
certs_body = """
  <main style="padding-top:90px; min-height:80vh;">
    <section style="padding:60px 8%; text-align:center;">
      <h1 class="section-title reveal">Certificates</h1>
      <span class="section-accent reveal"></span>
      <p class="section-subtitle reveal">Verified achievements and professional credentials.</p>

      <div class="card-container stagger-children">

        <div class="cert-card reveal">
          <div class="cert-icon"><i class="fab fa-python"></i></div>
          <div class="cert-body">
            <h3>Python for Data Science</h3>
            <p class="cert-issuer"><i class="fas fa-award"></i> IBM / Coursera</p>
            <p class="cert-date">2024</p>
            <span class="cert-badge">Verified</span>
          </div>
        </div>

        <div class="cert-card reveal">
          <div class="cert-icon"><i class="fas fa-brain"></i></div>
          <div class="cert-body">
            <h3>Machine Learning A-Z</h3>
            <p class="cert-issuer"><i class="fas fa-award"></i> Udemy</p>
            <p class="cert-date">2024</p>
            <span class="cert-badge">Verified</span>
          </div>
        </div>

        <div class="cert-card reveal">
          <div class="cert-icon"><i class="fab fa-google"></i></div>
          <div class="cert-body">
            <h3>Google Data Analytics</h3>
            <p class="cert-issuer"><i class="fas fa-award"></i> Google / Coursera</p>
            <p class="cert-date">2023</p>
            <span class="cert-badge">Verified</span>
          </div>
        </div>

        <div class="cert-card reveal">
          <div class="cert-icon"><i class="fab fa-aws"></i></div>
          <div class="cert-body">
            <h3>AWS Cloud Foundations</h3>
            <p class="cert-issuer"><i class="fas fa-award"></i> Amazon Web Services</p>
            <p class="cert-date">2024</p>
            <span class="cert-badge">Verified</span>
          </div>
        </div>

        <div class="cert-card reveal">
          <div class="cert-icon"><i class="fas fa-database"></i></div>
          <div class="cert-body">
            <h3>SQL for Beginners</h3>
            <p class="cert-issuer"><i class="fas fa-award"></i> HackerRank</p>
            <p class="cert-date">2023</p>
            <span class="cert-badge">Verified</span>
          </div>
        </div>

        <div class="cert-card reveal">
          <div class="cert-icon"><i class="fas fa-code"></i></div>
          <div class="cert-body">
            <h3>Web Development Bootcamp</h3>
            <p class="cert-issuer"><i class="fas fa-award"></i> Udemy</p>
            <p class="cert-date">2023</p>
            <span class="cert-badge">Verified</span>
          </div>
        </div>

        <div class="cert-card reveal">
          <div class="cert-icon"><i class="fas fa-robot"></i></div>
          <div class="cert-body">
            <h3>Deep Learning Specialization</h3>
            <p class="cert-issuer"><i class="fas fa-award"></i> deeplearning.ai</p>
            <p class="cert-date">2024</p>
            <span class="cert-badge">Verified</span>
          </div>
        </div>

        <div class="cert-card reveal">
          <div class="cert-icon"><i class="fas fa-chart-line"></i></div>
          <div class="cert-body">
            <h3>Data Visualization with Python</h3>
            <p class="cert-issuer"><i class="fas fa-award"></i> IBM / Coursera</p>
            <p class="cert-date">2024</p>
            <span class="cert-badge">Verified</span>
          </div>
        </div>

      </div>
    </section>
  </main>
"""

# ─────────────────────────────────────────────────────────────
# KNOWLEDGE PAGE
# ─────────────────────────────────────────────────────────────
knowledge_body = """
  <main style="padding-top:90px; min-height:80vh;">
    <section style="padding:60px 8%; text-align:center;">
      <h1 class="section-title reveal">Areas of Knowledge</h1>
      <span class="section-accent reveal"></span>
      <p class="section-subtitle reveal">Technologies and domains I have explored in depth.</p>

      <div class="card-container stagger-children">
        <div class="info-card reveal"><div class="card-icon">&#129302;</div><h3>Artificial Intelligence</h3><p>Deep Learning, Computer Vision, NLP and building intelligent systems that learn and adapt.</p></div>
        <div class="info-card reveal"><div class="card-icon">&#128202;</div><h3>Data Science</h3><p>End-to-end data pipelines using Pandas, NumPy, Scikit-learn, and Matplotlib for insights.</p></div>
        <div class="info-card reveal"><div class="card-icon">&#127760;</div><h3>Web Development</h3><p>Full-stack apps with Flask, REST APIs, HTML/CSS/JS, and responsive design principles.</p></div>
        <div class="info-card reveal"><div class="card-icon">&#129504;</div><h3>Machine Learning</h3><p>Regression, classification, clustering, ensemble methods, and model evaluation techniques.</p></div>
        <div class="info-card reveal"><div class="card-icon">&#128451;</div><h3>Database Management</h3><p>SQL, MongoDB, data modelling, indexing, and efficient query design for scalable storage.</p></div>
        <div class="info-card reveal"><div class="card-icon">&#128736;</div><h3>Version Control</h3><p>Git, GitHub workflows, branching strategies, PRs and collaborative development practices.</p></div>
        <div class="info-card reveal"><div class="card-icon">&#9729;</div><h3>Cloud Computing</h3><p>AWS fundamentals — EC2, S3, IAM — for deploying and scaling applications in the cloud.</p></div>
        <div class="info-card reveal"><div class="card-icon">&#128187;</div><h3>Programming</h3><p>Python, Java, C — from algorithms and DSA to object-oriented and functional paradigms.</p></div>
        <div class="info-card reveal"><div class="card-icon">&#128200;</div><h3>Data Visualization</h3><p>Creating meaningful charts with Matplotlib, Seaborn, and interactive dashboards.</p></div>
      </div>

      <!-- Scrolling Tech Logos -->
      <div class="tech-logos-wrapper reveal" style="margin-top:3rem;">
        <p class="section-subtitle" style="margin-bottom:1.5rem;">Technologies I Work With</p>
        <div class="tech-logos">
          <div class="tech-logos-track">
            <img src="{{ url_for('static', filename='images/python.png') }}" alt="Python">
            <img src="{{ url_for('static', filename='images/html.png') }}" alt="HTML">
            <img src="{{ url_for('static', filename='images/css.png') }}" alt="CSS">
            <img src="{{ url_for('static', filename='images/js.jpg') }}" alt="JavaScript">
            <img src="{{ url_for('static', filename='images/ml.jpeg') }}" alt="Machine Learning">
            <img src="{{ url_for('static', filename='images/nlp.png') }}" alt="NLP">
            <img src="{{ url_for('static', filename='images/mongodb.jpeg') }}" alt="MongoDB">
            <img src="{{ url_for('static', filename='images/java.png') }}" alt="Java">
            <img src="{{ url_for('static', filename='images/mysql.png') }}" alt="MySQL">
            <img src="{{ url_for('static', filename='images/react.png') }}" alt="React">
            <img src="{{ url_for('static', filename='images/c.jpeg') }}" alt="C Programming">
            <img src="{{ url_for('static', filename='images/github.png') }}" alt="GitHub">
            <!-- Duplicate for seamless loop -->
            <img src="{{ url_for('static', filename='images/python.png') }}" alt="Python">
            <img src="{{ url_for('static', filename='images/html.png') }}" alt="HTML">
            <img src="{{ url_for('static', filename='images/css.png') }}" alt="CSS">
            <img src="{{ url_for('static', filename='images/js.jpg') }}" alt="JavaScript">
            <img src="{{ url_for('static', filename='images/ml.jpeg') }}" alt="Machine Learning">
            <img src="{{ url_for('static', filename='images/nlp.png') }}" alt="NLP">
            <img src="{{ url_for('static', filename='images/mongodb.jpeg') }}" alt="MongoDB">
            <img src="{{ url_for('static', filename='images/java.png') }}" alt="Java">
            <img src="{{ url_for('static', filename='images/mysql.png') }}" alt="MySQL">
            <img src="{{ url_for('static', filename='images/react.png') }}" alt="React">
            <img src="{{ url_for('static', filename='images/c.jpeg') }}" alt="C">
            <img src="{{ url_for('static', filename='images/github.png') }}" alt="GitHub">
          </div>
        </div>
      </div>
    </section>
  </main>
"""

# ─────────────────────────────────────────────────────────────
# RESUME ANALYZER PAGE
# ─────────────────────────────────────────────────────────────
resume_body = """
  <main style="padding-top:90px; min-height:80vh;">
    <section style="padding:60px 8%; text-align:center;">
      <h1 class="section-title reveal">AI Resume Analyzer</h1>
      <span class="section-accent reveal"></span>
      <p class="section-subtitle reveal">Upload your resume PDF to get instant AI-powered skill analysis and suggestions.</p>

      <div class="resume-upload-card reveal">
        <div class="resume-icons">
          <i class="fas fa-file-pdf"></i>
          <i class="fas fa-arrow-right"></i>
          <i class="fas fa-robot"></i>
          <i class="fas fa-arrow-right"></i>
          <i class="fas fa-chart-bar"></i>
        </div>
        <form action="/analyze_resume" method="POST" enctype="multipart/form-data" class="upload-form">
          <label class="upload-label" for="resume-file">
            <i class="fas fa-cloud-upload-alt"></i>
            <span>Drop your PDF here or click to browse</span>
            <input type="file" id="resume-file" name="resume" accept=".pdf" required>
          </label>
          <button type="submit" class="btn glow-btn" style="margin-top:1.5rem;">
            <i class="fas fa-magic"></i> Analyze Resume
          </button>
        </form>
      </div>

      {% if analysis %}
      <div class="analysis-results reveal">
        <h2 style="color:var(--accent-1);margin-bottom:2rem;font-family:var(--font-display);">Analysis Results</h2>
        <div class="result-grid">
          <div class="result-card">
            <i class="fas fa-check-circle" style="color:#10b981;font-size:2rem;margin-bottom:1rem;"></i>
            <h3>Skills Found</h3>
            <p>{{ analysis.skills }}</p>
          </div>
          <div class="result-card">
            <i class="fas fa-lightbulb" style="color:var(--accent-3);font-size:2rem;margin-bottom:1rem;"></i>
            <h3>Suggestions</h3>
            <p>{{ analysis.suggestions }}</p>
          </div>
          <div class="result-card">
            <i class="fas fa-rocket" style="color:var(--accent-2);font-size:2rem;margin-bottom:1rem;"></i>
            <h3>Project Ideas</h3>
            <p>{{ analysis.projects }}</p>
          </div>
        </div>
      </div>
      {% endif %}
    </section>
  </main>
"""

# ─────────────────────────────────────────────────────────────
# BLOG PAGE (was missing/broken — add a coming soon)
# ─────────────────────────────────────────────────────────────
blog_body = """
  <main style="padding-top:90px; min-height:80vh; display:flex; align-items:center; justify-content:center; text-align:center; padding:120px 8%;">
    <div class="reveal">
      <div style="font-size:5rem;margin-bottom:1.5rem;">&#128221;</div>
      <h1 class="section-title">Blog &amp; Articles</h1>
      <span class="section-accent" style="margin:1rem auto 2rem;"></span>
      <p class="section-subtitle" style="max-width:450px; margin:0 auto 2rem;">
        I'm working on sharing my learnings, project deep-dives, and AI insights here. Coming soon!
      </p>
      <a href="/portfolio" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Back to Portfolio</a>
    </div>
  </main>
"""

# ─────────────────────────────────────────────────────────────
# WELCOME PAGE
# ─────────────────────────────────────────────────────────────
welcome_html = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Welcome - Urmila Kshirsagar</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background: #050511;
      color: #f1f5f9;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    canvas#bg { position:fixed; inset:0; z-index:0; }

    /* Orbs */
    .orb { position:fixed; border-radius:50%; filter:blur(100px); pointer-events:none; z-index:0; }
    .orb-a { width:600px; height:600px; background:radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%); top:-200px; left:-200px; animation:orbMove 18s ease-in-out infinite; }
    .orb-b { width:500px; height:500px; background:radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%); bottom:-150px; right:-150px; animation:orbMove 22s ease-in-out infinite reverse; }
    .orb-c { width:300px; height:300px; background:radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%); top:50%; left:50%; transform:translate(-50%,-50%); animation:orbMove 15s ease-in-out infinite 3s; }
    @keyframes orbMove {
      0%,100% { transform:translate(0,0) scale(1); }
      33% { transform:translate(50px,-70px) scale(1.15); }
      66% { transform:translate(-40px,50px) scale(0.9); }
    }

    /* Grid overlay */
    body::before {
      content:'';
      position:fixed; inset:0; z-index:0;
      background-image: linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events:none;
    }

    /* Main card */
    .card {
      position:relative; z-index:1;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(139,92,246,0.2);
      backdrop-filter: blur(20px);
      border-radius: 28px;
      padding: 3.5rem 4rem;
      max-width: 680px;
      width: 90%;
      text-align: center;
      box-shadow: 0 0 80px rgba(139,92,246,0.15), 0 30px 60px rgba(0,0,0,0.4);
      animation: cardIn 0.9s cubic-bezier(0.34,1.56,0.64,1) both;
    }
    @keyframes cardIn {
      from { opacity:0; transform:translateY(60px) scale(0.9); }
      to   { opacity:1; transform:translateY(0) scale(1); }
    }

    /* Badge */
    .badge {
      display:inline-flex; align-items:center; gap:8px;
      background:rgba(139,92,246,0.15);
      border:1px solid rgba(139,92,246,0.4);
      color:#a78bfa; padding:0.35rem 1rem;
      border-radius:50px; font-size:0.8rem; font-weight:600;
      margin-bottom:2rem;
      animation:badgeFade 0.6s ease 0.4s both;
    }
    @keyframes badgeFade { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
    .badge .dot { width:8px;height:8px;background:#a78bfa;border-radius:50%;animation:pulse 1.5s ease-in-out infinite; }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.6)} }

    /* Name */
    .greeting { font-size:1rem; color:#64748b; margin-bottom:0.5rem; letter-spacing:2px; text-transform:uppercase; animation:fadeUp 0.7s ease 0.5s both; }
    h1 {
      font-family:'Space Grotesk',sans-serif;
      font-size:clamp(2.8rem,7vw,5rem);
      font-weight:800; letter-spacing:-3px; line-height:1;
      margin-bottom:1.2rem;
      background:linear-gradient(135deg,#f1f5f9 20%,#a78bfa 55%,#06b6d4 85%);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      animation:fadeUp 0.7s ease 0.6s both;
    }
    .tagline {
      color:#64748b; font-size:0.95rem; margin-bottom:2.5rem;
      letter-spacing:0.3px; line-height:1.7;
      animation:fadeUp 0.7s ease 0.7s both;
    }
    .tagline strong { color:#94a3b8; }

    /* Roles typing */
    .roles-row {
      display:flex; justify-content:center; flex-wrap:wrap; gap:0.6rem;
      margin-bottom:2.5rem;
      animation:fadeUp 0.7s ease 0.75s both;
    }
    .role-chip {
      background:rgba(255,255,255,0.05);
      border:1px solid rgba(139,92,246,0.25);
      border-radius:50px; padding:0.35rem 1rem;
      font-size:0.8rem; font-weight:500; color:#cbd5e1;
      transition:all 0.3s ease;
    }
    .role-chip:hover { background:rgba(139,92,246,0.2); border-color:#a78bfa; color:#f1f5f9; transform:translateY(-2px); }

    /* CTA */
    .cta-row { display:flex; justify-content:center; gap:1rem; flex-wrap:wrap; margin-bottom:2.5rem; animation:fadeUp 0.7s ease 0.85s both; }
    .btn-enter {
      display:inline-flex; align-items:center; gap:10px;
      padding:0.85rem 2.2rem;
      background:linear-gradient(135deg,#8b5cf6,#6d28d9);
      color:white; border-radius:50px; text-decoration:none;
      font-weight:700; font-size:1rem;
      box-shadow:0 6px 30px rgba(139,92,246,0.45);
      transition:all 0.3s ease; position:relative; overflow:hidden;
    }
    .btn-enter::before { content:''; position:absolute; top:0;left:-100%;width:100%;height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent); transition:left 0.5s; }
    .btn-enter:hover::before { left:100%; }
    .btn-enter:hover { transform:translateY(-3px); box-shadow:0 12px 40px rgba(139,92,246,0.65); }
    .btn-enter i { transition:transform 0.3s; }
    .btn-enter:hover i { transform:translateX(5px); }
    .btn-ghost {
      display:inline-flex; align-items:center; gap:8px;
      padding:0.85rem 2rem;
      background:transparent; color:#94a3b8;
      border:1px solid rgba(139,92,246,0.3);
      border-radius:50px; text-decoration:none;
      font-weight:500; font-size:1rem;
      transition:all 0.3s ease;
    }
    .btn-ghost:hover { border-color:#a78bfa; color:#f1f5f9; background:rgba(139,92,246,0.1); transform:translateY(-2px); }

    /* Socials */
    .socials { display:flex; justify-content:center; gap:0.75rem; animation:fadeUp 0.7s ease 0.95s both; }
    .socials a {
      display:flex; align-items:center; justify-content:center;
      width:42px; height:42px; border-radius:12px;
      background:rgba(255,255,255,0.04);
      border:1px solid rgba(139,92,246,0.2);
      color:#64748b; font-size:1rem; text-decoration:none;
      transition:all 0.3s ease;
    }
    .socials a:hover { color:#a78bfa; background:rgba(139,92,246,0.15); border-color:#a78bfa; transform:translateY(-3px); box-shadow:0 6px 20px rgba(139,92,246,0.3); }

    /* Stats row */
    .stats-row { display:flex; justify-content:center; gap:2.5rem; margin-top:2.5rem; padding-top:2rem; border-top:1px solid rgba(255,255,255,0.06); animation:fadeUp 0.7s ease 1.05s both; }
    .stat { text-align:center; }
    .stat-num { font-family:'Space Grotesk',sans-serif; font-size:2rem; font-weight:800; background:linear-gradient(135deg,#a78bfa,#06b6d4); -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
    .stat-lbl { font-size:0.75rem; color:#475569; margin-top:2px; }

    @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

    /* Floating particles from JS */
    .particle { position:fixed; border-radius:50%; pointer-events:none; z-index:0; animation:floatP linear infinite; }
    @keyframes floatP { from{transform:translateY(100vh) scale(0)} to{transform:translateY(-10vh) scale(1); opacity:0;} }
  </style>
</head>
<body>
  <canvas id="bg"></canvas>
  <div class="orb orb-a"></div>
  <div class="orb orb-b"></div>
  <div class="orb orb-c"></div>

  <div class="card">
    <div class="badge"><span class="dot"></span> Open to Opportunities</div>
    <p class="greeting">Hello, I'm</p>
    <h1>Urmila Kshirsagar</h1>
    <p class="tagline">
      <strong>AI &amp; Data Science Student</strong> &middot; Python Developer<br>
      Building intelligent apps at the intersection of code and creativity.
    </p>

    <div class="roles-row">
      <span class="role-chip">&#129302; Machine Learning</span>
      <span class="role-chip">&#128202; Data Science</span>
      <span class="role-chip">&#127760; Web Development</span>
      <span class="role-chip">&#129504; Computer Vision</span>
      <span class="role-chip">&#9889; Flask &amp; APIs</span>
    </div>

    <div class="cta-row">
      <a href="/portfolio" class="btn-enter" id="enter-btn">
        Enter Portfolio <i class="fas fa-arrow-right"></i>
      </a>
      <a href="{{ url_for('static', filename='Urmila_CV.pdf') }}" download class="btn-ghost">
        <i class="fas fa-download"></i> Download CV
      </a>
    </div>

    <div class="socials">
      <a href="https://github.com/Urmila1945" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
      <a href="https://www.linkedin.com/in/urmila-kshirsagar-97b9a9276/" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
      <a href="mailto:urmilakshirsagar1945@gmail.com" aria-label="Email"><i class="fas fa-envelope"></i></a>
      <a href="/projects" aria-label="Projects"><i class="fas fa-code"></i></a>
    </div>

    <div class="stats-row">
      <div class="stat"><div class="stat-num">15+</div><div class="stat-lbl">Projects</div></div>
      <div class="stat"><div class="stat-num">8+</div><div class="stat-lbl">Certificates</div></div>
      <div class="stat"><div class="stat-num">8.7</div><div class="stat-lbl">CGPA</div></div>
    </div>
  </div>

  <script>
    // Particle canvas background
    const canvas = document.getElementById('bg');
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const C = ['#8b5cf6','#06b6d4','#f59e0b'];
    const pts = Array.from({length:60},()=>({
      x:Math.random()*W, y:Math.random()*H,
      r:Math.random()*1.5+0.5,
      vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
      c:C[Math.floor(Math.random()*3)], a:Math.random()*.5+.1
    }));
    function draw(){
      ctx.clearRect(0,0,W,H);
      pts.forEach(p=>{
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.c; ctx.globalAlpha=p.a; ctx.fill();
      });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){ ctx.beginPath(); ctx.globalAlpha=(1-d/120)*.12; ctx.strokeStyle=pts[i].c; ctx.lineWidth=.5; ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.stroke(); }
      }
      ctx.globalAlpha=1;
    }
    function update(){ pts.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1; }); }
    function loop(){ update(); draw(); requestAnimationFrame(loop); }
    loop();
    window.addEventListener('resize',()=>{ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; });

    // Floating emoji particles
    const emojis=['&#128202;','&#129302;','&#9889;','&#127760;','&#128187;','&#10024;'];
    function spawnParticle(){
      const el=document.createElement('div');
      el.style.cssText=`position:fixed;font-size:${10+Math.random()*14}px;left:${Math.random()*100}vw;bottom:-30px;z-index:0;pointer-events:none;opacity:0.18;animation:floatP ${6+Math.random()*8}s linear forwards;`;
      el.innerHTML=emojis[Math.floor(Math.random()*emojis.length)];
      document.body.appendChild(el);
      setTimeout(()=>el.remove(), 14000);
    }
    setInterval(spawnParticle, 1800);
  </script>
</body>
</html>"""

# ─────────────────────────────────────────────────────────────
# EXTRA CSS for new components
# ─────────────────────────────────────────────────────────────
extra_css = """
/* ── CARD ENHANCEMENTS ──────────────────── */
.info-card {
  display:flex; flex-direction:column; align-items:flex-start;
  text-align:left; position:relative;
}
.card-icon { font-size:2rem; margin-bottom:0.75rem; display:block; }
.card-tags { display:flex; flex-wrap:wrap; gap:0.4rem; margin:0.75rem 0; }
.card-link {
  margin-top:auto; display:inline-flex; align-items:center; gap:6px;
  color:var(--accent-2); font-size:0.85rem; font-weight:600;
  text-decoration:none; padding:0.35rem 0;
  border-bottom:1px solid transparent;
  transition:border-color var(--transition), color var(--transition);
}
.card-link:hover { border-color:var(--accent-2); color:var(--accent-1); }

/* ── CERTIFICATE CARDS ──────────────────── */
.cert-card {
  display:flex; align-items:center; gap:1.5rem;
  background:var(--bg-card); border:1px solid var(--border);
  border-radius:var(--radius-lg); padding:1.5rem 2rem;
  min-width:280px; max-width:360px;
  transition:all var(--transition); backdrop-filter:blur(12px);
  text-align:left; position:relative; overflow:hidden;
}
.cert-card::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(168,85,247,0.08),transparent); opacity:0; transition:opacity var(--transition); }
.cert-card:hover { transform:translateY(-6px); border-color:rgba(168,85,247,0.5); box-shadow:0 16px 40px rgba(168,85,247,0.2); }
.cert-card:hover::before { opacity:1; }
.cert-icon { font-size:2rem; color:var(--accent-1); width:50px; flex-shrink:0; text-align:center; }
.cert-body h3 { font-size:1rem; font-weight:700; color:var(--text-primary); margin-bottom:0.3rem; }
.cert-issuer { font-size:0.82rem; color:var(--text-muted); margin:0.2rem 0; }
.cert-issuer i { color:var(--accent-3); margin-right:4px; }
.cert-date { font-size:0.78rem; color:var(--text-muted); }
.cert-badge { display:inline-block; background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.4); color:#34d399; padding:0.15rem 0.6rem; border-radius:50px; font-size:0.7rem; font-weight:700; margin-top:0.4rem; }

/* ── RESUME UPLOAD ──────────────────────── */
.resume-upload-card {
  max-width:600px; margin:0 auto 3rem;
  background:var(--bg-card); border:1px solid var(--border);
  border-radius:var(--radius-xl); padding:3rem 2rem;
  backdrop-filter:blur(12px);
}
.resume-icons { display:flex; justify-content:center; align-items:center; gap:1rem; font-size:2rem; margin-bottom:2rem; }
.resume-icons i:nth-child(1) { color:#ef4444; }
.resume-icons i:nth-child(2) { color:var(--text-muted); font-size:1rem; }
.resume-icons i:nth-child(3) { color:var(--accent-1); }
.resume-icons i:nth-child(4) { color:var(--text-muted); font-size:1rem; }
.resume-icons i:nth-child(5) { color:var(--accent-2); }
.upload-label {
  display:flex; flex-direction:column; align-items:center; gap:0.75rem;
  border:2px dashed var(--border); border-radius:var(--radius-lg);
  padding:2.5rem; cursor:pointer; transition:all var(--transition);
  color:var(--text-muted);
}
.upload-label:hover { border-color:var(--accent-1); color:var(--accent-1); background:rgba(168,85,247,0.05); }
.upload-label i { font-size:2.5rem; }
.upload-label input { display:none; }
.result-grid { display:flex; flex-wrap:wrap; justify-content:center; gap:1.5rem; margin-top:1.5rem; }
.result-card {
  background:var(--bg-card); border:1px solid var(--border);
  border-radius:var(--radius-lg); padding:2rem; max-width:280px;
  text-align:center; transition:all var(--transition);
}
.result-card:hover { transform:translateY(-5px); border-color:var(--accent-1); }
.result-card h3 { color:var(--accent-1); margin-bottom:0.75rem; font-family:var(--font-display); }
.result-card p { color:var(--text-muted); font-size:0.9rem; }

/* ── TECH LOGO SCROLLER ─────────────────── */
.tech-logos-wrapper { width:90%; max-width:900px; margin:0 auto; overflow:hidden; }
.tech-logos { overflow:hidden; position:relative; padding:20px 0; }
.tech-logos-track { display:flex; width:max-content; gap:30px; animation:scrollLogos 25s linear infinite; align-items:center; }
.tech-logos-track:hover { animation-play-state:paused; }
.tech-logos img { width:56px; height:56px; border-radius:12px; object-fit:contain; transition:transform 0.3s,filter 0.3s; filter:grayscale(30%) drop-shadow(0 0 6px rgba(168,85,247,0.3)); background:rgba(255,255,255,0.05); padding:4px; }
.tech-logos img:hover { transform:scale(1.25); filter:grayscale(0%) drop-shadow(0 0 12px rgba(168,85,247,0.6)); }
@keyframes scrollLogos { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

/* ── NIGHT MODE enhanced bg ─────────────── */
body { background:#050511; }
[data-theme="dark"] { --bg-deep:#020209; --bg-mid:#050514; }
"""

# ─────────────────────────────────────────────────────────────
# WRITE ALL FILES
# ─────────────────────────────────────────────────────────────
files = {
    os.path.join(TEMPLATES, "projects.html"):       fix(page("Projects", projects_body)),
    os.path.join(TEMPLATES, "certificates.html"):   fix(page("Certificates", certs_body)),
    os.path.join(TEMPLATES, "knowledge.html"):      knowledge_body,   # keep existing logo structure, rewrite with cleaned version
    os.path.join(TEMPLATES, "resume_analyzer.html"):fix(page("AI Resume Analyzer", resume_body)),
    os.path.join(TEMPLATES, "blog.html"):            fix(page("Blog", blog_body)),
    os.path.join(TEMPLATES, "welcome.html"):         welcome_html,
}

# Knowledge.html needs Jinja2 tags kept raw — write separately
knowledge_full = fix(page("Knowledge", knowledge_body))
files[os.path.join(TEMPLATES, "knowledge.html")] = knowledge_full

for path, content in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Written: {os.path.basename(path)}")

# Append extra CSS to style.css
style_path = os.path.join(STATIC, "style.css")
with open(style_path, "a", encoding="utf-8") as f:
    f.write("\n\n/* === AUTO-APPENDED ENHANCEMENTS === */\n")
    f.write(extra_css)
print("Appended enhancements to style.css")

print("\nAll done! Restart app.py to see changes.")

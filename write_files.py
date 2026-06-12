"""Helper script to write template files to OneDrive paths."""
import os

BASE = r"c:\Users\URMILA\OneDrive\Documents\Desktop\Portfolio"

# ── welcome.html ──────────────────────────────────────────────
welcome_html = """\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Welcome - Urmila Kshirsagar</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{{ url_for('static', filename='welcome.css') }}">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <script defer src="{{ url_for('static', filename='welcome.js') }}"></script>
</head>
<body>
  <div class="orb orb-a"></div>
  <div class="orb orb-b"></div>
  <div class="welcome-wrap">
    <div class="badge">&#x2728; Portfolio 2025</div>
    <h1>
      <span class="sub">Hello, I'm</span>
      <span class="name">Urmila Kshirsagar</span>
    </h1>
    <p class="tagline">Python Developer &middot; AI &amp; Data Science Student &middot; Builder of Smart Things</p>
    <a href="/portfolio" class="enter-btn" id="enter-btn">
      <span>Enter Portfolio</span>
      <i class="fas fa-arrow-right"></i>
    </a>
    <div class="socials">
      <a href="https://github.com/Urmila1945" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
      <a href="https://www.linkedin.com/in/urmila-kshirsagar-97b9a9276/" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
      <a href="mailto:urmilakshirsagar1945@gmail.com" aria-label="Email"><i class="fas fa-envelope"></i></a>
    </div>
  </div>
</body>
</html>
"""

# ── welcome.css ───────────────────────────────────────────────
welcome_css = """\
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#0d0d1a;color:#f1f5f9;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center}
.orb{position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0}
.orb-a{width:500px;height:500px;background:radial-gradient(circle,rgba(168,85,247,0.3) 0%,transparent 70%);top:-150px;left:-150px;animation:drift 16s ease-in-out infinite}
.orb-b{width:400px;height:400px;background:radial-gradient(circle,rgba(6,182,212,0.25) 0%,transparent 70%);bottom:-100px;right:-100px;animation:drift 20s ease-in-out infinite reverse}
@keyframes drift{0%,100%{transform:translate(0,0)}33%{transform:translate(30px,-40px)}66%{transform:translate(-20px,30px)}}
.welcome-wrap{position:relative;z-index:1;text-align:center;display:flex;flex-direction:column;align-items:center;gap:1.5rem;padding:2rem;animation:fadeUp 0.9s cubic-bezier(0.4,0,0.2,1) both}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.badge{display:inline-block;background:rgba(168,85,247,0.15);border:1px solid rgba(168,85,247,0.35);color:#a855f7;padding:0.35rem 1rem;border-radius:50px;font-size:0.82rem;font-weight:600;letter-spacing:0.5px}
h1{display:flex;flex-direction:column;gap:0.3rem}
h1 .sub{font-size:1.1rem;font-weight:400;color:#94a3b8;letter-spacing:1px}
h1 .name{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.5rem,8vw,5rem);font-weight:700;letter-spacing:-2px;line-height:1;background:linear-gradient(135deg,#f1f5f9 30%,#a855f7 70%,#06b6d4 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.tagline{color:#64748b;font-size:1rem;letter-spacing:0.3px}
.enter-btn{display:inline-flex;align-items:center;gap:10px;padding:0.9rem 2.2rem;background:linear-gradient(135deg,#a855f7,#7c3aed);color:white;border-radius:50px;text-decoration:none;font-weight:700;font-size:1rem;box-shadow:0 6px 30px rgba(168,85,247,0.4);transition:all 0.3s cubic-bezier(0.4,0,0.2,1);position:relative;overflow:hidden}
.enter-btn:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(168,85,247,0.6)}
.enter-btn i{transition:transform 0.3s ease}
.enter-btn:hover i{transform:translateX(5px)}
.socials{display:flex;gap:1rem}
.socials a{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(168,85,247,0.2);color:#94a3b8;font-size:1.1rem;text-decoration:none;transition:all 0.3s ease}
.socials a:hover{color:#a855f7;background:rgba(168,85,247,0.15);border-color:#a855f7;transform:translateY(-3px);box-shadow:0 6px 20px rgba(168,85,247,0.3)}
"""

# ── chatbot.js ────────────────────────────────────────────────
chatbot_js = "// chatbot.js - handled in script.js for compatibility\n"

files = {
    os.path.join(BASE, "templates", "welcome.html"): welcome_html,
    os.path.join(BASE, "static", "welcome.css"):     welcome_css,
    os.path.join(BASE, "static", "chatbot.js"):      chatbot_js,
}

for path, content in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Written: {os.path.basename(path)}")

print("All files written successfully!")

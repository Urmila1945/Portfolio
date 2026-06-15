import re

with open('frontend/src/pages/Certificates.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update CodSoft link
content = re.sub(
    r'<a className="cert-card reveal" href="[^"]*" target="_blank" rel="noreferrer">\s*<div className="cert-icon"><i className="fas fa-code"></i></div>\s*<div className="cert-body">\s*<h3>Artificial Intelligence Intern</h3>\s*<p className="cert-issuer"><i className="fas fa-building"></i> CODSOFT</p>',
    r'<a className="cert-card reveal" href="https://drive.google.com/file/d/1yQ4djJ6byp2CLAvls7isDunJCI3Q1eY_/view?usp=sharing" target="_blank" rel="noreferrer">\n    <div className="cert-icon"><i className="fas fa-code"></i></div>\n    <div className="cert-body">\n      <h3>Artificial Intelligence Intern</h3>\n      <p className="cert-issuer"><i className="fas fa-building"></i> CODSOFT</p>',
    content
)

# 2. Update Prodigy link
content = re.sub(
    r'<a className="cert-card reveal" href="[^"]*" target="_blank" rel="noreferrer">\s*<div className="cert-icon"><i className="fas fa-brain"></i></div>\s*<div className="cert-body">\s*<h3>Machine Learning Intern</h3>\s*<p className="cert-issuer"><i className="fas fa-building"></i> Prodigy InfoTech</p>',
    r'<a className="cert-card reveal" href="https://drive.google.com/file/d/1994wrQvcFXhI8VuwOI2u-y7-XM_9E8ml/view?usp=sharing" target="_blank" rel="noreferrer">\n    <div className="cert-icon"><i className="fas fa-brain"></i></div>\n    <div className="cert-body">\n      <h3>Machine Learning Intern</h3>\n      <p className="cert-issuer"><i className="fas fa-building"></i> Prodigy InfoTech</p>',
    content
)

# 3. Tata Data Vis rename
content = re.sub(
    r'<h3>Data Visualisation</h3>\s*(<p className="cert-issuer"><i className="fas fa-building"></i> Tata Group \(Forage\)</p>)',
    r'<h3>Data Visualisation: Empowering Business with Effective Insights</h3>\n      \1',
    content
)

# 4. Deloitte rename to Technology Cybersecurity
content = re.sub(
    r'<h3>Data Analytics</h3>\s*(<p className="cert-issuer"><i className="fas fa-building"></i> Deloitte \(Forage\)</p>)',
    r'<h3>Technology Cybersecurity</h3>\n      \1',
    content
)

# 5. Remove Artificial Intelligence Fundamentals (IBM SkillsBuild)
content = re.sub(
    r'<a className="cert-card reveal" href="[^"]*" target="_blank" rel="noreferrer">\s*<div className="cert-icon"><i className="fas fa-brain"></i></div>\s*<div className="cert-body">\s*<h3>Artificial Intelligence Fundamentals</h3>\s*<p className="cert-issuer"><i className="fas fa-award"></i> IBM SkillsBuild</p>.*?</a>\s*',
    '',
    content,
    flags=re.DOTALL
)

# 6. Remove Career Skills in Data Analytics (LinkedIn Learning)
content = re.sub(
    r'<a className="cert-card reveal" href="[^"]*" target="_blank" rel="noreferrer">\s*<div className="cert-icon"><i className="fas fa-chart-line"></i></div>\s*<div className="cert-body">\s*<h3>Career Skills in Data Analytics</h3>\s*<p className="cert-issuer"><i className="fas fa-award"></i> LinkedIn Learning</p>.*?</a>\s*',
    '',
    content,
    flags=re.DOTALL
)

# 7. Add Cisco certificate (Introduction to Data Science) link mapping
content = re.sub(
    r'<a className="cert-card reveal" href="[^"]*" target="_blank" rel="noreferrer">\s*<div className="cert-icon"><i className="fas fa-database"></i></div>\s*<div className="cert-body">\s*<h3>Introduction to Data Science</h3>',
    r'<a className="cert-card reveal" href="https://drive.google.com/file/d/1eLegOTWY1R0OIQdlemCqpzMjQbLeukP7/view?usp=sharing" target="_blank" rel="noreferrer">\n    <div className="cert-icon"><i className="fas fa-database"></i></div>\n    <div className="cert-body">\n      <h3>Introduction to Data Science</h3>',
    content
)

# 8. Add Hackathons block
hackathons_block = '''
<h3 className="reveal" style={{ color: 'var(--accent-1)', textAlign: 'center', margin: '4rem 0 1rem' }}>Hackathons &amp; Events</h3>
<div className="card-container stagger-children">
  <a className="cert-card reveal" href="https://drive.google.com/file/d/1mx9irkSqdfD9BQDpTR-9cGFLka7-zMeD/view?usp=sharing" target="_blank" rel="noreferrer">
    <div className="cert-icon"><i className="fas fa-trophy"></i></div>
    <div className="cert-body">
      <h3>AI Academia – Chronomind</h3>
      <p className="cert-issuer"><i className="fas fa-award"></i> Hackathon Event</p>
      <p className="cert-date">2026</p>
      <span className="cert-badge">Verified</span>
    </div>
  </a>
  <a className="cert-card reveal" href="https://drive.google.com/file/d/1L7e618KBOGEuxjjGrhoAZLzV79C5pd0v/view?usp=sharing" target="_blank" rel="noreferrer">
    <div className="cert-icon"><i className="fas fa-trophy"></i></div>
    <div className="cert-body">
      <h3>AI Academia – Decision arena</h3>
      <p className="cert-issuer"><i className="fas fa-award"></i> Hackathon Event</p>
      <p className="cert-date">2026</p>
      <span className="cert-badge">Verified</span>
    </div>
  </a>
  <a className="cert-card reveal" href="https://drive.google.com/file/d/1LGdd6XQAiJ-XNno-rsh1bAj3bYXa6-XQ/view?usp=sharing" target="_blank" rel="noreferrer">
    <div className="cert-icon"><i className="fas fa-trophy"></i></div>
    <div className="cert-body">
      <h3>Zero Day Heist CTF</h3>
      <p className="cert-issuer"><i className="fas fa-award"></i> Hackathon Event</p>
      <p className="cert-date">2026</p>
      <span className="cert-badge">Verified</span>
    </div>
  </a>
</div>
'''

content = content.replace('</section>', hackathons_block + '\n</section>')

with open('frontend/src/pages/Certificates.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")

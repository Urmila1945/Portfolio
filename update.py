import re

with open('frontend/src/pages/Certificates.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove Artificial Intelligence Intern (Infosys Springboard)
pattern1 = r'<a className=\"cert-card reveal\" href=\"[^\"]*\" target=\"_blank\" rel=\"noreferrer\">\s*<div className=\"cert-icon\"><i className=\"fas fa-laptop-code\"></i></div>\s*<div className=\"cert-body\">\s*<h3>Artificial Intelligence Intern</h3>\s*<p className=\"cert-issuer\"><i className=\"fas fa-building\"></i> Infosys Springboard</p>.*?</a>\s*'
content = re.sub(pattern1, '', content, flags=re.DOTALL)

# 2. Remove Infosys Springboard Certifications section
pattern2 = r'<h3 className=\"reveal\" style=\{\{\s*color:\s*\'var\(--accent-1\)\',\s*textAlign:\s*\'center\',\s*margin:\s*\'4rem 0 1rem\'\s*\}\}>Infosys Springboard Certifications</h3>\s*<div className=\"card-container stagger-children\">.*?</div>\s*</section>'
content = re.sub(pattern2, '</section>', content, flags=re.DOTALL)

# 3. Add links
links_map = {
    'Supercharge Your Productivity with AI': 'https://drive.google.com/file/d/12L8YA0d-qO6FNrhGVa9-2uPCih-o0Ffa/view?usp=sharing',
    'Oasis Infobyte': 'https://drive.google.com/file/d/1YZtr0XEciRwKoWMptBnlqP7NFtZ2gu5v/view?usp=sharing',
    'iStudio': 'https://drive.google.com/file/d/1wM-dESzBatm212OAtUteca4imeKUl23J/view?usp=sharing',
    'GenAI Powered Data Analytics': 'https://drive.google.com/file/d/1YNin6CY2on2nTNWJEYLBQIoyPkxn6BPQ/view?usp=sharing',
    'Data Visualisation': 'https://drive.google.com/file/d/1_Ys2SGtOWRgem8lujg_TE_sI9WI6XPdC/view?usp=sharing',
    'Deloitte': 'https://drive.google.com/file/d/1K53lANbjKfuvVydEhVVBNWdZmzfTpXXZ/view?usp=sharing',
    'CODSOFT': 'https://drive.google.com/file/d/12NvwhKtvzDFpqs1MOjg2xcuGT5RfqwH1/view?usp=sharing',
    'Prodigy InfoTech': 'https://drive.google.com/file/d/1oiLxFVZTlmIPHTmZgBX5lBI6GeZI0NSH/view?usp=sharing'
}

for key, url in links_map.items():
    pattern = r'(<a className=\"cert-card reveal\" href=\")#(\" target=\"_blank\" rel=\"noreferrer\">\s*<div.*?>(?:(?!</a>).)*?' + re.escape(key) + r'(?:(?!</a>).)*?</a>)'
    content = re.sub(pattern, r'\g<1>' + url + r'\g<2>', content, flags=re.DOTALL)

with open('frontend/src/pages/Certificates.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

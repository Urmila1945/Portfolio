import os
from bs4 import BeautifulSoup
import re

templates_dir = "templates"
output_dir = "frontend/src/pages"

files_to_convert = ["certificates.html", "knowledge.html", "blog.html", "resume_analyzer.html"]

def html_to_jsx(html):
    # Basic replacements for React
    html = html.replace('class=', 'className=')
    html = html.replace('for=', 'htmlFor=')
    html = html.replace('<!--', '{/*')
    html = html.replace('-->', '*/}')
    html = re.sub(r'style="([^"]*)"', lambda m: 'style={{' + ', '.join([f"'{k.strip()}': '{v.strip()}'" for k, v in [part.split(':', 1) for part in m.group(1).split(';') if ':' in part]]) + '}}', html)
    html = html.replace('{{ url_for(\'static\', filename=\'', '/static/')
    html = html.replace('\') }}', '')
    html = html.replace('checked', 'defaultChecked')
    html = html.replace('required', 'required={true}')
    html = html.replace('autoplay', 'autoPlay')
    # handle self-closing tags
    html = re.sub(r'<(img|input|hr|br)([^>]*[^/])>', r'<\1\2 />', html)
    return html

for file in files_to_convert:
    if not os.path.exists(os.path.join(templates_dir, file)): continue
    with open(os.path.join(templates_dir, file), 'r', encoding='utf-8') as f:
        content = f.read()
    
    soup = BeautifulSoup(content, 'html.parser')
    main_tag = soup.find('main')
    
    if not main_tag:
        continue
        
    jsx_content = html_to_jsx(str(main_tag))
    
    component_name = file.split('.')[0].replace('_', ' ').title().replace(' ', '')
    
    react_component = f"""import React from 'react';

function {component_name}() {{
  return (
    {jsx_content}
  );
}}

export default {component_name};
"""
    
    with open(os.path.join(output_dir, f"{component_name}.jsx"), 'w', encoding='utf-8') as f:
        f.write(react_component)
        print(f"Generated {component_name}.jsx")

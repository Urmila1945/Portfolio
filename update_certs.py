import re

with open('frontend/src/pages/Certificates.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add useState
content = content.replace("import React from 'react';", "import React, { useState } from 'react';")

# 2. Add state
if "const [selectedCert" not in content:
    content = content.replace("function Certificates() {\n  return (", "function Certificates() {\n  const [selectedCert, setSelectedCert] = useState(null);\n  return (")

# 3. Add onClick
onClick_str = "onClick={(e) => { e.preventDefault(); setSelectedCert(e.currentTarget.href.replace('/view?usp=sharing', '/preview')); }}"
content = content.replace('target="_blank" rel="noreferrer"', onClick_str)

# 4. Add modal JSX
modal_jsx = """
      </section>

      {selectedCert && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
          backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999,
          display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
        }} onClick={() => setSelectedCert(null)}>
          <button style={{
            position: 'absolute', top: '20px', right: '30px', 
            background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer'
          }} onClick={() => setSelectedCert(null)}>&times;</button>
          <div style={{width: '80%', height: '80%', background: '#fff', borderRadius: '10px', overflow: 'hidden'}} onClick={e => e.stopPropagation()}>
            <iframe src={selectedCert} width="100%" height="100%" style={{border: 'none'}} allow="autoplay"></iframe>
          </div>
        </div>
      )}
    </main>
"""
if "selectedCert &&" not in content:
    content = content.replace("      </section>\n    </main>", modal_jsx)

with open('frontend/src/pages/Certificates.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated Certificates.jsx successfully.")

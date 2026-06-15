import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  const [typedRole, setTypedRole] = useState('');
  const roles = ['Python Developer','AI Enthusiast','Data Scientist','ML Engineer','Flask Developer','Problem Solver'];

  useEffect(() => {
    let ri = 0, ci = 0, deleting = false;
    let timer;
    const type = () => {
      const word = roles[ri];
      if (!deleting) {
        setTypedRole(word.slice(0, ++ci));
        if (ci === word.length) { 
          deleting = true; 
          timer = setTimeout(type, 1800); 
          return; 
        }
      } else {
        setTypedRole(word.slice(0, --ci));
        if (ci === 0) { 
          deleting = false; 
          ri = (ri + 1) % roles.length; 
        }
      }
      timer = setTimeout(type, deleting ? 55 : 90);
    };
    timer = setTimeout(type, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="welcome-container">
      <div className="welcome-wrapper">
        <div className="welcome-card-glow">
          <div className="welcome-content-side">
            <p className="welcome-greeting">Hello, I'm</p>
            <h1 className="welcome-h1">Urmila Kshirsagar</h1>

            <p className="welcome-role-line">
              I'm a <span className="welcome-typed-role">{typedRole}</span>
            </p>

            <p className="welcome-tagline">
              <strong>AI &amp; Data Science Student</strong> at DMCE &middot; Building intelligent apps
              at the intersection of code and creativity. Always learning, always shipping.
            </p>

            <div className="welcome-roles-row">
              <span className="welcome-role-chip">🤖 Machine Learning</span>
              <span className="welcome-role-chip">📊 Data Science</span>
              <span className="welcome-role-chip">🌐 Web Development</span>
              <span className="welcome-role-chip">👁️ Computer Vision</span>
              <span className="welcome-role-chip">⚡ React &amp; APIs</span>
              <span className="welcome-role-chip">☁️ AWS Basics</span>
            </div>

            <div className="welcome-cta-row">
              <Link to="/portfolio" className="welcome-btn-enter">
                Enter Portfolio <i className="fas fa-arrow-right"></i>
              </Link>
              <a href="/static/Urmila_CV.pdf" download className="welcome-btn-ghost">
                <i className="fas fa-download"></i> Download CV
              </a>
              <Link to="/resume_analyzer" className="welcome-btn-ghost">
                <i className="fas fa-magic"></i> AI Resume Analyzer
              </Link>
            </div>

            <div className="welcome-stats-row">
              <div className="welcome-stat"><div className="welcome-stat-num">15+</div><div className="welcome-stat-lbl">Projects Completed</div></div>
              <div className="welcome-stat"><div className="welcome-stat-num">8+</div><div className="welcome-stat-lbl">Industry Certifications</div></div>
              <div className="welcome-stat"><div className="welcome-stat-num">8.7</div><div className="welcome-stat-lbl">CGPA</div></div>
              <div className="welcome-stat"><div className="welcome-stat-num">2+</div><div className="welcome-stat-lbl">Years Coding</div></div>
            </div>
          </div>
        </div>

        <div className="welcome-photo-side">
          <div className="welcome-avatar-ring">
            <img src="/static/19.jpg" alt="Urmila Kshirsagar" />
          </div>
          <div className="welcome-mini-socials">
            <a href="https://github.com/Urmila1945" target="_blank" rel="noreferrer" aria-label="GitHub"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/urmila-kshirsagar-97b9a9276/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href="mailto:urmilakshirsagar1945@gmail.com" aria-label="Email"><i className="fas fa-envelope"></i></a>
            <Link to="/projects" aria-label="Projects"><i className="fas fa-code"></i></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;

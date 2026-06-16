import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [typedRole, setTypedRole] = useState('');
  const roles = ['Python Developer','AI Enthusiast','Data Scientist','ML Engineer','React Developer'];

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
    
    // Skill Radar Chart
    if (window.Chart) {
      const ctx = document.getElementById('skillsRadarChart');
      if (ctx && !window.skillRadarChartInstance) {
        window.skillRadarChartInstance = new window.Chart(ctx.getContext('2d'), {
          type: 'radar',
          data: {
            labels: ['Programming', 'ML / AI', 'Frameworks', 'Tools', 'Problem Solving', 'Soft Skills'],
            datasets: [{
              label: 'Proficiency',
              data: [92, 80, 82, 78, 88, 75],
              backgroundColor: 'rgba(192,132,252,0.2)',
              borderColor: '#c084fc',
              pointBackgroundColor: '#f472b6',
              pointBorderColor: '#0d0d1a',
              pointHoverBackgroundColor: '#f59e0b',
              borderWidth: 2,
              pointRadius: 5
            }]
          },
          options: {
            responsive: true,
            animation: { duration: 1500, easing: 'easeInOutQuart' },
            scales: {
              r: {
                angleLines: { color: 'rgba(255,255,255,0.08)' },
                grid: { color: 'rgba(255,255,255,0.08)' },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                  backdropColor: 'transparent',
                  color: 'rgba(148,163,184,0.7)',
                  font: { size: 10 }
                },
                pointLabels: {
                  color: '#f1f5f9',
                  font: { size: 15, family: "'Space Grotesk', sans-serif", weight: '600' }
                }
              }
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: 'rgba(13,13,26,0.9)',
                borderColor: 'rgba(192,132,252,0.4)',
                borderWidth: 1,
                titleColor: '#c084fc',
                bodyColor: '#f1f5f9'
              }
            }
          }
        });
      }
    }
    
    return () => {
      clearTimeout(timer);
      if (window.skillRadarChartInstance) {
        window.skillRadarChartInstance.destroy();
        window.skillRadarChartInstance = null;
      }
    };
  }, []);

  return (
    <>
      <section className="hero" id="home">
        <div className="content">

          <h1>
            <span className="line-1">Hi, I'm Urmila</span>
            <span className="highlight" id="typed-headline">Python Developer</span>
          </h1>

          <p>
            <strong>AI &amp; Data Science Student</strong> at DMCE, passionate about building
            intelligent web applications and exploring the frontiers of machine learning.
            I craft solutions that merge <span className="typed-text">{typedRole}</span>
            with cutting-edge technology.
          </p>

          <div className="buttons">
            <Link to="/projects" className="btn btn-primary">
              View Projects <i className="fas fa-arrow-right"></i>
            </Link>
            <a href="#contact" onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', `/portfolio#contact`);
              }
            }} className="btn btn-secondary">
              <i className="fas fa-handshake"></i> Hire Me
            </a>
          </div>

          <div className="social">
            <a href="https://github.com/Urmila1945" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/urmila-kshirsagar-97b9a9276/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="mailto:urmilakshirsagar1945@gmail.com" aria-label="Email">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>

        <div className="illustration">
          <div className="illustration-wrapper">
            <img src="/static/developer_graphic.webp" alt="Urmila — Python Developer Illustration" />
            <div className="tech-chip">🐍 Python</div>
            <div className="tech-chip">🤖 Machine Learning</div>
            <div className="tech-chip">⚡ React</div>
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <h2 className="section-title reveal">About Me</h2>
        <span className="section-accent reveal"></span>
        <p className="section-subtitle reveal">Transforming ideas into meaningful digital experiences.</p>

        <div className="about-content">
          <div className="about-text reveal-left">
            <h3>Hello, I'm <span>Urmila</span> 👋</h3>
            <p>
              I am an <strong>Artificial Intelligence &amp; Data Science</strong> student at Datta Meghe College of Engineering, with a passion for building intelligent systems and scalable web applications.
            </p>
            <p>
              I thrive at the intersection of logical engineering and creative design. From architecting REST APIs in Python and Flask to crafting intuitive UIs in React, I approach every project with a commitment to excellence and a desire to build software that is genuinely impactful.
            </p>
            <p>
              <em>Always learning, always building.</em>
            </p>
            <a href="/Urmila_CV.pdf" className="btn glow-btn">
            <i className="fas fa-user-tie"></i> &nbsp;Explore My Resume
          </a>
          </div>

          <div className="about-photo reveal-right">
            <div className="glow-avatar">
              <img src="/static/19.jpg" alt="Urmila Kshirsagar" loading="lazy" />
            </div>
          </div>
        </div>

        <div className="about-stats stagger-children">
          <Link to="/projects" className="stat-box reveal">
            <h4><span className="counter" data-target="15">15</span>+ Projects Completed</h4>
            <p>Click to view all</p>
          </Link>
          <Link to="/certificates" className="stat-box reveal">
            <h4><span className="counter" data-target="8">8</span>+ Industry Certifications</h4>
            <p>Click to view all</p>
          </Link>
          <Link to="/knowledge" className="stat-box reveal">
            <h4><span className="counter" data-target="10">10</span>+ Technologies Mastered</h4>
            <p>Click to explore</p>
          </Link>
        </div>
      </section>

      <section className="education" id="education">
        <h2 className="section-title reveal">Education</h2>
        <span className="section-accent reveal"></span>
        <p className="section-subtitle reveal">My academic journey and milestones.</p>

        <div className="education-container stagger-children">
          <div className="education-card reveal">
            <div className="education-text">
              <h3>B.E. in Artificial Intelligence &amp; Data Science</h3>
              <p><a href="https://www.dmce.ac.in" target="_blank" rel="noopener noreferrer">Datta Meghe College of Engineering</a></p>
              <p>📅 2023 – Present</p>
              <p>🎓 <strong>CGPA: 8.7 / 10</strong></p>
              <p>📚 Machine Learning · Data Structures · Computer Vision · Algorithms</p>
            </div>
            <div className="education-logo">
              <img src="https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://dmce.ac.in&size=128" alt="DMCE Logo" style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '50%' }} />
            </div>
          </div>

          <div className="education-card reveal">
            <div className="education-text">
              <h3>HSC – Science Stream</h3>
              <p><a href="http://www.vpmthane.org/" target="_blank" rel="noopener noreferrer">B.N. Bandodkar College of Science</a></p>
              <p>📅 2021 – 2023</p>
              <p>📊 <strong>Percentage: 63%</strong></p>
              <p>📚 Physics · Chemistry · Mathematics · Biology</p>
            </div>
            <div className="education-logo">
              <div className="edu-logo-placeholder">🎓</div>
            </div>
          </div>

          <div className="education-card reveal">
            <div className="education-text">
              <h3>SSC – 10th Grade</h3>
              <p>Sanjivani Vidyalaya</p>
              <p>📅 2020 – 2021</p>
              <p>📊 <strong>Percentage: 93%</strong></p>
              <p>📚 English · Mathematics · Science · Social Studies</p>
            </div>
            <div className="education-logo">
              <div className="edu-logo-placeholder">🏫</div>
            </div>
          </div>
        </div>
      </section>

      <section className="skills" id="skills">
        <h2 className="section-title reveal">Skills</h2>
        <span className="section-accent reveal"></span>
        <p className="section-subtitle reveal">Technologies &amp; tools I work with.</p>

        <div className="skills-container stagger-children">
          <div className="skill-category reveal">
            <div className="skill-flip-inner">
              <div className="skill-flip-front">
                <h3><span className="cat-icon">💻</span> Languages</h3>
                <ul className="skill-bars">
                  <li><span className="skill-name">Python</span><div className="skill-bar"><div className="skill-fill" style={{width: '90%'}}></div></div><span className="skill-pct">90%</span></li>
                  <li><span className="skill-name">Java</span><div className="skill-bar"><div className="skill-fill" style={{width: '75%'}}></div></div><span className="skill-pct">75%</span></li>
                  <li><span className="skill-name">SQL</span><div className="skill-bar"><div className="skill-fill" style={{width: '80%'}}></div></div><span className="skill-pct">80%</span></li>
                  <li><span className="skill-name">C</span><div className="skill-bar"><div className="skill-fill" style={{width: '70%'}}></div></div><span className="skill-pct">70%</span></li>
                  <li><span className="skill-name">HTML/CSS</span><div className="skill-bar"><div className="skill-fill" style={{width: '85%'}}></div></div><span className="skill-pct">85%</span></li>
                </ul>
              </div>
              <div className="skill-flip-back">
                <h3>💻 Languages</h3>
                <p>Core languages I use to build everything from scripts to full-stack apps.</p>
                <ul>
                  <li>Python — primary</li>
                  <li>SQL — data querying</li>
                  <li>Java — OOP</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="skill-category reveal">
            <div className="skill-flip-inner">
              <div className="skill-flip-front">
                <h3><span className="cat-icon">🗄️</span> Databases</h3>
                <ul className="skill-bars">
                  <li><span className="skill-name">MongoDB</span><div className="skill-bar"><div className="skill-fill" style={{width: '75%'}}></div></div><span className="skill-pct">75%</span></li>
                  <li><span className="skill-name">MySQL</span><div className="skill-bar"><div className="skill-fill" style={{width: '85%'}}></div></div><span className="skill-pct">85%</span></li>
                  <li><span className="skill-name">Postgres</span><div className="skill-bar"><div className="skill-fill" style={{width: '70%'}}></div></div><span className="skill-pct">70%</span></li>
                </ul>
              </div>
              <div className="skill-flip-back">
                <h3>🗄️ Databases</h3>
                <p>Designing efficient schemas and managing data storage for scalable applications.</p>
              </div>
            </div>
          </div>

          <div className="skill-category reveal">
            <div className="skill-flip-inner">
              <div className="skill-flip-front">
                <h3><span className="cat-icon">🧰</span> Frameworks</h3>
                <ul className="skill-bars">
                  <li><span className="skill-name">Flask</span><div className="skill-bar"><div className="skill-fill" style={{width: '85%'}}></div></div><span className="skill-pct">85%</span></li>
                  <li><span className="skill-name">React</span><div className="skill-bar"><div className="skill-fill" style={{width: '75%'}}></div></div><span className="skill-pct">75%</span></li>
                  <li><span className="skill-name">Pandas</span><div className="skill-bar"><div className="skill-fill" style={{width: '90%'}}></div></div><span className="skill-pct">90%</span></li>
                  <li><span className="skill-name">Scikit-learn</span><div className="skill-bar"><div className="skill-fill" style={{width: '80%'}}></div></div><span className="skill-pct">80%</span></li>
                  <li><span className="skill-name">NumPy</span><div className="skill-bar"><div className="skill-fill" style={{width: '85%'}}></div></div><span className="skill-pct">85%</span></li>
                </ul>
              </div>
              <div className="skill-flip-back">
                <h3>🧰 Frameworks</h3>
                <p>Libraries and frameworks powering my ML and web projects.</p>
                <ul>
                  <li>React — web frontend</li>
                  <li>Flask — web backend</li>
                  <li>Scikit-learn — ML</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="skill-category reveal">
            <div className="skill-flip-inner">
              <div className="skill-flip-front">
                <h3><span className="cat-icon">☁️</span> Cloud & DevOps</h3>
                <ul className="skill-bars">
                  <li><span className="skill-name">AWS</span><div className="skill-bar"><div className="skill-fill" style={{width: '65%'}}></div></div><span className="skill-pct">65%</span></li>
                  <li><span className="skill-name">Docker</span><div className="skill-bar"><div className="skill-fill" style={{width: '70%'}}></div></div><span className="skill-pct">70%</span></li>
                  <li><span className="skill-name">Linux</span><div className="skill-bar"><div className="skill-fill" style={{width: '75%'}}></div></div><span className="skill-pct">75%</span></li>
                  <li><span className="skill-name">GitHub</span><div className="skill-bar"><div className="skill-fill" style={{width: '85%'}}></div></div><span className="skill-pct">85%</span></li>
                </ul>
              </div>
              <div className="skill-flip-back">
                <h3>☁️ Cloud & DevOps</h3>
                <p>Deploying and managing scalable applications in the cloud.</p>
                <ul>
                  <li>AWS — hosting</li>
                  <li>Docker — containers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="skill-tags reveal stagger-children">
          <span className="skill-tag">Machine Learning</span>
          <span className="skill-tag">Data Analysis</span>
          <span className="skill-tag">Computer Vision</span>
          <span className="skill-tag cyan">NLP</span>
          <span className="skill-tag cyan">REST APIs</span>
          <span className="skill-tag">Deep Learning</span>
          <span className="skill-tag cyan">Data Visualization</span>
          <span className="skill-tag">Generative AI</span>
          <span className="skill-tag cyan">Cloud Computing</span>
          <span className="skill-tag">Problem Solving</span>
          <span className="skill-tag cyan">Agile / Git</span>
        </div>

        <h3 className="section-title reveal" style={{fontSize:'1.6rem',marginBottom:'1.5rem'}}>
          Skill Radar
        </h3>
        <div className="chart-wrapper reveal">
          <canvas id="skillsRadarChart" width="480" height="480"></canvas>
        </div>
      </section>

      <section className="hackathons" id="hackathons" style={{ paddingTop: '80px' }}>
        <h2 className="section-title reveal">Hackathons &amp; Events</h2>
        <span className="section-accent reveal"></span>
        <p className="section-subtitle reveal">Competitive programming and technical events.</p>

        <div className="education-container stagger-children">
          <div className="education-card reveal">
            <div className="education-text">
              <h3>HackAstra – Innovision 3.0 Hackathon</h3>
              <p>K. V. Pendharkar College Department of IT</p>
              <p>📅 7 February 2026</p>
            </div>
          </div>
          <a className="education-card reveal" href="https://drive.google.com/file/d/1mx9irkSqdfD9BQDpTR-9cGFLka7-zMeD/view?usp=sharing" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="education-text">
              <h3 style={{ color: 'var(--accent-1)' }}>AI Academia – Chronomind</h3>
              <p>📅 2026</p>
            </div>
          </a>
          <a className="education-card reveal" href="https://drive.google.com/file/d/1L7e618KBOGEuxjjGrhoAZLzV79C5pd0v/view?usp=sharing" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="education-text">
              <h3 style={{ color: 'var(--accent-1)' }}>AI Academia – Decision arena</h3>
              <p>📅 2026</p>
            </div>
          </a>
        </div>
      </section>

      <section className="contact" id="contact">
        <h2 className="section-title reveal">Get in Touch</h2>
        <span className="section-accent reveal"></span>
        <p className="section-subtitle reveal">I'd love to hear from you — let's build something great together!</p>

        <div className="contact-container">
          <form 
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData.entries());
              const API_URL = '/api';
              
              const btn = e.target.querySelector('button[type="submit"]');
              const originalText = btn.innerHTML;
              btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
              
              try {
                const response = await fetch(`${API_URL}/contact`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data)
                });
                
                if (response.ok) {
                  alert('Message sent successfully!');
                  e.target.reset();
                } else {
                  alert('There was an error sending your message.');
                }
              } catch (error) {
                alert('There was an error sending your message.');
              } finally {
                btn.innerHTML = originalText;
              }
            }} 
            className="contact-form reveal-left" 
            id="contact-form"
          >
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
            <button type="submit" className="btn glow-btn">
              <i className="fas fa-paper-plane"></i> Send Message
            </button>
          </form>

          <div className="contact-info reveal-right">
            <div className="contact-info-item">
              <i className="fas fa-envelope"></i>
              <a href="mailto:urmilakshirsagar1945@gmail.com">urmilakshirsagar1945@gmail.com</a>
            </div>
            <div className="contact-info-item">
              <i className="fab fa-github"></i>
              <a href="https://github.com/Urmila1945" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
            </div>
            <div className="contact-info-item">
              <i className="fab fa-linkedin"></i>
              <a href="https://linkedin.com/in/urmila-kshirsagar-97b9a9276/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
            </div>
            <div className="contact-info-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>Navi Mumbai, Maharashtra, India</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

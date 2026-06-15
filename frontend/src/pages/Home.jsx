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
            <a href="/resume" download className="btn btn-secondary">
              <i className="fas fa-download"></i> Download CV
            </a>
            <Link to="/resume_analyzer" className="btn btn-secondary">
              <i className="fas fa-magic"></i> AI Resume Analyzer
            </Link>
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
              I am an ambitious <strong>Artificial Intelligence &amp; Data Science</strong> student at Datta Meghe College of Engineering, with a profound passion for translating complex data into actionable insights and intelligent systems. My academic journey has instilled in me a rigorous foundation in machine learning algorithms, deep learning architectures, and scalable full-stack web development.
            </p>
            <p>
              Beyond the classroom, I am a dedicated problem solver who thrives at the intersection of logical engineering and creative design. Whether I am architecting robust REST APIs in Python and Flask, training neural networks for computer vision tasks, or crafting intuitive, dynamic user interfaces in React, I approach every project with meticulous attention to detail and a commitment to excellence.
            </p>
            <p>
              I strongly believe that the best software is not just functionally sound, but genuinely impactful. My goal is to leverage cutting-edge AI technologies to build applications that solve real-world problems and enhance the human experience. As an avid learner in an ever-evolving field, I am constantly exploring new frameworks, participating in hackathons, and refining my craft. <em>Always learning, always building.</em>
            </p>
            <a href="/resume" download className="btn glow-btn">
              <i className="fas fa-file-pdf"></i> &nbsp;Download CV
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
              <img src="/static/images/dmce.png" alt="DMCE Logo" loading="lazy" />
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

      <section className="experience" id="experience" style={{ paddingTop: '80px' }}>
        <h2 className="section-title reveal">Experience</h2>
        <span className="section-accent reveal"></span>
        <p className="section-subtitle reveal">Internships and Industry Job Simulations.</p>

        <div className="education-container stagger-children">
          <div className="education-card reveal">
            <div className="education-text">
              <h3>Artificial Intelligence Intern</h3>
              <p>Infosys Springboard</p>
              <p>📅 2 Months • Completed: 28 November 2025</p>
            </div>
          </div>
          <div className="education-card reveal">
            <div className="education-text">
              <h3>Artificial Intelligence Intern</h3>
              <p>CODEC</p>
              <p>📅 1 Month • Completed: 25 May 2026</p>
            </div>
          </div>
          <div className="education-card reveal">
            <div className="education-text">
              <h3>Artificial Intelligence Intern</h3>
              <p>CODSOFT</p>
              <p>📅 1 Month • Completed: 10 January 2026</p>
            </div>
          </div>
          <div className="education-card reveal">
            <div className="education-text">
              <h3>Data Analytics Intern</h3>
              <p>iStudio</p>
              <p>📅 1 Month • Completed: 5 September 2025</p>
            </div>
          </div>
          <div className="education-card reveal">
            <div className="education-text">
              <h3>Python Programming Intern</h3>
              <p>Oasis Infobyte</p>
              <p>📅 ~1.5 Months • Completed: 15 July 2025</p>
            </div>
          </div>
          <div className="education-card reveal">
            <div className="education-text">
              <h3>Machine Learning Intern</h3>
              <p>Prodigy InfoTech</p>
              <p>📅 1 Month • Completed: 15 July 2025</p>
            </div>
          </div>
          
          <h3 className="reveal" style={{ marginTop: '2rem', color: 'var(--accent-1)', textAlign: 'center', width: '100%' }}>Industry Job Simulations</h3>
          
          <div className="education-card reveal">
            <div className="education-text">
              <h3>GenAI Powered Data Analytics</h3>
              <p>Tata Group (Forage)</p>
              <p>📅 21 July 2025</p>
            </div>
          </div>
          <div className="education-card reveal">
            <div className="education-text">
              <h3>Data Visualisation: Empowering Business with Effective Insights</h3>
              <p>Tata Group (Forage)</p>
              <p>📅 20 July 2025</p>
            </div>
          </div>
          <div className="education-card reveal">
            <div className="education-text">
              <h3>Data Analytics</h3>
              <p>Deloitte (Forage)</p>
              <p>📅 1 July 2026</p>
            </div>
          </div>
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
          <div className="education-card reveal">
            <div className="education-text">
              <h3>AI Academia – Chronomind</h3>
              <p>📅 2026</p>
            </div>
          </div>
          <div className="education-card reveal">
            <div className="education-text">
              <h3>AI Academia – Decision arena</h3>
              <p>📅 2026</p>
            </div>
          </div>
        </div>
      </section>

      <section className="certifications" id="certifications" style={{ padding: '80px 8%' }}>
        <h2 className="section-title reveal">Certifications</h2>
        <span className="section-accent reveal"></span>
        <p className="section-subtitle reveal">Professional achievements and continuous learning.</p>

        <h3 className="reveal" style={{ color: 'var(--accent-1)', textAlign: 'center', marginBottom: '1rem' }}>Professional Certifications</h3>
        <div className="cert-grid stagger-children">
          <div className="cert-card reveal">
            <h4>Python Essentials</h4>
            <p>Cisco Networking Academy</p>
            <div className="cert-date">28 May 2026</div>
          </div>
          <div className="cert-card reveal">
            <h4>AI Fundamentals</h4>
            <p>Cisco &amp; IBM SkillsBuild</p>
            <div className="cert-date">29 June 2025</div>
          </div>
          <div className="cert-card reveal">
            <h4>Introduction to Data Science</h4>
            <p>Cisco Networking Academy</p>
            <div className="cert-date">1 January 2026</div>
          </div>
          <div className="cert-card reveal">
            <h4>AWS Cloud Practitioner</h4>
            <p>AWS</p>
            <div className="cert-date">17 January 2026</div>
          </div>
          <div className="cert-card reveal">
            <h4>TCS iON Career Edge – Young Professional</h4>
            <p>TCS iON</p>
            <div className="cert-date">15 August 2025</div>
          </div>
          <div className="cert-card reveal">
            <h4>Artificial Intelligence Fundamentals</h4>
            <p>IBM SkillsBuild</p>
            <div className="cert-date">29 June 2025</div>
          </div>
          <div className="cert-card reveal">
            <h4>Machine Learning 101</h4>
            <p>CSI-CATT DMCE</p>
            <div className="cert-date">2025</div>
          </div>
          <div className="cert-card reveal">
            <h4>Supercharge Your Productivity with AI</h4>
            <p>IIDE</p>
            <div className="cert-date">31 January 2026</div>
          </div>
          <div className="cert-card reveal">
            <h4>Introduction to Career Skills in Data Analytics</h4>
            <p>LinkedIn Learning</p>
            <div className="cert-date">20 June 2025</div>
          </div>
        </div>

        <h3 className="reveal" style={{ color: 'var(--accent-1)', textAlign: 'center', margin: '4rem 0 1rem' }}>Infosys Springboard Certifications</h3>
        <div className="cert-grid stagger-children">
          <div className="cert-card reveal">
            <h4>Artificial Intelligence Primer</h4>
            <div className="cert-date">15 June 2025</div>
          </div>
          <div className="cert-card reveal">
            <h4>Data Science</h4>
            <div className="cert-date">5 June 2025</div>
          </div>
          <div className="cert-card reveal">
            <h4>Deep Learning</h4>
            <div className="cert-date">8 June 2025</div>
          </div>
          <div className="cert-card reveal">
            <h4>Deep Learning for Developers</h4>
            <div className="cert-date">13 June 2025</div>
          </div>
          <div className="cert-card reveal">
            <h4>Generative AI</h4>
            <div className="cert-date">8 June 2025</div>
          </div>
          <div className="cert-card reveal">
            <h4>Generative Models for Developers</h4>
            <div className="cert-date">12 June 2025</div>
          </div>
          <div className="cert-card reveal">
            <h4>Prompt Engineering</h4>
            <div className="cert-date">8 June 2025</div>
          </div>
          <div className="cert-card reveal">
            <h4>Natural Language Processing</h4>
            <div className="cert-date">9 June 2025</div>
          </div>
          <div className="cert-card reveal">
            <h4>Computer Vision 101</h4>
            <div className="cert-date">9 June 2025</div>
          </div>
          <div className="cert-card reveal">
            <h4>OpenAI GPT</h4>
            <div className="cert-date">11 June 2025</div>
          </div>
          <div className="cert-card reveal">
            <h4>GPT-3</h4>
            <div className="cert-date">12 June 2025</div>
          </div>
          <div className="cert-card reveal">
            <h4>AI</h4>
            <div className="cert-date">2 June 2025</div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <h2 className="section-title reveal">Get in Touch</h2>
        <span className="section-accent reveal"></span>
        <p className="section-subtitle reveal">I'd love to hear from you — let's build something great together!</p>

        <div className="contact-container">
          <form action="/contact" method="POST" className="contact-form reveal-left" id="contact-form">
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

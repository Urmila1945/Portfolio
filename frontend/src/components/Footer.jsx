import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Urmila Kshirsagar</h3>
        <p>Python Developer · AI Enthusiast · Lifelong Learner</p>
        <div className="footer-social">
          <a href="https://github.com/Urmila1945" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/urmila-kshirsagar-97b9a9276/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="mailto:urmilakshirsagar1945@gmail.com" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </a>
          <Link to="/projects" aria-label="Projects">
            <i className="fas fa-code"></i>
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Urmila Kshirsagar &nbsp;·&nbsp; Crafted with <span style={{color: '#c084fc'}}>♥</span> &amp; React</p>
      </div>
    </footer>
  );
}

export default Footer;

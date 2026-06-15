import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    if (location.pathname !== '/portfolio' && location.pathname !== '/') {
      // If we are not on the main portfolio page, navigate there first
      navigate(`/portfolio#${targetId}`);
    } else {
      // If we are already on the portfolio page, just scroll smoothly
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/portfolio#${targetId}`);
      }
    }
    
    // Close mobile menu if open
    const nav = document.getElementById('main-nav');
    const hamburger = document.getElementById('nav-hamburger');
    if (nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      if (hamburger) hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
  };

  return (
    <header className="header" id="main-header">
      <Link to="/portfolio" className="logo">UK</Link>
      <nav className="navbar" id="main-nav">
        <a href="#home" onClick={(e) => handleScroll(e, 'home')} id="nav-home">Home</a>
        <a href="#about" onClick={(e) => handleScroll(e, 'about')} id="nav-about">About</a>
        <a href="#education" onClick={(e) => handleScroll(e, 'education')} id="nav-education">Education</a>
        <a href="#skills" onClick={(e) => handleScroll(e, 'skills')} id="nav-skills">Skills</a>
        <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} id="nav-contact">Contact</a>
      </nav>
      <button className="nav-hamburger" id="nav-hamburger" aria-label="Open menu">
        <i className="fas fa-bars"></i>
      </button>
    </header>
  );
}

export default Header;

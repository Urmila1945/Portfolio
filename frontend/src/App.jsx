import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Particles from './components/Particles';
import Cursor from './components/Cursor';

import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Knowledge from './pages/Knowledge';
import Blog from './pages/Blog';
import ResumeAnalyzer from './pages/ResumeAnalyzer';

function RouteChangeHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // 1. Scroll to hash or top
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
    
    // 2. Natively implement IntersectionObserver for scroll reveal and counters
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Handle .reveal
          if (entry.target.classList.contains('reveal') || 
              entry.target.classList.contains('reveal-left') || 
              entry.target.classList.contains('reveal-right')) {
            entry.target.classList.add('visible');
          }
          
          // Handle .counter
          if (entry.target.classList.contains('counter')) {
            const el = entry.target;
            if (!el.dataset.animated) {
              el.dataset.animated = 'true';
              const target = +el.dataset.target;
              const duration = 1500;
              const step = target / (duration / 16);
              let current = 0;
              const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                  el.textContent = target;
                  clearInterval(timer);
                } else {
                  el.textContent = Math.floor(current);
                }
              }, 16);
            }
          }
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    // Give React time to mount the DOM
    const timeoutId = setTimeout(() => {
      // Observe reveals
      const revealClasses = ['.reveal', '.reveal-left', '.reveal-right'];
      const reveals = document.querySelectorAll(revealClasses.join(','));
      reveals.forEach(el => observer.observe(el));
      
      // Observe counters
      const counters = document.querySelectorAll('.counter');
      counters.forEach(el => observer.observe(el));
      
      // Implement Flip cards logic natively
      const cards = document.querySelectorAll('.skill-category');
      cards.forEach(card => {
        // Remove old listeners by replacing clone
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        newCard.addEventListener('click', () => {
          const isFlipped = newCard.classList.contains('flipped');
          document.querySelectorAll('.skill-category').forEach(c => c.classList.remove('flipped'));
          if (!isFlipped) newCard.classList.add('flipped');
        });
        
        // RE-OBSERVE the new card because the original was removed from the DOM!
        if (newCard.classList.contains('reveal')) {
          observer.observe(newCard);
        }
      });
      
      // Call other global initializers if they exist
      if (typeof window.initActiveNavHighlight === 'function') window.initActiveNavHighlight();
    }, 200); 

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <Particles />
      <Cursor />
      <RouteChangeHandler />
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/portfolio" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/resume_analyzer" element={<ResumeAnalyzer />} />
      </Routes>
      <Link to="/resume_analyzer" className="floating-resume-btn" title="AI Resume Analyzer" aria-label="AI Resume Analyzer">
        <i className="fas fa-magic"></i>
      </Link>
      <Chatbot />
      <Footer />
    </Router>
  );
}

export default App;

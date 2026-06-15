import React from 'react';

function Projects() {
  return (
    <main style={{ paddingTop: '90px', minHeight: '80vh' }}>
      <section style={{ padding: '60px 8%', textAlign: 'center' }}>
        <h1 className="section-title reveal">My Projects</h1>
        <span className="section-accent reveal"></span>
        <p className="section-subtitle reveal">Things I have built — from AI systems to web apps.</p>

        <div className="card-container stagger-children">
          <div className="info-card reveal">
            <div className="card-icon">🧠</div>
            <h3>Ratefluencer – AI-Powered Influencer Intelligence Platform</h3>
            <p>An AI-driven platform designed to provide intelligent insights, analytics, and ratings for influencers.</p>
            <div className="card-tags">
              <span className="skill-tag">AI</span>
              <span className="skill-tag cyan">React</span>
              <span className="skill-tag">Analytics</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a href="https://github.com/Urmila1945/AI-powered-influencer-intelligence-platform" target="_blank" rel="noreferrer" className="card-link" style={{ marginTop: 0 }}>
                <i className="fab fa-github"></i> View Code
              </a>
              <a href="https://ratefluencer-frontend.onrender.com" target="_blank" rel="noreferrer" className="card-link" style={{ marginTop: 0 }}>
                <i className="fas fa-external-link-alt"></i> Live Demo
              </a>
            </div>
          </div>
          <div className="info-card reveal">
            <div className="card-icon">🤖</div>
            <h3>Quickserve - Localized Home Services Discovery & Booking</h3>
            <p>An AI-powered platform for discovering and booking local home services with personalized recommendations, built using FastAPI, React, and MongoDB.</p>
            <div className="card-tags">
              <span className="skill-tag">Python</span>
              <span className="skill-tag cyan">Scikit-learn</span>
              <span className="skill-tag">Flask</span>
            </div>
            <a href="https://github.com/Urmila1945/QuickServe---Localized-Home-services-Discovery-Booking" target="_blank" rel="noreferrer" className="card-link">
              <i className="fab fa-github"></i> View Code
            </a>
          </div>

          <div className="info-card reveal">
            <div className="card-icon">📊</div>
            <h3>Modern Digital Banking Dashboard</h3>
            <p>A modern, responsive dashboard for digital banking, featuring real-time data visualization, transaction management, and user analytics.</p>
            <div className="card-tags">
              <span className="skill-tag">Python</span>
              <span className="skill-tag cyan">React</span>
              <span className="skill-tag">FastAPI</span>
            </div>
            <a href="https://github.com/springboardmentor997-create/Modern-Digital-Banking-Dashboard/tree/urmila-team1-backend" target="_blank" rel="noreferrer" className="card-link">
              <i className="fab fa-github"></i> View Code
            </a>
          </div>

          <div className="info-card reveal">
            <div className="card-icon">🌟</div>
            <h3>Weather App</h3>
            <p>Real-time weather application with location search, 5-day forecast, and dynamic UI updates using the OpenWeather API.</p>
            <div className="card-tags">
              <span className="skill-tag">Python</span>
              <span className="skill-tag cyan">REST API</span>
              <span className="skill-tag">Flask</span>
            </div>
            <a href="https://github.com/Urmila1945/Weather_App" target="_blank" rel="noreferrer" className="card-link">
              <i className="fab fa-github"></i> View Code
            </a>
          </div>

          <div className="info-card reveal">
            <div className="card-icon">🎯</div>
            <h3>Mood Based Music System</h3>
            <p>An AI-powered music recommendation system that suggests songs based on the user's current mood, utilizing sentiment analysis and collaborative filtering techniques.</p>
            <div className="card-tags">
              <span className="skill-tag">ML</span>
              <span className="skill-tag cyan">Pandas</span>
              <span className="skill-tag">Matplotlib</span>
            </div>
            <a href="https://github.com/Urmila1945/Mood_Based_Music_System" target="_blank" rel="noreferrer" className="card-link">
              <i className="fab fa-github"></i> View Code
            </a>
          </div>

          <div className="info-card reveal">
            <div className="card-icon">👀</div>
            <h3>Face Detection and recognition System</h3>
            <p>Computer vision project using OpenCV and deep learning to detect and recognize faces in real-time from webcam feed.</p>
            <div className="card-tags">
              <span className="skill-tag">OpenCV</span>
              <span className="skill-tag cyan">Deep Learning</span>
              <span className="skill-tag">Python</span>
            </div>
            <a href="https://github.com/Urmila1945/FACE_DETECTION_AND_RECOGNITION" target="_blank" rel="noreferrer" className="card-link">
              <i className="fab fa-github"></i> View Code
            </a>
          </div>

          <div className="info-card reveal">
            <div className="card-icon">📋</div>
            <h3>Portfolio Website</h3>
            <p>This very portfolio! Built with React, Python backend for contact storage, AI Resume Analyzer, chatbot, and smooth animations.</p>
            <div className="card-tags">
              <span className="skill-tag">React</span>
              <span className="skill-tag cyan">Python</span>
              <span className="skill-tag">CSS</span>
            </div>
            <a href="https://github.com/Urmila1945" target="_blank" rel="noreferrer" className="card-link">
              <i className="fab fa-github"></i> View Code
            </a>
          </div>

          <div className="info-card reveal">
            <div className="card-icon">🥗</div>
            <h3>Auto Diet Generator using AI + Grocery Optimizer (SmartBite)</h3>
            <p>An AI-powered health platform built with Flask and MongoDB that generates personalized diet plans and optimizes grocery shopping lists based on user profiles.</p>
            <div className="card-tags">
              <span className="skill-tag">Flask</span>
              <span className="skill-tag cyan">AI / ML</span>
              <span className="skill-tag">MongoDB</span>
            </div>
            <a href="https://github.com/Urmila1945" target="_blank" rel="noreferrer" className="card-link">
              <i className="fab fa-github"></i> View Code
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Projects;

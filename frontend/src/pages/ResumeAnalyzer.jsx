import React, { useState } from 'react';

function ResumeAnalyzer() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAnalysis(null);

    const formData = new FormData(e.target);

    try {
      const response = await fetch('/analyze_resume', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setAnalysis(data.analysis);
      } else {
        setError(data.error || 'Failed to analyze resume.');
      }
    } catch (err) {
      setError('An error occurred during upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ paddingTop: '90px', minHeight: '80vh' }}>
      <section style={{ padding: '60px 8%', textAlign: 'center' }}>
        <h1 className="section-title reveal">AI Resume Analyzer</h1>
        <span className="section-accent reveal"></span>
        <p className="section-subtitle reveal">Upload your resume and get AI-powered feedback instantly.</p>

        <div className="analyzer-container reveal">
          <form className="upload-box" id="resume-form" onSubmit={handleSubmit}>
            <label className="upload-label" htmlFor="resume-file">
              <i className="fas fa-cloud-upload-alt"></i>
              <span>Drop your PDF here or click to browse</span>
              <input accept=".pdf" id="resume-file" name="resume" required type="file" />
            </label>
            <button className="btn glow-btn" style={{ marginTop: '1.5rem' }} type="submit" disabled={loading}>
              <i className="fas fa-magic"></i> {loading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </form>
          {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        </div>

        {analysis && (
          <div className="analysis-results reveal">
            <h2 style={{ color: 'var(--accent-1)', marginBottom: '2rem', fontFamily: 'var(--font-display)' }}>Analysis Results</h2>
            <div className="result-grid">
              <div className="result-card">
                <div className="res-icon">🎯</div>
                <h4>Detected Skills</h4>
                <p>{analysis.skills}</p>
              </div>
              <div className="result-card">
                <div className="res-icon">💡</div>
                <h4>Suggestions</h4>
                <p>{analysis.suggestions}</p>
              </div>
              <div className="result-card">
                <div className="res-icon">🚀</div>
                <h4>Project Ideas</h4>
                <p>{analysis.projects}</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default ResumeAnalyzer;

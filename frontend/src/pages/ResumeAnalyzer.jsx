import React, { useState } from 'react';

function ResumeAnalyzer() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0].name);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAnalysis(null);

    const formData = new FormData(e.target);

    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/analyze_resume`, {
        method: 'POST',
        body: formData,
      });
      let data;
      try {
        data = await response.json();
      } catch (err) {
        throw new Error(`Server error (${response.status})`);
      }

      if (data.success) {
        setAnalysis(data.analysis);
      } else {
        setError(data.error || 'Failed to analyze resume.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during upload.');
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
            <label className="upload-label" htmlFor="resume-file" style={{ cursor: 'pointer', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px', border: '2px dashed var(--border)', borderRadius: '15px' }}>
              <i className="fas fa-cloud-upload-alt" style={{ fontSize: '3rem', color: 'var(--accent-1)' }}></i>
              <span style={{ display: 'block', marginTop: '10px' }}>
                {selectedFile ? `Selected: ${selectedFile}` : 'Drop your PDF here or click to browse'}
              </span>
              <input accept=".pdf" id="resume-file" name="resume" required type="file" onChange={handleFileChange} style={{ opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }} />
            </label>
            <button className="btn glow-btn" style={{ marginTop: '1.5rem', zIndex: 2, position: 'relative' }} type="submit" disabled={loading || !selectedFile}>
              <i className="fas fa-magic"></i> {loading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </form>
          {error && <p style={{ color: '#f87171', marginTop: '1rem', fontWeight: 'bold' }}>{error}</p>}
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

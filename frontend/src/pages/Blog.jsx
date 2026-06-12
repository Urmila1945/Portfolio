import React from 'react';

function Blog() {
  return (
    <main style={{'padding-top': '90px', 'min-height': '80vh', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center', 'text-align': 'center', 'padding': '120px 8%'}}>
<div className="reveal">
<div style={{'font-size': '5rem', 'margin-bottom': '1.5rem'}}>📝</div>
<h1 className="section-title">Blog &amp; Articles</h1>
<span className="section-accent" style={{'margin': '1rem auto 2rem'}}></span>
<p className="section-subtitle" style={{'max-width': '450px', 'margin': '0 auto 2rem'}}>
        I'm working on sharing my learnings, project deep-dives, and AI insights here. Coming soon!
      </p>
<a className="btn btn-primary" href="/portfolio"><i className="fas fa-arrow-left"></i> Back to Portfolio</a>
</div>
</main>
  );
}

export default Blog;

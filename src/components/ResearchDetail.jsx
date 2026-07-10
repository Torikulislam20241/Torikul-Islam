export default function ResearchDetail({ paper }) {
  if (!paper) return <main className="research-page"><div className="container research-not-found"><p>Research paper not found.</p><a className="btn-primary" href="/#achievements">Back to achievements</a></div></main>
  return (
    <div className="research-detail-shell">
      <header className="detail-header"><div className="container detail-nav"><a className="navbar-brand" href="/"><span>Torikul Islam</span></a><a className="detail-back" href="/achievements"><span aria-hidden="true">←</span> Back to achievements</a></div></header>
      <main className="research-page"><article className="container research-detail">
        <div className="research-detail-hero"><span className="detail-eyebrow">Published research</span><h1>{paper.title}</h1><p>{paper.description}</p>
          <div className="detail-meta"><div><span>Publication</span><strong>{paper.publication}</strong></div><div><span>Publication date</span><strong>{paper.date}</strong></div><div><span>Authors</span><strong>{paper.authors.join(', ')}</strong></div></div>
          {paper.paperUrl && <a className="btn-primary compact-button" href={paper.paperUrl} target="_blank" rel="noopener noreferrer">View official paper ↗</a>}
        </div>
        {paper.image && <figure className="research-figure glass-card"><img src={paper.image} alt={`Research visual for ${paper.title}`} /></figure>}
        <div className="research-content-grid"><div className="research-main-content">
          <section><span className="section-number">01</span><div><h2>Abstract</h2><p>{paper.abstract}</p></div></section>
          <section><span className="section-number">02</span><div><h2>Methodology</h2><p>{paper.methodology}</p></div></section>
          <section><span className="section-number">03</span><div><h2>Results & findings</h2><p>{paper.results}</p></div></section>
        </div><aside className="research-sidebar glass-card"><h2>Paper details</h2><div><span>Authors</span><p>{paper.authors.join(', ')}</p></div><div><span>Published in</span><p>{paper.publication}</p></div><div><span>Date</span><p>{paper.date}</p></div><div><span>Keywords</span><div className="project-tags">{paper.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div></div></aside></div>
      </article></main>
    </div>
  )
}

import { researchPapers } from '../data/research.js'

export default function Achievements() {
  return (
    <section className="page-section achievements-section" id="achievements" aria-label="My Achievements">
      <div className="container">
        <div className="page-heading reveal"><span>Research & Publications</span><h1>My Achievements</h1><p>Published research that connects academic inquiry with practical computing and technology-led solutions.</p></div>
        <div className="research-grid">
          {researchPapers.map((paper, index) => (
            <article className="research-card glass-card reveal" key={paper.slug} style={{ '--delay': `${index * 80}ms` }}>
              <div className="research-card-topline"><span>Publication</span><span>{paper.date}</span></div>
              <h2>{paper.title}</h2><p>{paper.description}</p>
              <div className="research-publication"><span>Published in</span><strong>{paper.publication}</strong></div>
              <div className="research-actions">
                {paper.paperUrl ? <a className="btn-outline compact-button" href={paper.paperUrl} target="_blank" rel="noopener noreferrer">Paper Link</a> : <span className="btn-outline compact-button button-disabled" title="Add the official URL in src/data/research.js">Paper Link</span>}
                <a className="btn-primary compact-button" href={`/research/${paper.slug}`}>See More <span aria-hidden="true">→</span></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

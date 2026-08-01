import SectionHeading from './SectionHeading.jsx'
import projects from '../content/projects.json'
import sections from '../content/sections.json'

export default function Work({ standalone = false }) {
  return (
    <section className="page-section work-section" id="work" aria-label="Projects">
      <div className="container">
        <SectionHeading {...sections.work} level={standalone ? 1 : 2} />

        <div className="work-grid">
          {projects.map((project, index) => (
            <article
              className="project-card glass-card reveal"
              key={project.title}
              style={{ '--delay': `${index * 70}ms` }}
          >
              <div className={`project-preview project-preview-${(index % 3) + 1}`}>
                {project.image ? <img src={project.image} alt={`${project.title} website preview`} loading="lazy" /> : (
                  <div className="food-preview" aria-label="Food ordering interface preview">
                    <div className="food-preview-nav"><span className="food-preview-logo">Bite</span><div><i /><i /><i /></div></div>
                    <div className="food-preview-copy"><small>Fresh food, fast delivery</small><strong>Order your favourites.</strong><span /></div>
                    <div className="food-preview-items"><i /><i /><i /></div>
                  </div>
                )}
              </div>
              <div className="project-card-body">
              <div className="project-meta-line">
                <span>{project.type}</span>
                <span>{project.year}</span>
              </div>

              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="project-tags" aria-label={`${project.title} tech stack`}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="project-actions">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} live website`}
                >
                  Live Project
                </a>
                <a href="/contact" aria-label={`Contact Torikul Islam about ${project.title}`}>
                  Start Similar Project
                </a>
              </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

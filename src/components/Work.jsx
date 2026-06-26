import { useState } from 'react'

const projects = [
  {
    id: 1,
    featured: true,
    cat: 'web',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop',
    alt: 'Online Food Ordering System',
    type: 'Featured · Web App',
    year: '2025',
    title: 'Online Food Ordering System',
    desc: 'Designed an intuitive Food Ordering System, emphasizing clarity and user efficiency.',
    stack: ['WordPress', 'Elementor', 'Hostinger', 'WooCommerce'],
    link: 'https://lokalexpressgrill.com/',
    linkLabel: 'View Live ↗',
  },
  {
    id: 2,
    featured: false,
    cat: 'ecom',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop',
    alt: 'Farming Website',
    type: 'Business',
    year: '2026',
    title: 'Farming Website',
    desc: 'Developed a modern Farming Website that sells a variety of farming products with a focus on usability and seamless navigation for end users.',
    stack: ['WordPress', 'Elementor', 'WooCommerce'],
    link: 'https://mollahauto.com/',
    linkLabel: 'View Live ↗',
  },
  {
    id: 3,
    featured: false,
    cat: 'design',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
    alt: 'POS System',
    type: 'POS',
    year: '2025',
    title: 'Developed a POS System to Manage Sales',
    desc: 'Created a responsive dashboard layout that manages sales smoothly across devices and screen sizes.',
    stack: ['PHP', 'Bootstrap', 'Laravel', 'API', 'SQL'],
    link: 'https://pos.mollahauto.com/',
    linkLabel: 'View Live ↗',
  },
  {
    id: 4,
    featured: false,
    cat: 'web',
    img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80&auto=format&fit=crop',
    alt: 'Business Website',
    type: 'Web App · Dashboard',
    year: '2025',
    title: 'Business Website',
    desc: 'Improved user experience through strategic workflow streamlining and comprehensive interface component optimization.',
    stack: ['WordPress', 'Elementor', 'Hostinger'],
    link: 'https://medullaocean.com/',
    linkLabel: 'Get in Touch ↗',
  },
]

const filters = [
  { id: 'all',    label: 'All' },
  { id: 'web',   label: 'Web Apps' },
  { id: 'design',label: 'Design' },
  { id: 'ecom',  label: 'E-Commerce' },
]

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('all')

  const visible = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.cat === activeFilter)

  return (
    <section id="work" className="section-pad" aria-label="Portfolio work">
      <div className="container">

        {/* Header row */}
        <div className="work-heading-row reveal">
          <div>
            <div className="section-label" aria-hidden="true">Portfolio</div>
            <h2 className="section-title">Selected work</h2>
          </div>
          <div className="work-filter" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f.id}
                className={`filter-btn${activeFilter === f.id ? ' active' : ''}`}
                onClick={() => setActiveFilter(f.id)}
                aria-pressed={activeFilter === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="row g-4">
          {visible.map((p) =>
            p.featured ? (
              /* ── Featured: full-width, image + body side by side ── */
              <div key={p.id} className="col-12 reveal">
                <article className="project-card featured" aria-label={p.title}>
                  <div className="row g-0 h-100">
                    <div className="col-md-6">
                      <div className="project-img-wrap h-100">
                        <img
                          className="project-img"
                          src={p.img}
                          alt={p.alt}
                          loading="lazy"
                        />
                        <div className="project-overlay">
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-overlay-btn"
                          >
                            {p.linkLabel}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="project-body">
                        <div className="project-meta">
                          <span className="project-type">{p.type}</span>
                          <span className="project-year">{p.year}</span>
                        </div>
                        <div className="project-title">{p.title}</div>
                        <div className="project-desc">{p.desc}</div>
                        <div className="project-stack" aria-label="Tech stack">
                          {p.stack.map((t) => (
                            <span key={t} className="stack-tag">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ) : (
              /* ── Regular: half-width card ── */
              <div key={p.id} className="col-md-6 reveal">
                <article className="project-card" aria-label={p.title}>
                  <div className="project-img-wrap">
                    <img
                      className="project-img"
                      src={p.img}
                      alt={p.alt}
                      loading="lazy"
                    />
                    <div className="project-overlay">
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-overlay-btn"
                      >
                        {p.linkLabel}
                      </a>
                    </div>
                  </div>
                  <div className="project-body">
                    <div className="project-meta">
                      <span className="project-type">{p.type}</span>
                      <span className="project-year">{p.year}</span>
                    </div>
                    <div className="project-title">{p.title}</div>
                    <div className="project-desc">{p.desc}</div>
                    <div className="project-stack" aria-label="Tech stack">
                      {p.stack.map((t) => (
                        <span key={t} className="stack-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            )
          )}
        </div>

      </div>
    </section>
  )
}

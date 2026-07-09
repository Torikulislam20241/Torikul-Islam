const projects = [
  {
    title: 'Online Food Ordering System',
    type: 'Featured Web App',
    year: '2025',
    description:
      'Designed an intuitive food ordering system with a clear product flow and fast ordering experience.',
    tags: ['WordPress', 'Elementor', 'Hostinger', 'WooCommerce'],
    link: 'https://lokalexpressgrill.com/',
  },
  {
    title: 'Farming Website',
    type: 'Business Website',
    year: '2026',
    description:
      'Developed a modern farming website for product sales with a simple, responsive customer journey.',
    tags: ['WordPress', 'Elementor', 'WooCommerce'],
    link: 'https://mollahauto.com/',
  },
  {
    title: 'POS System to Manage Sales',
    type: 'POS Dashboard',
    year: '2025',
    description:
      'Created a responsive POS dashboard that helps manage sales smoothly across devices and screen sizes.',
    tags: ['PHP', 'Bootstrap', 'Laravel', 'API', 'SQL'],
    link: 'https://pos.mollahauto.com/',
  },
  {
    title: 'Business Website',
    type: 'Client Website',
    year: '2025',
    description:
      'Improved the website experience with cleaner workflows, optimized interface sections, and a focused business presentation.',
    tags: ['WordPress', 'Elementor', 'Hostinger'],
    link: 'https://medullaocean.com/',
  },
]

export default function Work() {
  return (
    <section id="work" className="section work-section">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-subtitle">My Work</p>
          <h2 className="section-title">My Work</h2>
        </div>

        <div className="work-grid">
          {projects.map((project, index) => (
            <article
              className="project-card reveal"
              key={project.title}
              style={{ '--delay': `${index * 80}ms` }}
            >
              <div className="project-meta-line">
                <span>{project.type}</span>
                <span>{project.year}</span>
              </div>

              <div className="project-tags" aria-label={`${project.title} tech stack`}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="project-actions">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} live website`}
                >
                  Live Project
                </a>
                <a href="#contact" aria-label={`Contact Tariqul about ${project.title}`}>
                  Discuss Similar Project
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

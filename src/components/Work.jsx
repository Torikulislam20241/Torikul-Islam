const projects = [
  {
    title: 'Online Food Ordering System',
    type: 'Featured · Web App',
    year: '2025',
    description:
      'Designed an intuitive Food Ordering System, emphasizing clarity and user efficiency.',
    tags: ['WordPress', 'Elementor', 'Hostinger', 'WooCommerce'],
    link: 'https://lokalexpressgrill.com/',
  },
  {
    title: 'Farming Website',
    type: 'Business',
    year: '2026',
    description:
      'Developed a modern Farming Website that sells a variety of farming products with a focus on usability and seamless navigation for end users.',
    tags: ['WordPress', 'Elementor', 'WooCommerce'],
    link: 'https://mollahauto.com/',
  },
  {
    title: 'Developed a POS System to Manage Sales',
    type: 'POS',
    year: '2025',
    description:
      'Created a responsive dashboard layout that manages sales smoothly across devices and screen sizes.',
    tags: ['PHP', 'Bootstrap', 'Laravel', 'API', 'SQL'],
    link: 'https://pos.mollahauto.com/',
  },
  {
    title: 'Business Website',
    type: 'Web App · Dashboard',
    year: '2025',
    description:
      'Improved user experience through strategic workflow streamlining and comprehensive interface component optimization.',
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

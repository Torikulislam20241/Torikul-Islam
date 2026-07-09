const projects = [
  {
    title: 'PaawVital',
    description:
      'Shopify dropshipping store for pet care products. Targeting US, Canada & NZ markets.',
    tags: ['Shopify', 'Liquid', 'CJdropshipping'],
  },
  {
    title: 'Torikul Islam Portfolio',
    description: 'Personal developer portfolio with React + Vite, deployed on Vercel.',
    tags: ['React', 'Vite', 'CSS3', 'Vercel'],
  },
  {
    title: 'Google Merchant Center MCP',
    description:
      'Custom Python MCP server integrating Claude AI with Google Merchant Center API.',
    tags: ['Python', 'FastMCP', 'Google API', 'Claude AI'],
  },
  {
    title: 'Skye Commercial Company',
    description: 'Custom WordPress theme built from scratch with navy/gold palette.',
    tags: ['WordPress', 'PHP', 'CSS3'],
  },
  {
    title: 'Essex Muslim Centre',
    description: 'Client website proposal and build with a clean CMS workflow.',
    tags: ['WordPress', 'Elementor', 'SEO'],
  },
  {
    title: 'MERN Stack App',
    description: 'Full-stack web application with authentication, REST API and MongoDB.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
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
              <div className="project-tags" aria-label={`${project.title} tech stack`}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-actions">
                <a href="#" aria-label={`${project.title} live demo`}>
                  🔗 Live Demo
                </a>
                <a href="#" aria-label={`${project.title} GitHub repository`}>
                  <span aria-hidden="true">{'</>'}</span> GitHub
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

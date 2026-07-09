const projects = [
  {
    title: 'Online Food Ordering System',
    type: 'Featured Web App',
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
    type: 'Web App Dashboard',
    year: '2025',
    description:
      'Improved user experience through strategic workflow streamlining and comprehensive interface component optimization.',
    tags: ['WordPress', 'Elementor', 'Hostinger'],
    link: 'https://medullaocean.com/',
  },
  {
    title: 'PaawVital',
    type: 'Shopify E-commerce',
    year: '2026',
    description:
      'Built a Shopify pet care store for grooming tools and smart essentials, with product sections, trust messaging, shipping guarantees, and a conversion-focused storefront for dog and cat owners.',
    tags: ['Shopify', 'Liquid', 'E-commerce', 'Pet Care'],
    link: 'https://paawvital.com/',
  },
  {
    title: 'Essex Muslim Centre',
    type: 'Community Website',
    year: '2026',
    description:
      'Developed a community and charity website with prayer-time sections, service pages, events, donation calls to action, and clear navigation for Chelmsford worshippers.',
    tags: ['WordPress', 'Community', 'Events', 'Charity'],
    link: 'https://slategray-wren-213577.hostingersite.com/',
  },
]

export default function Work() {
  return (
    <section className="page-section work-section" id="work" aria-label="Projects">
      <div className="container">
        <div className="page-heading reveal visible">
          <span>Recent Work</span>
          <h1>Featured Projects</h1>
          <p>
            A focused collection of websites, e-commerce stores, dashboards, and
            client builds with live project links.
          </p>
        </div>

        <div className="work-grid">
          {projects.map((project, index) => (
            <article
              className="project-card glass-card reveal"
              key={project.title}
              style={{ '--delay': `${index * 70}ms` }}
            >
              <div className="project-meta-line">
                <span>{project.type}</span>
                <span>{project.year}</span>
              </div>

              <h2>{project.title}</h2>
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
                <a href="#contact" aria-label={`Contact Torikul Islam about ${project.title}`}>
                  Start Similar Project
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

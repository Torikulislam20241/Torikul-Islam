import TechIcon from './TechIcon.jsx'

const services = [
  {
    icon: 'cart', title: 'Shopify Development',
    description: 'Conversion-focused Shopify builds for stores that need to launch cleanly.',
    deliverables: [
      'Custom Liquid themes',
      'App integration',
      'Dropshipping setup',
      'CJdropshipping config',
    ],
  },
  {
    icon: 'layout', title: 'WordPress Development',
    description: 'Custom WordPress sites that are easy to manage and built for speed.',
    deliverables: [
      'Custom themes from scratch',
      'WooCommerce',
      'Plugin setup',
      'Speed optimization',
    ],
  },
  {
    icon: 'code', title: 'MERN Stack Development',
    description: 'Modern full-stack applications with reliable APIs and responsive UI.',
    deliverables: [
      'React frontend',
      'Node/Express API',
      'MongoDB database',
      'Authentication flows',
    ],
  },
  {
    icon: 'server', title: 'E-commerce Setup',
    description: 'Complete store launch support from catalog to checkout readiness.',
    deliverables: [
      'Product setup',
      'Shipping and taxes',
      'Store policies',
      'Payment gateways',
    ],
  },
  {
    icon: 'speed', title: 'SEO & Performance',
    description: 'Technical improvements that make websites faster and easier to discover.',
    deliverables: [
      'On-page SEO',
      'Core Web Vitals fixes',
      'Google Analytics',
      'Search Console setup',
    ],
  },
  {
    icon: 'spark', title: 'AI & Automation',
    description: 'Practical automation for business workflows and API-driven systems.',
    deliverables: [
      'Custom MCP servers',
      'API integrations',
      'Workflow automation',
      'Claude AI tooling',
    ],
  },
]

export default function Services() {
  return (
    <section className="page-section services-section" id="services" aria-label="Services">
      <div className="container">
        <div className="page-heading reveal visible">
          <span>What I Do</span>
          <h1>Services I Offer</h1>
          <p>
            From idea to deployment, I provide focused development services for
            businesses that need clean execution.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <article
              className="service-card glass-card reveal"
              key={service.title}
              style={{ '--delay': `${index * 70}ms` }}
            >
              <div className="service-icon"><TechIcon name={service.icon} /></div>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <ul>
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="page-cta reveal">
          <a className="btn-primary" href="/contact">
            Discuss Your Project
          </a>
        </div>
      </div>
    </section>
  )
}

const services = [
  {
    icon: '🛒',
    title: 'Shopify Development',
    description: 'Conversion-focused Shopify builds for stores that need to launch cleanly.',
    deliverables: [
      'Custom Liquid themes',
      'App integration',
      'Dropshipping setup',
      'CJdropshipping config',
    ],
  },
  {
    icon: '🌐',
    title: 'WordPress Development',
    description: 'Custom WordPress sites that are easy to manage and built for speed.',
    deliverables: [
      'Custom themes from scratch',
      'WooCommerce',
      'Plugin setup',
      'Speed optimization',
    ],
  },
  {
    icon: '⚛️',
    title: 'MERN Stack Development',
    description: 'Modern full-stack applications with reliable APIs and responsive UI.',
    deliverables: [
      'React frontend',
      'Node/Express API',
      'MongoDB database',
      'Authentication flows',
    ],
  },
  {
    icon: '📈',
    title: 'E-commerce Setup',
    description: 'Complete store launch support from catalog to checkout readiness.',
    deliverables: [
      'Product setup',
      'Shipping and taxes',
      'Store policies',
      'Payment gateways',
    ],
  },
  {
    icon: '🔍',
    title: 'SEO & Performance',
    description: 'Technical improvements that make websites faster and easier to discover.',
    deliverables: [
      'On-page SEO',
      'Core Web Vitals fixes',
      'Google Analytics',
      'Search Console setup',
    ],
  },
  {
    icon: '🤖',
    title: 'AI & Automation',
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
    <section id="services" className="section services-section">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-subtitle">Services</p>
          <h2 className="section-title">Services</h2>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <article
              className="service-card reveal"
              key={service.title}
              style={{ '--delay': `${index * 80}ms` }}
            >
              <div className="service-icon" aria-hidden="true">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

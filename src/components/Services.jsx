const services = [
  {
    icon: '🎨',
    title: 'Web Design & Development',
    desc: 'Custom, responsive websites designed to convert visitors into clients. Pixel-perfect execution with modern aesthetics.',
    tags: ['React', 'Next.js', 'HTML/CSS'],
  },
  {
    icon: '⚙️',
    title: 'Full Stack Applications',
    desc: 'End-to-end web applications with robust backends, clean APIs, and seamless user experiences built for scale.',
    tags: ['Node.js', 'REST API', 'Database'],
  },
  {
    icon: '🛒',
    title: 'E-Commerce Solutions',
    desc: 'High-converting online stores with smooth checkout flows, inventory management, and payment integrations.',
    tags: ['Stripe', 'Cart', 'CMS'],
  },
  {
    icon: '🔍',
    title: 'SEO & Performance',
    desc: 'Technical SEO implementation and performance optimization to make your website rank and load blazing fast.',
    tags: ['Core Web Vitals', 'Meta', 'Speed'],
  },
  {
    icon: '🤖',
    title: 'AI Integration',
    desc: 'Embed intelligent features into your product — chatbots, recommendations, and AI-powered workflows.',
    tags: ['OpenAI', 'LLM', 'Automation'],
  },
  {
    icon: '🔧',
    title: 'Redesign & Revamp',
    desc: 'Transform outdated sites into modern, high-performing digital assets without losing what makes you unique.',
    tags: ['Audit', 'Rebuild', 'Migrate'],
  },
]

export default function Services() {
  return (
    <section id="services" className="section-pad" aria-label="Services">
      <div className="container">

        {/* Header */}
        <div className="row align-items-end g-4 services-header-wrap reveal">
          <div className="col-lg-6">
            <div className="section-label" aria-hidden="true">What I Do</div>
            <h2 className="section-title">Services built for real results</h2>
          </div>
          <div className="col-lg-6">
            <p className="section-desc">
              From concept to launch, I deliver complete digital solutions that give
              your business a credible, competitive online presence.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="row g-4">
          {services.map((s) => (
            <div key={s.title} className="col-lg-4 col-md-6">
              <div className="service-card reveal">
                <div className="service-icon" aria-hidden="true">{s.icon}</div>
                <div className="service-title">{s.title}</div>
                <div className="service-desc">{s.desc}</div>
                <div className="service-tags" aria-label="Technologies">
                  {s.tags.map((tag) => (
                    <span key={tag} className="service-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

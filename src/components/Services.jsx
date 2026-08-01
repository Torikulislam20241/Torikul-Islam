import SectionHeading from './SectionHeading.jsx'
import TechIcon from './TechIcon.jsx'
import services from '../content/services.json'
import sections from '../content/sections.json'

export default function Services() {
  return (
    <section className="page-section services-section" id="services" aria-label="Services">
      <div className="container">
        <SectionHeading
          eyebrow={sections.services.eyebrow}
          title={sections.services.title}
          description={sections.services.description}
        />

        <div className="services-grid">
          {services.map((service, index) => (
            <article
              className="service-card glass-card reveal"
              key={service.title}
              style={{ '--delay': `${index * 70}ms` }}
            >
              <div className="service-icon"><TechIcon name={service.icon} /></div>
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

        <div className="page-cta reveal">
          <a className="btn-primary" href="/contact">
            {sections.services.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  )
}

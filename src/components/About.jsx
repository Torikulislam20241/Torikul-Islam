import { cv, profile } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import TechIcon from './TechIcon.jsx'

const infoCards = [
  { label: 'Location', value: 'Dhaka, Bangladesh' },
  { label: 'Education', value: 'BSc Computer Science, IUBAT' },
  { label: 'Freelance', value: 'Upwork & Fiverr Freelancer' },
]

export default function About() {
  return (
    <section className="page-section about-section" id="about" aria-label="About Torikul Islam">
      <div className="container">
        <SectionHeading
          eyebrow="About Me"
          title="Developer, e-commerce builder, and problem solver."
          description="I help businesses create strong online presences with practical, fast, and maintainable web solutions."
          level={1}
        />

        <div className="about-grid">
          <div className="about-copy reveal">
            <h2>I'm Torikul Islam</h2>
            <p>
              I'm a full-stack web developer and e-commerce specialist based in
              Dhaka, Bangladesh. I help businesses build powerful online presences
              through custom WordPress themes, Shopify stores, and MERN stack
              applications.
            </p>
            <p>
              Currently completing my Computer Science degree at IUBAT while
              freelancing on Upwork and Fiverr. I'm passionate about clean code,
              performance optimization, and shipping products that actually work.
            </p>

            <div className="about-info-cards">
              {infoCards.map((item) => (
                <div className="about-info-card glass-card" key={item.label}>
                  <span>{item.label}</span>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="about-actions">
              <a className="btn-primary" href="/contact">
                Hire Me
              </a>
              <a
                className="btn-outline"
                href={cv.href}
                download={cv.fileName}
                aria-label={`Download ${profile.name}'s CV as a PDF`}
              >
                <TechIcon name="download" />
                Download CV
              </a>
            </div>
          </div>

          <div className="about-image-wrap reveal" style={{ '--delay': '120ms' }}>
            <div className="about-image-frame glass-card">
              <img
                src={profile.portrait}
                alt={`${profile.fullName}, full-stack web developer, smiling at the camera`}
                width="720"
                height="720"
                loading="lazy"
                decoding="async"
              />
              <div className="open-to-work">
                <span aria-hidden="true" />
                Open to Work
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

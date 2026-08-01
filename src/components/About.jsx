import { cv, profile } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import TechIcon from './TechIcon.jsx'
import sections from '../content/sections.json'

const about = sections.about

export default function About() {
  return (
    <section className="page-section about-section" id="about" aria-label="About Torikul Islam">
      <div className="container">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.title}
          description={about.description}
          level={1}
        />

        <div className="about-grid">
          <div className="about-copy reveal">
            <h2>{about.heading}</h2>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}

            <div className="about-info-cards">
              {about.infoCards.map((item) => (
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

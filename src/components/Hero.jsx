import TechIcon from './TechIcon.jsx'
import { cv, profile, socialLinks, stats } from '../data/site.js'

const heroSocials = socialLinks.filter((link) => link.label === 'GitHub' || link.label === 'LinkedIn')

const codeSnippet = [
  { indent: 0, parts: [['kw', 'const'], ['plain', ' '], ['var', 'developer'], ['plain', ' = {']] },
  { indent: 1, parts: [['key', 'name'], ['plain', ': '], ['str', "'Torikul Islam'"], ['plain', ',']] },
  { indent: 1, parts: [['key', 'role'], ['plain', ': '], ['str', "'Full-Stack Developer'"], ['plain', ',']] },
  { indent: 1, parts: [['key', 'stack'], ['plain', ': ['], ['str', "'React'"], ['plain', ', '], ['str', "'Node.js'"], ['plain', '],']] },
  { indent: 1, parts: [['key', 'cms'], ['plain', ': ['], ['str', "'WordPress'"], ['plain', ', '], ['str', "'Shopify'"], ['plain', '],']] },
  { indent: 1, parts: [['key', 'available'], ['plain', ': '], ['bool', 'true'], ['plain', ',']] },
  { indent: 0, parts: [['plain', '}']] },
]

const focusAreas = ['React & Node.js', 'Shopify Liquid', 'WordPress', 'Core Web Vitals']

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-status">
            <span className="hero-status-dot" aria-hidden="true" />
            {profile.availability}
          </p>

          <h1 className="hero-title" id="hero-title">
            <span className="hero-intro">Hi, I&rsquo;m</span>{' '}
            Torikul Islam
          </h1>

          <p className="hero-role">
            {profile.role}{' '}
            <span aria-hidden="true">&middot;</span>{' '}
            {profile.location}
          </p>

          <p className="hero-summary">{profile.summary}</p>

          <div className="hero-actions">
            <a className="btn-primary" href="/projects">
              View my work
              <TechIcon name="arrow" />
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

          <div className="hero-links">
            <span className="hero-links-label">Find me on</span>
            {heroSocials.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                <TechIcon name={link.icon} />
                {link.label}
              </a>
            ))}
            <a href={`mailto:${profile.email}`}>
              <TechIcon name="mail" />
              Email
            </a>
          </div>

          <dl className="hero-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-visual">
          <div className="code-card">
            <div className="code-card-bar">
              <span className="code-card-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="code-card-file">developer.js</span>
            </div>

            <pre
              className="code-card-body"
              role="img"
              aria-label="Code snippet describing Torikul Islam: full-stack developer working with React, Node and MongoDB, building WordPress and Shopify sites, currently available for work."
            >
              {codeSnippet.map((line, index) => (
                <span className="code-line" key={index}>
                  <span className="code-line-number" aria-hidden="true">{index + 1}</span>
                  <span className="code-line-text" style={{ '--indent': line.indent }}>
                    {line.parts.map(([token, text], partIndex) => (
                      <span className={`t-${token}`} key={partIndex}>{text}</span>
                    ))}
                  </span>
                </span>
              ))}
            </pre>

            <div className="code-card-foot">
              <img
                className="code-card-avatar"
                src={profile.avatar}
                alt={`Portrait of ${profile.fullName}`}
                width="44"
                height="44"
                loading="eager"
                decoding="async"
              />
              <div className="code-card-identity">
                <strong>{profile.fullName}</strong>
                <span>{profile.responseTime}</span>
              </div>
              <span className="code-card-badge">
                <TechIcon name="check" />
                Open to work
              </span>
            </div>
          </div>

          <ul className="hero-focus" aria-label="Current focus areas">
            {focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

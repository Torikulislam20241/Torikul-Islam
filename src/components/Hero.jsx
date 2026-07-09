const highlights = [
  { title: 'Frontend', detail: 'React & Vite' },
  { title: 'Shopify', detail: 'Store builds' },
  { title: 'Full Stack', detail: 'MERN apps' },
]

const stats = ['50+ Projects Delivered', '3+ Years Experience', '15+ Happy Clients']

export default function Hero() {
  return (
    <section className="hero-section home-page" id="hero" aria-label="Home">
      <div className="hero-background" aria-hidden="true">
        <span className="hero-orb hero-orb-one" />
        <span className="hero-orb hero-orb-two" />
      </div>

      <div className="container hero-container">
        <div className="hero-content reveal visible">
          <div className="hero-badge">
            <span aria-hidden="true" />
            Available for new projects
          </div>

          <h1>
            <span>Torikul Islam</span>
            <br />
            I Build Digital Experiences
          </h1>

          <p>
            Full-stack developer and e-commerce specialist building fast,
            scalable, and production-ready websites that drive business results.
          </p>

          <div className="hero-actions">
            <a className="btn-primary" href="#work">
              View My Work
            </a>
            <a className="btn-outline" href="#contact">
              Get In Touch
            </a>
          </div>

          <div className="hero-highlight-grid" aria-label="Core services">
            {highlights.map((item) => (
              <a className="hero-highlight-card glass-card" href="#skills" key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </a>
            ))}
          </div>

          <div className="hero-stats" aria-label="Experience stats">
            {stats.map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

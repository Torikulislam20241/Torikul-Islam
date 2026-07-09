const stats = ['3+ Years Experience', '50+ Projects Delivered', '15+ Happy Clients']
const techPills = ['WordPress', 'Shopify', 'MERN Stack']

export default function Hero() {
  return (
    <section id="hero" className="hero-section" aria-label="Hero">
      <div className="hero-background" aria-hidden="true">
        <span className="hero-orb hero-orb-one" />
        <span className="hero-orb hero-orb-two" />
        <span className="hero-orb hero-orb-three" />
      </div>

      <div className="container hero-container">
        <div className="hero-content reveal visible">
          <div className="hero-badge">👋 Available for freelance work</div>
          <h1>Tariqul Islam</h1>
          <div className="hero-subtitle">
            <h2>Full-Stack Developer</h2>
            <div className="hero-tech-pills" aria-label="Core technologies">
              {techPills.map((pill) => (
                <span key={pill}>{pill}</span>
              ))}
            </div>
          </div>
          <p>
            I build fast, scalable, and production-ready web solutions that drive real
            business results.
          </p>

          <div className="hero-actions">
            <a className="btn-primary" href="#work">
              View My Work
            </a>
            <a className="btn-outline" href="#contact">
              Hire Me
            </a>
          </div>

          <div className="hero-stats" aria-label="Experience stats">
            {stats.map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
          </div>
        </div>
      </div>

      <a className="scroll-indicator" href="#about" aria-label="Scroll to about section">
        ↓
      </a>
    </section>
  )
}

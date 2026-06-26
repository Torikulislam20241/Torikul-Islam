export default function Hero() {
  return (
    <section id="home" aria-label="Hero">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-glow"  aria-hidden="true" />
      <div className="hero-glow2" aria-hidden="true" />

      <div className="container">
        <div className="row align-items-center g-5">

          {/* ── Left: Content ── */}
          <div className="col-lg-6">
            <div className="hero-content">
              <div className="hero-badge" role="status">
                <span className="hero-badge-dot" aria-hidden="true" />
                Available for new projects
              </div>

              <h1 className="hero-title">
                Building<br />
                <em>Digital</em><br />
                <span className="line2">Experiences</span>
              </h1>

              <p className="hero-sub">
                Full stack developer crafting high-performance websites and digital
                products that earn trust from the first click.
              </p>

              <div className="hero-btns">
                <a href="#contact" className="btn-primary">
                  Start a Project
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#work" className="btn-secondary">View My Work</a>
              </div>

              <div className="hero-stats" aria-label="Key stats">
                <div className="stat-item">
                  <div className="stat-num">50<span>+</span></div>
                  <div className="stat-label">Projects Shipped</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">3<span>+</span></div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">98<span>%</span></div>
                  <div className="stat-label">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Visual ── */}
          <div className="col-lg-6">
            <div className="hero-visual">
              <div className="hero-img-wrapper">
                <img
                  src="/Picture.png"
                  alt="Torikul Islam Naeem — Full Stack Developer"
                />
                <div className="hero-img-card" aria-hidden="true">
                  <div className="hero-img-card-label">Latest Stack</div>
                  <div className="hero-img-card-value">Next.js + Tailwind</div>
                </div>
                <div className="hero-img-card2" aria-hidden="true">💻</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

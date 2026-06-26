const techChips = [
  'React', 'Next.js', 'Node.js', 'TypeScript',
  'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'Docker',
]

const highlights = [
  { icon: '🚀', title: 'Fast Delivery',     desc: 'Projects delivered on time with clean, maintainable code.' },
  { icon: '📱', title: 'Fully Responsive',  desc: 'Every build is pixel-perfect across all screen sizes.' },
  { icon: '⚡', title: 'Performance First', desc: 'Optimized for Core Web Vitals and real-world speed.' },
  { icon: '🔒', title: 'Secure & Scalable', desc: 'Built with security best practices from the ground up.' },
]

export default function About() {
  return (
    <section id="about" className="section-pad" aria-label="About me">
      <div className="container">
        <div className="row align-items-center g-5">

          {/* ── Left: Image ── */}
          <div className="col-lg-6">
            <div className="about-image-wrap reveal">
              <img
                src="/Picture.png"
                alt="Torikul Islam Naeem working at his desk"
              />
              <div className="about-image-deco" aria-hidden="true" />
              <div className="about-tech-chips" aria-label="Technology stack">
                {techChips.map((tech) => (
                  <span key={tech} className="chip">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div className="col-lg-6">
            <div className="reveal">
              <div className="section-label" aria-hidden="true">About Me</div>
              <h2 className="section-title">Developer who thinks like a designer</h2>
              <div className="about-body">
                <p>
                  I'm Torikul Islam Naeem — a full stack developer based in Bangladesh,
                  building digital experiences that bridge the gap between great design
                  and solid engineering.
                </p>
                <p>
                  I specialize in creating websites and web applications that not only
                  look exceptional but perform flawlessly. Every project I take on is
                  approached with a client-first mindset: your goals drive my decisions.
                </p>
              </div>

              <a href="#contact" className="btn-primary" style={{ display: 'inline-flex' }}>
                Let's Work Together
              </a>

              <div className="about-highlights" aria-label="Key strengths">
                {highlights.map((h) => (
                  <div key={h.title} className="highlight-card">
                    <div className="highlight-icon" aria-hidden="true">{h.icon}</div>
                    <div className="highlight-title">{h.title}</div>
                    <div className="highlight-desc">{h.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

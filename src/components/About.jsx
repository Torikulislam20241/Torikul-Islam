const infoCards = [
  { icon: '📍', text: 'Dhaka, Bangladesh' },
  { icon: '🎓', text: 'BSc Computer Science, IUBAT' },
  { icon: '💼', text: 'Upwork & Fiverr Freelancer' },
]

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-copy reveal">
            <p className="section-subtitle">About Me</p>
            <h2 className="section-title">About Me</h2>
            <p>
              I'm Tariqul Islam, a full-stack web developer and e-commerce specialist
              based in Dhaka, Bangladesh. I help businesses build powerful online
              presences through custom WordPress themes, Shopify stores, and MERN stack
              applications.
            </p>
            <p>
              Currently completing my Computer Science degree at IUBAT while freelancing
              on Upwork and Fiverr. I'm passionate about clean code, performance
              optimization, and shipping products that actually work.
            </p>

            <div className="about-info-cards">
              {infoCards.map((item) => (
                <div className="about-info-card" key={item.text}>
                  <span aria-hidden="true">{item.icon}</span>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            <a className="btn-outline" href="#">
              Download CV
            </a>
          </div>

          <div className="about-image-wrap reveal" style={{ '--delay': '120ms' }}>
            <div className="about-image-frame">
              <img src="/Picture.png" alt="Tariqul Islam" />
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

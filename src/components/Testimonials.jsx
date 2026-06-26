const testimonials = [
  {
    id: 1,
    stars: '★★★★★',
    text: '"From the initial consultation to the final delivery, every step was handled professionally. The result was a product that not only met our needs but also impressed our stakeholders. Highly recommended!"',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah&backgroundColor=b6e3f4',
    name: 'Wali Mollah.',
    role: 'Managing Director, Mollah Auto',
  },
  {
    id: 2,
    stars: '★★★★★',
    text: '"He demonstrated a deep understanding of our requirements and delivered a solution that was both visually appealing and highly functional. Communication was clear throughout the project."',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james&backgroundColor=c0aede',
    name: 'Munaz Maccoz.',
    role: 'Fifa Agent, manager es',
  },
  {
    id: 3,
    stars: '★★★★★',
    text: '"He delivered our project on time and went above and beyond to ensure our satisfaction. The new features have made a significant difference for our users. We look forward to working together again."',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amina&backgroundColor=d1d4f9',
    name: 'Vignesh Mani.',
    role: 'Managing Director, Bombaybytes',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-pad" aria-label="Client testimonials">
      <div className="container">

        {/* Heading */}
        <div className="reveal text-center mb-2">
          <div className="section-label" style={{ justifyContent: 'center' }} aria-hidden="true">
            Client Feedback
          </div>
          <h2 className="section-title" style={{ maxWidth: 480, margin: '0 auto 16px' }}>
            The work speaks through real experiences
          </h2>
        </div>

        {/* Cards */}
        <div className="row g-4" style={{ marginTop: '40px' }}>
          {testimonials.map((t) => (
            <div key={t.id} className="col-lg-4 col-md-6">
              <div className="testimonial-card reveal">
                <div className="testimonial-stars" aria-label="5 stars">{t.stars}</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <img
                    className="testimonial-avatar"
                    src={t.avatar}
                    alt={`${t.name} avatar`}
                    width="44"
                    height="44"
                    loading="lazy"
                  />
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

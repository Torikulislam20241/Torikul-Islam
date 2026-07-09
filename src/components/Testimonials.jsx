const testimonials = [
  {
    rating: '5.0/5',
    text: '"From the initial consultation to the final delivery, every step was handled professionally. The result was a product that not only met our needs but also impressed our stakeholders. Highly recommended!"',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah&backgroundColor=b6e3f4',
    name: 'Wali Mollah.',
    role: 'Managing Director, Mollah Auto',
  },
  {
    rating: '5.0/5',
    text: '"He demonstrated a deep understanding of our requirements and delivered a solution that was both visually appealing and highly functional. Communication was clear throughout the project."',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james&backgroundColor=c0aede',
    name: 'Munaz Maccoz.',
    role: 'Fifa Agent, manager es',
  },
  {
    rating: '5.0/5',
    text: '"He delivered our project on time and went above and beyond to ensure our satisfaction. The new features have made a significant difference for our users. We look forward to working together again."',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amina&backgroundColor=d1d4f9',
    name: 'Vignesh Mani.',
    role: 'Managing Director, Bombaybytes',
  },
]

export default function Testimonials() {
  return (
    <section className="page-section testimonials-section" id="testimonials" aria-label="Client testimonials">
      <div className="container">
        <div className="page-heading reveal visible">
          <span>Testimonials</span>
          <h1>What Clients Say</h1>
          <p>
            Feedback from clients and collaborators across business, e-commerce,
            and web application projects.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <article
              className="testimonial-card glass-card reveal"
              key={testimonial.name}
              style={{ '--delay': `${index * 90}ms` }}
            >
              <div className="quote-mark" aria-hidden="true">
                "
              </div>
              <div className="testimonial-stars" aria-label="5 out of 5 rating">
                {testimonial.rating}
              </div>
              <p className="testimonial-quote">{testimonial.text}</p>
              <div className="testimonial-author">
                <img
                  className="testimonial-avatar"
                  src={testimonial.avatar}
                  alt={`${testimonial.name} avatar`}
                  width="44"
                  height="44"
                  loading="lazy"
                />
                <div className="testimonial-meta">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

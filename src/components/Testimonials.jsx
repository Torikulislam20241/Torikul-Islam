import SectionHeading from './SectionHeading.jsx'
import testimonials from '../content/testimonials.json'
import sections from '../content/sections.json'

export default function Testimonials() {
  return (
    <section className="page-section testimonials-section" id="testimonials" aria-label="Client testimonials">
      <div className="container">
        <SectionHeading {...sections.testimonials} />

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

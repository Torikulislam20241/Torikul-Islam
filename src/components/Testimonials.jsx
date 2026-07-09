const testimonials = [
  {
    quote:
      'Tariqul delivered an outstanding Shopify store. Clean design, fast load time, and exactly what we needed. Highly recommend!',
    name: 'Sarah M.',
    role: 'E-commerce Entrepreneur',
    platform: 'Upwork',
    rating: '⭐⭐⭐⭐⭐',
  },
  {
    quote:
      'Excellent WordPress developer. Built our custom theme from scratch and went above and beyond with SEO and speed optimization.',
    name: 'James R.',
    role: 'Small Business Owner',
    platform: 'Fiverr',
    rating: '⭐⭐⭐⭐⭐',
  },
  {
    quote:
      'Very professional, great communication, and solid technical skills. The MERN app he built is working perfectly in production.',
    name: 'Aisha K.',
    role: 'Startup Founder',
    platform: 'Upwork',
    rating: '⭐⭐⭐⭐⭐',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-subtitle">What Clients Say</p>
          <h2 className="section-title">What Clients Say</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <article
              className="testimonial-card reveal"
              key={testimonial.name}
              style={{ '--delay': `${index * 90}ms` }}
            >
              <div className="quote-mark" aria-hidden="true">
                “
              </div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-meta">
                <strong>{testimonial.name}</strong>
                <span>
                  {testimonial.role} ({testimonial.platform} {testimonial.rating})
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

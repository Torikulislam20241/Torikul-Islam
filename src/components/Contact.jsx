import { useState } from 'react'

const contactLinks = [
  {
    href: 'mailto:naeemislam0252@gmail.com',
    icon: '✉️',
    label: 'Email',
    value: 'naeemislam0252@gmail.com',
  },
  {
    href: 'https://www.linkedin.com/in/torikul-islam-naeem',
    icon: '💼',
    label: 'LinkedIn',
    value: 'Torikul Islam Naeem',
    external: true,
  },
  {
    href: 'https://github.com/Torikulislam20241',
    icon: '🐱',
    label: 'GitHub',
    value: 'Torikulislam20241',
    external: true,
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('')   // '' | 'success' | 'error'

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, subject, message } = form
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error')
      return
    }
    const mailto =
      `mailto:naeemislam0252@gmail.com` +
      `?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}` +
      `&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`
    window.open(mailto)
    setStatus('success')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contact" className="section-pad" aria-label="Contact">
      <div className="container">
        <div className="row g-5">

          {/* ── Left: Contact Info ── */}
          <div className="col-lg-6">
            <div className="reveal">
              <div className="section-label" aria-hidden="true">Get In Touch</div>
              <h2 className="section-title">Let's build something great</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.75, marginBottom: 0 }}>
                Ready to launch your next project or give your website a serious
                upgrade? Drop me a message and let's talk about what you need.
              </p>

              <div className="contact-items">
                {contactLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="contact-item"
                    {...(item.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    aria-label={`${item.label}: ${item.value}`}
                  >
                    <span className="contact-item-icon" aria-hidden="true">{item.icon}</span>
                    <div>
                      <div className="contact-item-label">{item.label}</div>
                      <div className="contact-item-value">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Contact Form ── */}
          <div className="col-lg-6">
            <div className="reveal">
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form">

                <div className="form-row-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Your Name</label>
                    <input
                      id="name"
                      name="name"
                      className="form-input"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      className="form-input"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    className="form-input"
                    type="text"
                    placeholder="Project inquiry, redesign request..."
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    placeholder="Tell me about your project, goals, and timeline..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                {status === 'error' && (
                  <p style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: 12 }}>
                    Please fill in your name, email, and message.
                  </p>
                )}
                {status === 'success' && (
                  <p style={{ color: 'var(--accent)', fontSize: '0.85rem', marginBottom: 12 }}>
                    ✓ Opening your email client — talk soon!
                  </p>
                )}

                <button type="submit" className="form-submit">
                  Send Message →
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

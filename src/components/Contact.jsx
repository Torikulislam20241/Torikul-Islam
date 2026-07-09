/*
  EmailJS setup:
  1. Create an account at https://www.emailjs.com/ and add an email service connected to naeemislam0252@gmail.com.
  2. Create an EmailJS email template with variables: from_name, from_email, subject, message, and to_email.
  3. Copy your Service ID, Template ID, and Public Key from the EmailJS dashboard.
  4. Replace SERVICE_ID, TEMPLATE_ID, and USER_ID below with your real values before going live.
*/
import { useState } from 'react'
import emailjs from 'emailjs-com'

const SERVICE_ID = 'YOUR_SERVICE_ID'
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const USER_ID = 'YOUR_PUBLIC_KEY'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const socialLinks = [
  { href: 'https://github.com/Torikulislam20241', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/torikul-islam-naeem/', label: 'LinkedIn' },
  { href: 'https://www.upwork.com/', label: 'Upwork' },
  { href: 'https://www.fiverr.com/', label: 'Fiverr' },
]

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSending, setIsSending] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSending(true)
    setStatus({ type: '', message: '' })

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_email: 'naeemislam0252@gmail.com',
        },
        USER_ID,
      )

      setStatus({
        type: 'success',
        message: "Message sent. I'll get back to you within 24 hours.",
      })
      setForm(initialForm)
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please email me directly at naeemislam0252@gmail.com',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className="page-section contact-section" id="contact" aria-label="Contact">
      <div className="container">
        <div className="page-heading reveal visible">
          <span>Get In Touch</span>
          <h1>Let's build something useful together.</h1>
          <p>
            Have a project in mind? Send a message and I will get back to you
            within 24 hours.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info glass-card reveal">
            <h2>Contact details</h2>
            <p>
              I work with founders, small businesses, e-commerce teams, and
              community organizations that need reliable web execution.
            </p>

            <div className="contact-details">
              <a href="mailto:naeemislam0252@gmail.com">naeemislam0252@gmail.com</a>
              <span>Dhaka, Bangladesh</span>
              <span>Response within 24 hours</span>
            </div>

            <div className="contact-socials" aria-label="Social links">
              {socialLinks.map((link) => (
                <a
                  href={link.href}
                  key={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <form className="contact-form glass-card reveal" onSubmit={handleSubmit}>
            {status.message && (
              <div className={`form-banner ${status.type}`} role="status">
                {status.message}
              </div>
            )}

            <div className="form-field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-field">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                minLength="10"
                rows="5"
                required
              />
            </div>

            <button className="btn-primary contact-submit" type="submit" disabled={isSending}>
              {isSending ? 'Sending...' : 'Send Message ->'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

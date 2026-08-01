/*
  EmailJS setup:
  1. Create an account at https://www.emailjs.com/ and add an email service connected to naeemislam0252@gmail.com.
  2. Create an EmailJS email template with variables: from_name, from_email, subject, message, and to_email.
  3. Copy your Service ID, Template ID, and Public Key from the EmailJS dashboard.
  4. Add them as Vite env vars: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.
*/
import { useState } from 'react'
import emailjs from 'emailjs-com'
import { profile, socialLinks, whatsapp, whatsappUrl } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import sections from '../content/sections.json'

const CONTACT_EMAIL = profile.email
const WHATSAPP_DISPLAY = whatsapp.display
const WHATSAPP_URL = whatsappUrl
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const USER_ID = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

const isEmailJsConfigured = [SERVICE_ID, TEMPLATE_ID, USER_ID].every(
  (value) => value && !value.startsWith('YOUR_'),
)

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const buildMailtoUrl = ({ name, email, subject, message }) => {
  const emailSubject = subject || `Portfolio inquiry from ${name}`
  const emailBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    message,
  ].join('\n')

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
}

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

    if (!isEmailJsConfigured) {
      window.location.href = buildMailtoUrl(form)
      setStatus({
        type: 'success',
        message: 'Your email app opened with the message filled in. Please send it from there.',
      })
      setIsSending(false)
      return
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_email: CONTACT_EMAIL,
        },
        USER_ID,
      )

      setStatus({
        type: 'success',
        message: "Message sent. I'll get back to you within 24 hours.",
      })
      setForm(initialForm)
    } catch (error) {
      window.location.href = buildMailtoUrl(form)
      setStatus({
        type: 'success',
        message: 'The direct form send failed, so your email app opened with the message filled in.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className="page-section contact-section" id="contact" aria-label="Contact">
      <div className="container">
        <SectionHeading
          eyebrow={sections.contact.eyebrow}
          title={sections.contact.title}
          description={sections.contact.description}
          level={1}
        />

        <div className="contact-grid">
          <div className="contact-info glass-card reveal">
            <h2>{sections.contact.heading}</h2>
            <p>{sections.contact.intro}</p>

            <div className="contact-details">
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <a
                className="contact-whatsapp"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: {WHATSAPP_DISPLAY}
              </a>
              <span>{profile.location}</span>
              <span>{profile.responseTime}</span>
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

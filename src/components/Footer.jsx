import Logo from './Logo.jsx'
import TechIcon from './TechIcon.jsx'
import { cv, navLinks, profile, socialLinks } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand-block">
            <Logo />
            <p>{profile.summary}</p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            {navLinks.map((link) => (
              <a href={link.href} key={link.href}>{link.label}</a>
            ))}
            <a href={cv.href} download={cv.fileName} aria-label="Download CV as PDF">
              Download CV
            </a>
          </nav>

          <div className="footer-socials" aria-label="Social profiles">
            {socialLinks.map((link) => (
              <a
                href={link.href}
                key={link.label}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <TechIcon name={link.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} {profile.fullName}. All rights reserved.</p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </div>
    </footer>
  )
}

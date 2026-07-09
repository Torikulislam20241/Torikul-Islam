const socialLinks = [
  { href: 'https://github.com/Torikulislam20241', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/torikul-islam-naeem/', label: 'LinkedIn' },
  { href: 'https://www.upwork.com/', label: 'Upwork' },
  { href: 'https://www.fiverr.com/', label: 'Fiverr' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>&copy; 2026 Torikul Islam. All rights reserved.</p>

        <div className="footer-socials" aria-label="Footer social links">
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
    </footer>
  )
}

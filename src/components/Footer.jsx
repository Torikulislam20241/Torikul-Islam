const socialLinks = [
  { href: 'https://github.com/Torikulislam20241', label: 'GitHub', icon: 'GH' },
  { href: 'https://www.linkedin.com/in/torikul-islam-naeem/', label: 'LinkedIn', icon: 'in' },
  { href: 'https://www.upwork.com/', label: 'Upwork', icon: 'Up' },
  { href: 'https://www.fiverr.com/', label: 'Fiverr', icon: 'Fi' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© 2026 Tariqul Islam. All rights reserved.</p>

        <div className="footer-socials" aria-label="Footer social links">
          {socialLinks.map((link) => (
            <a
              href={link.href}
              key={link.label}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              <span aria-hidden="true">{link.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

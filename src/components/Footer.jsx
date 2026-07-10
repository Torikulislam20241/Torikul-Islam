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
        <div className="footer-top">
          <div><a className="footer-brand" href="/">Torikul Islam.</a><p>Full-Stack & Shopify Developer</p></div>
          <div className="footer-socials" aria-label="Footer social links">
            {socialLinks.map((link) => <a href={link.href} key={link.label} target="_blank" rel="noopener noreferrer" aria-label={link.label}>{link.label.slice(0, 2)}</a>)}
          </div>
        </div>
        <p className="footer-copyright">&copy; 2026 Torikul Islam. All rights reserved.</p>
      </div>
    </footer>
  )
}

const navLinks = [
  { href: '#home',     label: 'Home'     },
  { href: '#about',    label: 'About'    },
  { href: '#services', label: 'Services' },
  { href: '#work',     label: 'Work'     },
  { href: '#contact',  label: 'Contact'  },
]

const serviceLinks = [
  { href: '#services', label: 'Web Development'  },
  { href: '#services', label: 'Full Stack Apps'  },
  { href: '#services', label: 'E-Commerce'       },
  { href: '#services', label: 'SEO & Performance' },
  { href: '#services', label: 'AI Integration'   },
]

const connectLinks = [
  { href: 'mailto:naeemislam0252@gmail.com',             label: 'naeemislam0252@gmail.com', external: false },
  { href: 'https://github.com/Torikulislam20241',        label: 'GitHub Profile',           external: true  },
  { href: 'https://www.linkedin.com/in/torikul-islam-naeem/', label: 'LinkedIn',            external: true  },
  { href: '#contact',                                    label: 'Hire Me',                  external: false },
]

const socialLinks = [
  { href: 'mailto:naeemislam0252@gmail.com',             label: 'Email',    symbol: '✉'  },
  { href: 'https://github.com/Torikulislam20241',        label: 'GitHub',   symbol: '⌥'  },
  { href: 'https://www.linkedin.com/in/torikul-islam-naeem/', label: 'LinkedIn', symbol: 'in' },
  { href: 'https://www.behance.net/naeemislam232',       label: 'Behance',  symbol: 'Be' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer role="contentinfo">
      <div className="container">

        {/* Grid */}
        <div className="row g-4">

          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-logo">TI<span>.</span>Naeem</div>
            <p className="footer-tagline">
              Full stack developer creating digital experiences that earn trust
              and drive results for clients worldwide.
            </p>
            <div className="footer-social" aria-label="Social media links">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="social-link"
                  title={s.label}
                  aria-label={s.label}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {s.symbol}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="col-lg-2 col-md-6 col-6">
            <div className="footer-col-title">Navigation</div>
            <ul className="footer-links" role="list">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-6 col-6">
            <div className="footer-col-title">Services</div>
            <ul className="footer-links" role="list">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-col-title">Connect</div>
            <ul className="footer-links" role="list">
              {connectLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noopener noreferrer' : undefined}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-copy">
            © {year} <span>Torikul Islam Naeem</span>. All rights reserved.
          </div>
          <div className="footer-badge">
            <span className="footer-badge-dot" aria-hidden="true" />
            Available for projects
          </div>
        </div>

      </div>
    </footer>
  )
}

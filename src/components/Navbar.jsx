import { useEffect, useState } from 'react'
import CodeMark from './CodeMark.jsx'

const navLinks = [
  { href: '#hero', label: 'Home', id: 'hero' },
  { href: '#about', label: 'About', id: 'about' },
  { href: '#work', label: 'Projects', id: 'work' },
  { href: '#achievements', label: 'Achievements', id: 'achievements' },
  { href: '#contact', label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a className="navbar-brand" href="#hero" onClick={closeMenu}>
          <CodeMark /> <span>Torikul Islam</span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeSection === link.id ? 'active' : ''}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="#contact">
          Hire Me
        </a>

        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-menu-links" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeSection === link.id ? 'active' : ''}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

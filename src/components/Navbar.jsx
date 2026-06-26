import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''} role="navigation" aria-label="Main navigation">
        <a href="#home" className="nav-logo" aria-label="Torikul Islam Naeem – Home">
          TI<span>.</span>Naeem
        </a>

        <ul className="nav-links" role="list">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <a href="#contact" className="nav-cta" aria-label="Hire Torikul">Hire Me</a>

        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen(true)}
          aria-label="Open mobile menu"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`mobile-nav${mobileOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <button
          className="mobile-nav-close"
          onClick={closeMobile}
          aria-label="Close mobile menu"
        >
          ✕
        </button>
        <a href="#home"     onClick={closeMobile}>Home</a>
        <a href="#about"    onClick={closeMobile}>About</a>
        <a href="#services" onClick={closeMobile}>Services</a>
        <a href="#work"     onClick={closeMobile}>Work</a>
        <a href="#contact"  onClick={closeMobile}>Contact</a>
      </div>
    </>
  )
}

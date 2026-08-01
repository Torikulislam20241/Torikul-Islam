import { useCallback, useEffect, useRef, useState } from 'react'
import Logo from './Logo.jsx'
import TechIcon from './TechIcon.jsx'
import { cv, navLinks, socialLinks } from '../data/site.js'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const currentPath = window.location.pathname.replace(/(.)\/$/, '$1')
  const toggleRef = useRef(null)
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16)
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Lock the page behind the menu without shifting layout when a scrollbar is present. */
  useEffect(() => {
    if (!menuOpen) return undefined

    const { body } = document
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const previousPadding = body.style.paddingRight

    body.classList.add('menu-open')
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      body.classList.remove('menu-open')
      body.style.paddingRight = previousPadding
    }
  }, [menuOpen])

  /* Escape to close, and keep Tab focus inside the open panel. */
  useEffect(() => {
    if (!menuOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [closeMenu, menuOpen])

  /* Move focus into the panel on open and back to the trigger on close (never on first render). */
  const wasOpen = useRef(false)
  useEffect(() => {
    if (menuOpen) {
      closeButtonRef.current?.focus()
    } else if (wasOpen.current) {
      const active = document.activeElement
      const leftDangling = active === document.body || panelRef.current?.contains(active)
      if (leftDangling) toggleRef.current?.focus()
    }

    wasOpen.current = menuOpen
  }, [menuOpen])

  /* Close the menu if the viewport grows past the mobile-nav breakpoint. */
  useEffect(() => {
    const query = window.matchMedia('(min-width: 961px)')
    const onChange = (event) => {
      if (event.matches) setMenuOpen(false)
    }

    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const isActive = (href) => (href === '/' ? currentPath === '/' : currentPath.startsWith(href))

  return (
    <>
      <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`.trim()}>
        <div className="container navbar-inner">
          <Logo onClick={closeMenu} />

          <nav className="nav-links" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={isActive(link.href) ? 'active' : ''}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a
              className="nav-cv"
              href={cv.href}
              download={cv.fileName}
              aria-label="Download CV as PDF"
            >
              <TechIcon name="download" />
              CV
            </a>
            <a className="nav-cta" href="/contact">
              Hire Me
            </a>
          </div>

          <button
            ref={toggleRef}
            className="menu-toggle"
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(true)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        className={`mobile-nav ${menuOpen ? 'open' : ''}`.trim()}
        id="mobile-navigation"
        aria-hidden={!menuOpen}
      >
        {/* Tapping outside the panel closes it; keyboard users have Escape and the close button. */}
        <div className="mobile-nav-backdrop" onClick={closeMenu} />

        {/* The closed panel is `visibility: hidden` in CSS, which also removes it from the tab order. */}
        <div
          className="mobile-nav-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="mobile-nav-head">
            <Logo onClick={closeMenu} compact />
            <button
              ref={closeButtonRef}
              className="mobile-nav-close"
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation menu"
            >
              <TechIcon name="close" />
            </button>
          </div>

          <nav className="mobile-nav-links" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={isActive(link.href) ? 'active' : ''}
                aria-current={isActive(link.href) ? 'page' : undefined}
                onClick={closeMenu}
              >
                <span className="mobile-nav-icon"><TechIcon name={link.icon} /></span>
                {link.label}
                <TechIcon name="arrow" className="mobile-nav-chevron" />
              </a>
            ))}
          </nav>

          <div className="mobile-nav-footer">
            <a
              className="btn-primary"
              href="/contact"
              onClick={closeMenu}
            >
              Hire Me
            </a>
            <a
              className="btn-outline"
              href={cv.href}
              download={cv.fileName}
              onClick={closeMenu}
              aria-label="Download CV as PDF"
            >
              <TechIcon name="download" />
              Download CV
            </a>

            <div className="mobile-nav-socials">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <TechIcon name={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

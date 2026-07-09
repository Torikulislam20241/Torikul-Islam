import { useEffect, useMemo, useState } from 'react'
import Cursor from './components/Cursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Work from './components/Work.jsx'
import Services from './components/Services.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

const routes = {
  '/': { title: 'Home', component: <Hero /> },
  '/about': { title: 'About', component: <About /> },
  '/skills': { title: 'Skills', component: <Skills /> },
  '/projects': { title: 'Projects', component: <Work /> },
  '/services': { title: 'Services', component: <Services /> },
  '/testimonials': { title: 'Testimonials', component: <Testimonials /> },
  '/contact': { title: 'Contact', component: <Contact /> },
}

const normalizePath = (pathname) => {
  const cleanPath = pathname !== '/' && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname

  return routes[cleanPath] ? cleanPath : '/'
}

export default function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname))
  const route = useMemo(() => routes[path] || routes['/'], [path])

  useEffect(() => {
    document.title = route.title === 'Home'
      ? 'Torikul Islam | Full-Stack Developer'
      : `${route.title} | Torikul Islam`
  }, [route.title])

  useEffect(() => {
    const handlePopState = () => setPath(normalizePath(window.location.pathname))

    const handleLinkClick = (event) => {
      const link = event.target.closest('a[href]')
      if (!link || event.defaultPrevented || link.target === '_blank') return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const href = link.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return
      }

      const url = new URL(href, window.location.origin)
      const nextPath = normalizePath(url.pathname)

      if (url.origin === window.location.origin && routes[nextPath]) {
        event.preventDefault()

        if (nextPath !== path) {
          window.history.pushState({}, '', nextPath)
          setPath(nextPath)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleLinkClick)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleLinkClick)
    }
  }, [path])

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      const revealItems = document.querySelectorAll('.reveal')
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { rootMargin: '0px 0px -80px 0px', threshold: 0.12 },
      )

      revealItems.forEach((item) => observer.observe(item))
      window.__portfolioRevealObserver = observer
    })

    return () => {
      cancelAnimationFrame(frameId)
      window.__portfolioRevealObserver?.disconnect()
    }
  }, [path])

  return (
    <div className="app">
      <Cursor />
      <ScrollProgress />
      <Navbar currentPath={path} />
      <main className="page-shell">{route.component}</main>
      <Footer />
    </div>
  )
}

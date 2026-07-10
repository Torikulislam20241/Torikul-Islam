import { useEffect } from 'react'
import Cursor from './components/Cursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Work from './components/Work.jsx'
import Achievements from './components/Achievements.jsx'
import ResearchDetail from './components/ResearchDetail.jsx'
import { researchPapers } from './data/research.js'
import Services from './components/Services.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/'
  const researchMatch = window.location.pathname.match(/^\/research\/([^/]+)\/?$/)
  const activePaper = researchMatch ? researchPapers.find((paper) => paper.slug === decodeURIComponent(researchMatch[1])) : null

  useEffect(() => {
    const pageTitles = {
      '/': 'Torikul Islam | Full-Stack Developer',
      '/about': 'About | Torikul Islam',
      '/projects': 'Projects | Torikul Islam',
      '/achievements': 'Achievements | Torikul Islam',
      '/contact': 'Contact | Torikul Islam',
    }
    document.title = researchMatch ? `${activePaper?.title || 'Research'} | Torikul Islam` : (pageTitles[currentPath] || 'Page Not Found | Torikul Islam')
  }, [activePaper, currentPath, researchMatch])

  useEffect(() => {
    let observer
    const frameId = requestAnimationFrame(() => {
      const revealItems = document.querySelectorAll('.reveal')
      observer = new IntersectionObserver(
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
    })

    return () => {
      cancelAnimationFrame(frameId)
      observer?.disconnect()
    }
  }, [])

  if (researchMatch) return <ResearchDetail paper={activePaper} />

  const pages = {
    '/': <><Hero /><Skills /><Services /><Work /><Testimonials /></>,
    '/about': <About />,
    '/projects': <Work />,
    '/achievements': <Achievements />,
    '/contact': <Contact />,
  }

  const pageContent = pages[currentPath] || (
    <section className="page-section not-found-page"><div className="container"><span>404</span><h1>Page not found</h1><p>The page you requested does not exist.</p><a className="btn-primary" href="/">Return home</a></div></section>
  )

  return (
    <div className="app">
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main className={currentPath === '/' ? 'home-layout' : 'standalone-page'}>{pageContent}</main>
      <Footer />
    </div>
  )
}

import { useEffect } from 'react'
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

export default function App() {
  useEffect(() => {
    document.title = 'Torikul Islam | Full-Stack Developer'
  }, [])

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

  return (
    <div className="app">
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

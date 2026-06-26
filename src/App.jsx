import { useEffect } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Work from './components/Work'
import Testimonials from './components/Testimonials'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <HelmetProvider>
      <Helmet>
        <title>Torikul Islam Naeem — Full Stack Developer</title>
        <meta name="description" content="Full stack developer crafting high-performance websites and digital experiences that win trust. Based in Bangladesh, specializing in React, WordPress, Shopify, and MERN stack." />
        <meta name="keywords" content="full stack developer, web developer, Bangladesh, React, Next.js, WordPress, Shopify, MERN stack, Node.js" />
        <meta property="og:title" content="Torikul Islam Naeem — Full Stack Developer" />
        <meta property="og:description" content="Full stack developer crafting high-performance websites and digital products that earn trust from the first click." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://torikul-islam-portfolio.vercel.app" />
        <link rel="canonical" href="https://torikul-islam-portfolio.vercel.app" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Torikul Islam Naeem" />
      </Helmet>

      <Cursor />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <Testimonials />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </HelmetProvider>
  )
}

export default App

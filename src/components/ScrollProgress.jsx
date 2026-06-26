import { useEffect } from 'react'

export default function ScrollProgress() {
  useEffect(() => {
    const prog = document.getElementById('scroll-progress')
    if (!prog) return

    const handleScroll = () => {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      const pct = total > 0 ? (scrolled / total) * 100 : 0
      prog.style.width = pct + '%'
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <div className="scroll-progress" id="scroll-progress" aria-hidden="true" />
}

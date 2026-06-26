import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    if (!cursor || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let animFrame

    const handleMouseMove = (e) => {
      mx = e.clientX
      my = e.clientY
      cursor.style.left = mx + 'px'
      cursor.style.top = my + 'px'
    }

    function animRing() {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      animFrame = requestAnimationFrame(animRing)
    }

    document.addEventListener('mousemove', handleMouseMove)
    animRing()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animFrame)
    }
  }, [])

  return (
    <>
      <div className="cursor" id="cursor" aria-hidden="true" />
      <div className="cursor-ring" id="cursor-ring" aria-hidden="true" />
    </>
  )
}

import { useEffect, useState } from 'react'

const interactiveSelector = 'a, button, input, textarea, select, [role="button"]'

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [dot, setDot] = useState({ x: 0, y: 0 })
  const [ring, setRing] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [hasMoved, setHasMoved] = useState(false)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return undefined

    const originalCursor = document.body.style.cursor
    document.body.style.cursor = 'none'
    document.body.classList.add('custom-cursor-enabled')
    setEnabled(true)

    const handleMouseMove = (event) => {
      setHasMoved(true)
      setDot({ x: event.clientX, y: event.clientY })
    }

    const handleMouseOver = (event) => {
      if (event.target.closest(interactiveSelector)) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (event) => {
      if (
        event.target.closest(interactiveSelector) &&
        !event.relatedTarget?.closest?.(interactiveSelector)
      ) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.body.style.cursor = originalCursor
      document.body.classList.remove('custom-cursor-enabled')
    }
  }, [])

  useEffect(() => {
    if (!enabled) return undefined

    let frameId
    const follow = () => {
      setRing((current) => ({
        x: current.x + (dot.x - current.x) * 0.16,
        y: current.y + (dot.y - current.y) * 0.16,
      }))
      frameId = requestAnimationFrame(follow)
    }

    frameId = requestAnimationFrame(follow)
    return () => cancelAnimationFrame(frameId)
  }, [dot.x, dot.y, enabled])

  if (!enabled || !hasMoved) return null

  return (
    <>
      <span
        className={`cursor-dot ${isHovering ? 'hovering' : ''}`}
        style={{ transform: `translate3d(${dot.x}px, ${dot.y}px, 0)` }}
      />
      <span
        className={`cursor-ring ${isHovering ? 'hovering' : ''}`}
        style={{ transform: `translate3d(${ring.x}px, ${ring.y}px, 0)` }}
      />
    </>
  )
}

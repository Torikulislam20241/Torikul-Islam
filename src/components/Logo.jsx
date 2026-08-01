import { profile } from '../data/site.js'

/*
  Typographic wordmark: monogram tile + name + role line.
  `compact` drops the role line for tight spaces such as the mobile menu header.
*/
export default function Logo({ href = '/', onClick, compact = false }) {
  return (
    <a
      className={`brand ${compact ? 'brand-compact' : ''}`.trim()}
      href={href}
      onClick={onClick}
      aria-label={`${profile.name} — back to home`}
    >
      <span className="brand-mark" aria-hidden="true">TI</span>
      <span className="brand-text">
        <span className="brand-name">
          {profile.name}
          <span className="brand-dot" aria-hidden="true">.</span>
        </span>
        <span className="brand-role">{profile.role}</span>
      </span>
    </a>
  )
}

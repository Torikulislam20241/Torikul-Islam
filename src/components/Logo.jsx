import { profile } from '../data/site.js'

/* Wordmark: the name on its own, with a subtle colour shift on hover. */
export default function Logo({ href = '/', onClick }) {
  return (
    <a className="brand" href={href} onClick={onClick}>
      <span className="brand-name">{profile.name}</span>
    </a>
  )
}

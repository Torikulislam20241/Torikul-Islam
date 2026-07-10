const paths = {
  code: <><path d="m9 8-5 4 5 4M15 8l5 4-5 4M14 5l-4 14" /></>,
  cart: <><path d="M3 4h2l2.2 9h10.6l2-6H6" /><circle cx="9" cy="18" r="1" /><circle cx="17" cy="18" r="1" /></>,
  layout: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></>,
  server: <><rect x="3" y="4" width="18" height="6" rx="2" /><rect x="3" y="14" width="18" height="6" rx="2" /><path d="M7 7h.01M7 17h.01" /></>,
  speed: <><path d="M4 18a8 8 0 1 1 16 0" /><path d="m12 14 4-4" /><path d="M6 18h12" /></>,
  spark: <><path d="m13 2-2 7H5l5 4-2 9 9-11h-6z" /></>,
}

export default function TechIcon({ name = 'code' }) {
  return <span className="tech-icon" aria-hidden="true"><svg viewBox="0 0 24 24">{paths[name] || paths.code}</svg></span>
}

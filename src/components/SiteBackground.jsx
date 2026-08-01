/*
  Site-wide backdrop: deep teal gradient + angled grid + readability scrim.
  Rendered as fixed CSS layers instead of a raster image so it stays crisp on every
  screen density, costs no extra network request, and never causes layout shift.
  To use a photographic background instead, set --bg-image in custom.css.
*/
export default function SiteBackground() {
  return (
    <div className="site-background" aria-hidden="true">
      <div className="site-background-grid" />
      <div className="site-background-scrim" />
    </div>
  )
}

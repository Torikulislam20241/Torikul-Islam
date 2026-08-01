/*
  Shared section header. `level` keeps the document outline correct: a section that is
  the main subject of a standalone page renders an <h1>, sections stacked on the home
  page render <h2> so each page still has exactly one <h1>.
*/
export default function SectionHeading({ eyebrow, title, description, level = 2, className = '' }) {
  const Heading = `h${level}`

  return (
    <div className={`page-heading reveal visible ${className}`.trim()}>
      {eyebrow && <span>{eyebrow}</span>}
      <Heading>{title}</Heading>
      {description && <p>{description}</p>}
    </div>
  )
}

import { useState, useEffect } from 'react'

const skillsData = {
  frontend: [
    { name: 'React / Next.js',          pct: 92 },
    { name: 'HTML & CSS / Tailwind',    pct: 95 },
    { name: 'JavaScript / TypeScript',  pct: 88 },
    { name: 'UI/UX Design',             pct: 80 },
    { name: 'Framer / Animation',       pct: 75 },
  ],
  backend: [
    { name: 'Node.js / Express',         pct: 87 },
    { name: 'MongoDB',                   pct: 84 },
    { name: 'PostgreSQL',                pct: 78 },
    { name: 'REST API Design',           pct: 90 },
    { name: 'Authentication / Security', pct: 82 },
  ],
  tools: [
    { name: 'Git / GitHub',      pct: 93 },
    { name: 'Docker',            pct: 70 },
    { name: 'Vercel / Netlify',  pct: 90 },
    { name: 'Figma',             pct: 78 },
    { name: 'Linux / CLI',       pct: 80 },
  ],
}

const categories = [
  { id: 'frontend', icon: '🖥️', label: 'Frontend'       },
  { id: 'backend',  icon: '⚙️', label: 'Backend'        },
  { id: 'tools',    icon: '🔧', label: 'Tools & DevOps' },
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('frontend')
  const [barWidths, setBarWidths]           = useState(skillsData.frontend.map(() => 0))

  // Animate bars when category changes
  useEffect(() => {
    // Reset to 0 first
    setBarWidths(skillsData[activeCategory].map(() => 0))
    // Then animate to target
    const timer = setTimeout(() => {
      setBarWidths(skillsData[activeCategory].map((s) => s.pct))
    }, 60)
    return () => clearTimeout(timer)
  }, [activeCategory])

  const currentSkills = skillsData[activeCategory]

  return (
    <section id="skills" className="section-pad" aria-label="Skills and expertise">
      <div className="container">
        <div className="row g-5 align-items-start">

          {/* ── Left: Label + Category Buttons ── */}
          <div className="col-lg-4">
            <div className="reveal">
              <div className="section-label" aria-hidden="true">Expertise</div>
              <h2 className="section-title">Skills &amp; workflow</h2>
              <p className="section-desc" style={{ marginTop: 16 }}>
                A modern technology stack refined through dozens of client projects.
              </p>

              <div className="skills-categories" role="group" aria-label="Skill categories">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`skill-cat-btn${activeCategory === cat.id ? ' active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                    aria-pressed={activeCategory === cat.id}
                  >
                    <span aria-hidden="true">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Skill Bars Panel ── */}
          <div className="col-lg-8">
            <div className="skills-panel reveal">
              <div className="skills-bars" role="list" aria-label={`${activeCategory} skills`}>
                {currentSkills.map((skill, i) => (
                  <div key={`${activeCategory}-${skill.name}`} className="skill-bar-item" role="listitem">
                    <div className="skill-bar-header">
                      <span className="skill-bar-name">{skill.name}</span>
                      <span className="skill-bar-pct" aria-label={`${skill.pct} percent`}>
                        {skill.pct}%
                      </span>
                    </div>
                    <div
                      className="skill-bar-track"
                      role="progressbar"
                      aria-valuenow={skill.pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={skill.name}
                    >
                      <div
                        className="skill-bar-fill"
                        style={{ width: `${barWidths[i] ?? 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

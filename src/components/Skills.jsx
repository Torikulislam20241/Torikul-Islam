import SectionHeading from './SectionHeading.jsx'
import TechIcon from './TechIcon.jsx'
import skillGroups from '../content/skills.json'
import sections from '../content/sections.json'

export default function Skills() {
  let delayIndex = 0

  return (
    <section className="page-section skills-section" id="skills" aria-label="Technical Skills">
      <div className="container">
        <SectionHeading {...sections.skills} />

        <div className="skills-groups">
          {skillGroups.map((group) => (
            <section className="skills-group glass-card reveal" key={group.title}>
              <TechIcon name={group.icon} />
              <h3>{group.title}</h3>
              <div className="skills-list">
                {group.skills.map((skill) => {
                  delayIndex += 1

                  return (
                    <span
                      className="skill-badge"
                      key={skill}
                      style={{ '--delay': `${delayIndex * 35}ms` }}
                    >
                      {skill}
                    </span>
                  )
                })}
              </div>
              <div className="skill-level"><span style={{ width: `${group.level}%` }} /></div>
              <small>{group.level}%</small>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

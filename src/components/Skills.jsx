import SectionHeading from './SectionHeading.jsx'
import TechIcon from './TechIcon.jsx'

const skillGroups = [
  {
    title: 'Frontend',
    icon: 'layout', level: 95,
    skills: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Bootstrap 5', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    icon: 'server', level: 85, skills: ['Node.js', 'Express.js', 'Python', 'PHP'],
  },
  {
    title: 'CMS & E-commerce',
    icon: 'cart', level: 95, skills: ['WordPress', 'Shopify (Liquid)', 'WooCommerce', 'CJdropshipping'],
  },
  {
    title: 'Database & Tools',
    icon: 'code', level: 90, skills: ['MongoDB', 'MySQL', 'Git', 'GitHub', 'REST APIs', 'Postman'],
  },
  {
    title: 'Design & Deployment',
    icon: 'spark', level: 82, skills: ['Figma (basic)', 'Vercel', 'cPanel', 'Google Analytics', 'Meta Ads Manager'],
  },
]

export default function Skills() {
  let delayIndex = 0

  return (
    <section className="page-section skills-section" id="skills" aria-label="Technical Skills">
      <div className="container">
        <SectionHeading
          eyebrow="My Expertise"
          title="Skills & Technologies"
          description="A practical stack for client websites, online stores, full-stack apps, tracking, deployment, and performance improvements."
        />

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

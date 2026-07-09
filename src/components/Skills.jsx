const skillGroups = [
  {
    title: 'Frontend',
    skills: [
      ['⚛️', 'React.js'],
      ['⚡', 'JavaScript (ES6+)'],
      ['🏗️', 'HTML5'],
      ['🎨', 'CSS3'],
      ['🧩', 'Bootstrap 5'],
      ['🌬️', 'Tailwind CSS'],
    ],
  },
  {
    title: 'Backend',
    skills: [
      ['🟢', 'Node.js'],
      ['🚏', 'Express.js'],
      ['🐍', 'Python'],
      ['🐘', 'PHP'],
    ],
  },
  {
    title: 'CMS & E-commerce',
    skills: [
      ['📝', 'WordPress'],
      ['🛒', 'Shopify (Liquid)'],
      ['📦', 'WooCommerce'],
      ['🚚', 'CJdropshipping'],
    ],
  },
  {
    title: 'Database & Tools',
    skills: [
      ['🍃', 'MongoDB'],
      ['🗄️', 'MySQL'],
      ['🔧', 'Git'],
      ['🐙', 'GitHub'],
      ['🔌', 'REST APIs'],
      ['📮', 'Postman'],
    ],
  },
  {
    title: 'Design & Deployment',
    skills: [
      ['✏️', 'Figma (basic)'],
      ['▲', 'Vercel'],
      ['🖥️', 'cPanel'],
      ['📊', 'Google Analytics'],
      ['📣', 'Meta Ads Manager'],
    ],
  },
]

export default function Skills() {
  let delayIndex = 0

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-subtitle">Technical Skills</p>
          <h2 className="section-title">Technical Skills</h2>
        </div>

        <div className="skills-groups">
          {skillGroups.map((group) => (
            <div className="skills-group" key={group.title}>
              <h3 className="skills-group-title reveal">{group.title}</h3>
              <div className="skills-list">
                {group.skills.map(([icon, skill]) => {
                  delayIndex += 1

                  return (
                    <span
                      className="skill-badge reveal"
                      key={skill}
                      style={{ '--delay': `${delayIndex * 45}ms` }}
                    >
                      <span aria-hidden="true">{icon}</span>
                      {skill}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

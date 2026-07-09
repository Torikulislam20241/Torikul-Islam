const skillGroups = [
  {
    title: 'Frontend',
    skills: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Bootstrap 5', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'Python', 'PHP'],
  },
  {
    title: 'CMS & E-commerce',
    skills: ['WordPress', 'Shopify (Liquid)', 'WooCommerce', 'CJdropshipping'],
  },
  {
    title: 'Database & Tools',
    skills: ['MongoDB', 'MySQL', 'Git', 'GitHub', 'REST APIs', 'Postman'],
  },
  {
    title: 'Design & Deployment',
    skills: ['Figma (basic)', 'Vercel', 'cPanel', 'Google Analytics', 'Meta Ads Manager'],
  },
]

export default function Skills() {
  let delayIndex = 0

  return (
    <section className="page-section skills-section" aria-label="Technical Skills">
      <div className="container">
        <div className="page-heading reveal visible">
          <span>My Expertise</span>
          <h1>Skills and technologies I use to ship reliable websites.</h1>
          <p>
            A practical stack for client websites, online stores, full-stack apps,
            tracking, deployment, and performance improvements.
          </p>
        </div>

        <div className="skills-groups">
          {skillGroups.map((group) => (
            <section className="skills-group glass-card reveal" key={group.title}>
              <h2>{group.title}</h2>
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
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

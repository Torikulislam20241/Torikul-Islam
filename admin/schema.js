/*
  Describes every editable content file. The admin UI renders its forms from this,
  and the server validates writes against it — so adding a new field to the panel
  means adding one entry here, nothing else.

  Field types: text | textarea | url | email | number | list (of strings) | image | select
*/

export const iconOptions = [
  'code', 'cart', 'layout', 'server', 'speed', 'spark',
  'home', 'user', 'briefcase', 'trophy', 'send', 'download',
  'mail', 'phone', 'pin', 'arrow', 'terminal',
  'github', 'linkedin', 'upwork', 'fiverr',
]

export const schema = {
  profile: {
    label: 'Profile & contact',
    hint: 'Your name, role, contact details, hero stats, navigation, and social links.',
    file: 'src/content/profile.json',
    kind: 'object',
    groups: [
      {
        label: 'Identity',
        fields: [
          { key: 'name', label: 'Display name', type: 'text', hint: 'Shown in the logo and hero.' },
          { key: 'fullName', label: 'Full name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          { key: 'roleLong', label: 'Long role', type: 'text' },
          { key: 'location', label: 'Location', type: 'text' },
          { key: 'availability', label: 'Availability badge', type: 'text' },
          { key: 'responseTime', label: 'Response time', type: 'text' },
          { key: 'summary', label: 'Hero summary', type: 'textarea' },
        ],
      },
      {
        label: 'Contact',
        fields: [
          { key: 'email', label: 'Email', type: 'email' },
          { key: 'phone', label: 'Phone', type: 'text' },
          { key: 'whatsappNumber', label: 'WhatsApp number', type: 'text', hint: 'Digits only, with country code. Example: 8801977069983' },
          { key: 'whatsappDisplay', label: 'WhatsApp display text', type: 'text' },
          { key: 'whatsappMessage', label: 'WhatsApp pre-filled message', type: 'textarea' },
        ],
      },
      {
        label: 'Files & images',
        fields: [
          { key: 'portrait', label: 'Portrait (About page)', type: 'image', dir: 'assets', width: 720 },
          { key: 'avatar', label: 'Avatar (hero card)', type: 'image', dir: 'assets', width: 160 },
          { key: 'cvHref', label: 'CV file', type: 'file', dir: 'assets', accept: '.pdf' },
          { key: 'cvFileName', label: 'CV download filename', type: 'text' },
          { key: 'cvUpdated', label: 'CV last updated', type: 'text' },
        ],
      },
      {
        label: 'Hero stats',
        key: 'stats',
        kind: 'list',
        itemLabel: 'label',
        fields: [
          { key: 'value', label: 'Value', type: 'text', hint: 'Example: 100+' },
          { key: 'label', label: 'Label', type: 'text' },
        ],
      },
      {
        label: 'Hero focus tags',
        key: 'heroFocusAreas',
        kind: 'strings',
      },
      {
        label: 'Navigation links',
        key: 'navLinks',
        kind: 'list',
        itemLabel: 'label',
        fields: [
          { key: 'label', label: 'Label', type: 'text' },
          { key: 'href', label: 'Path', type: 'text', hint: 'Example: /projects' },
          { key: 'icon', label: 'Icon', type: 'select', options: iconOptions },
        ],
      },
      {
        label: 'Social links',
        key: 'socialLinks',
        kind: 'list',
        itemLabel: 'label',
        fields: [
          { key: 'label', label: 'Label', type: 'text' },
          { key: 'href', label: 'URL', type: 'url' },
          { key: 'short', label: 'Short code', type: 'text' },
          { key: 'icon', label: 'Icon', type: 'select', options: iconOptions },
        ],
      },
    ],
  },

  sections: {
    label: 'Section text',
    hint: 'The eyebrow, heading, and description above each section of the site.',
    file: 'src/content/sections.json',
    kind: 'object',
    groups: [
      {
        label: 'About page',
        key: 'about',
        kind: 'nested',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'heading', label: 'Body heading', type: 'text' },
        ],
        lists: [
          { key: 'paragraphs', label: 'Body paragraphs', kind: 'strings', multiline: true },
          {
            key: 'infoCards',
            label: 'Info cards',
            kind: 'list',
            itemLabel: 'label',
            fields: [
              { key: 'label', label: 'Label', type: 'text' },
              { key: 'value', label: 'Value', type: 'text' },
            ],
          },
        ],
      },
      { label: 'Skills section', key: 'skills', kind: 'nested', fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ] },
      { label: 'Services section', key: 'services', kind: 'nested', fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'ctaLabel', label: 'Button label', type: 'text' },
      ] },
      { label: 'Projects section', key: 'work', kind: 'nested', fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ] },
      { label: 'Testimonials section', key: 'testimonials', kind: 'nested', fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ] },
      { label: 'Achievements section', key: 'achievements', kind: 'nested', fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ] },
      { label: 'Contact section', key: 'contact', kind: 'nested', fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'heading', label: 'Card heading', type: 'text' },
        { key: 'intro', label: 'Card intro', type: 'textarea' },
      ] },
    ],
  },

  projects: {
    label: 'Projects',
    hint: 'Cards on the home page and the Projects page.',
    file: 'src/content/projects.json',
    kind: 'list',
    itemLabel: 'title',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'type', label: 'Type', type: 'text', hint: 'Example: Shopify E-commerce' },
      { key: 'year', label: 'Year', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'tags', label: 'Tech tags', type: 'list' },
      { key: 'link', label: 'Live URL', type: 'url' },
      { key: 'image', label: 'Screenshot', type: 'image', dir: 'projects', width: 900 },
    ],
  },

  services: {
    label: 'Services',
    file: 'src/content/services.json',
    kind: 'list',
    itemLabel: 'title',
    fields: [
      { key: 'icon', label: 'Icon', type: 'select', options: iconOptions },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'deliverables', label: 'Deliverables', type: 'list' },
    ],
  },

  skills: {
    label: 'Skills',
    file: 'src/content/skills.json',
    kind: 'list',
    itemLabel: 'title',
    fields: [
      { key: 'title', label: 'Group title', type: 'text' },
      { key: 'icon', label: 'Icon', type: 'select', options: iconOptions },
      { key: 'level', label: 'Level (%)', type: 'number', min: 0, max: 100 },
      { key: 'skills', label: 'Skills', type: 'list' },
    ],
  },

  testimonials: {
    label: 'Testimonials',
    file: 'src/content/testimonials.json',
    kind: 'list',
    itemLabel: 'name',
    fields: [
      { key: 'name', label: 'Client name', type: 'text' },
      { key: 'role', label: 'Role / company', type: 'text' },
      { key: 'rating', label: 'Rating', type: 'text', hint: 'Example: 5.0/5' },
      { key: 'text', label: 'Quote', type: 'textarea' },
      { key: 'avatar', label: 'Avatar URL', type: 'url' },
    ],
  },

  research: {
    label: 'Research & publications',
    hint: 'Each entry also generates its own detail page at /research/<slug>.',
    file: 'src/content/research.json',
    kind: 'list',
    itemLabel: 'title',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'URL slug', type: 'text', hint: 'Lowercase, dashes only. Changing this changes the page URL.' },
      { key: 'description', label: 'Short description', type: 'textarea' },
      { key: 'publication', label: 'Published in', type: 'text' },
      { key: 'date', label: 'Date', type: 'text' },
      { key: 'paperUrl', label: 'Official paper URL', type: 'url' },
      { key: 'authors', label: 'Authors', type: 'list' },
      { key: 'abstract', label: 'Abstract', type: 'textarea' },
      { key: 'methodology', label: 'Methodology', type: 'textarea' },
      { key: 'results', label: 'Results & findings', type: 'textarea' },
      { key: 'keywords', label: 'Keywords', type: 'list' },
      { key: 'image', label: 'Figure image', type: 'image', dir: 'assets', width: 1200 },
    ],
  },
}

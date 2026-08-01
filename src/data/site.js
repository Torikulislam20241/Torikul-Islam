/*
  Single source of truth for profile, navigation, and contact details.
  Editing this file updates the navbar, hero, footer, and contact section at once.
*/

export const profile = {
  name: 'Torikul Islam',
  fullName: 'Torikul Islam Naeem',
  role: 'Full-Stack Web Developer',
  roleLong: 'Full-Stack Developer & E-commerce Specialist',
  location: 'Dhaka, Bangladesh',
  availability: 'Available for new projects',
  email: 'naeemislam0252@gmail.com',
  phone: '+880 1889-460252',
  responseTime: 'Replies within 24 hours',
  portrait: '/assets/torikul-islam-portrait.webp',
  avatar: '/assets/torikul-islam-avatar.webp',
  summary:
    'I design and build fast, accessible web products — from custom WordPress and Shopify storefronts to MERN-stack applications — and ship them with performance, SEO, and maintainability handled from day one.',
}

/* Replace the file at this path to publish a new CV. Keep the same filename so existing links stay valid. */
export const cv = {
  href: '/assets/Torikul-Islam-CV.pdf',
  fileName: 'Torikul-Islam-CV.pdf',
  updated: 'August 2026',
}

export const stats = [
  { value: '100+', label: 'Projects delivered' },
  { value: '3+', label: 'Years experience' },
  { value: '98%', label: 'Client satisfaction' },
]

export const navLinks = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/about', label: 'About', icon: 'user' },
  { href: '/projects', label: 'Projects', icon: 'briefcase' },
  { href: '/achievements', label: 'Achievements', icon: 'trophy' },
  { href: '/contact', label: 'Contact', icon: 'send' },
]

export const socialLinks = [
  { href: 'https://github.com/Torikulislam20241', label: 'GitHub', short: 'GH', icon: 'github' },
  {
    href: 'https://www.linkedin.com/in/torikul-islam-naeem/',
    label: 'LinkedIn',
    short: 'IN',
    icon: 'linkedin',
  },
  { href: 'https://www.upwork.com/', label: 'Upwork', short: 'UP', icon: 'upwork' },
  { href: 'https://www.fiverr.com/', label: 'Fiverr', short: 'FV', icon: 'fiverr' },
]

export const whatsapp = {
  number: '8801977069983',
  display: '+880 1977-069983',
  message: "Hi Torikul! I found your portfolio and I'd like to talk about a project.",
}

export const whatsappUrl = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`

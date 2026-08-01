/*
  Adapter over the JSON content files in src/content/.
  Everything here is edited through the admin panel (`npm run admin`) — avoid
  hand-editing the JSON while the panel is open, or your changes may be overwritten.
*/
import content from '../content/profile.json'

export const profile = {
  name: content.name,
  fullName: content.fullName,
  role: content.role,
  roleLong: content.roleLong,
  location: content.location,
  availability: content.availability,
  email: content.email,
  phone: content.phone,
  responseTime: content.responseTime,
  portrait: content.portrait,
  avatar: content.avatar,
  summary: content.summary,
}

export const cv = {
  href: content.cvHref,
  fileName: content.cvFileName,
  updated: content.cvUpdated,
}

export const stats = content.stats
export const heroFocusAreas = content.heroFocusAreas
export const navLinks = content.navLinks
export const socialLinks = content.socialLinks

export const whatsapp = {
  number: content.whatsappNumber,
  display: content.whatsappDisplay,
  message: content.whatsappMessage,
}

export const whatsappUrl = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`

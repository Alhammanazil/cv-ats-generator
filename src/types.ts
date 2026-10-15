export type CvLang = 'id' | 'en'
export type TemplateId = 'classic' | 'compact'
export type EntryKind = 'experience' | 'education' | 'projects'

/** One job, degree or project. Dates are "YYYY-MM" strings from <input type="month">. */
export interface Entry {
  id: string
  title: string
  org: string
  place: string
  start: string
  end: string
  current: boolean
  bullets: string[]
}

export interface SkillGroup {
  id: string
  label: string
  items: string
}

export interface Cert {
  id: string
  name: string
  issuer: string
  date: string
}

export interface CvData {
  name: string
  headline: string
  location: string
  phone: string
  email: string
  links: string[]
  summary: string
  experience: Entry[]
  education: Entry[]
  projects: Entry[]
  skills: SkillGroup[]
  certs: Cert[]
  settings: { cvLang: CvLang; template: TemplateId }
}

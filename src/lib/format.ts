import type { CvData, CvLang, Entry } from '../types'

const MONTHS: Record<CvLang, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  id: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
}

export const SECTION_TITLES: Record<CvLang, Record<string, string>> = {
  en: {
    summary: 'Professional Summary',
    experience: 'Work Experience',
    education: 'Education',
    projects: 'Projects',
    skills: 'Skills',
    certs: 'Certifications',
  },
  id: {
    summary: 'Ringkasan Profesional',
    experience: 'Pengalaman Kerja',
    education: 'Pendidikan',
    projects: 'Proyek',
    skills: 'Keahlian',
    certs: 'Sertifikasi',
  },
}

let counter = 0
export function uid(): string {
  counter += 1
  return `${Date.now().toString(36)}${counter.toString(36)}${Math.random().toString(36).slice(2, 6)}`
}

export function fmtMonth(value: string, lang: CvLang): string {
  const m = /^(\d{4})-(\d{2})$/.exec(value)
  if (!m) return value
  return `${MONTHS[lang][Number(m[2]) - 1]} ${m[1]}`
}

export function dateRange(e: Pick<Entry, 'start' | 'end' | 'current'>, lang: CvLang): string {
  const start = fmtMonth(e.start, lang)
  const end = e.current ? (lang === 'id' ? 'Sekarang' : 'Present') : fmtMonth(e.end, lang)
  return [start, end].filter(Boolean).join(' - ')
}

export function nonEmptyBullets(e: Entry): string[] {
  return e.bullets.map((b) => b.trim()).filter(Boolean)
}

export function hasContent(e: Entry): boolean {
  return Boolean(e.title.trim() || e.org.trim() || nonEmptyBullets(e).length)
}

export function contactItems(cv: CvData): string[] {
  return [cv.location, cv.phone, cv.email].map((s) => s.trim()).filter(Boolean)
}

export function linkItems(cv: CvData): string[] {
  return cv.links.map((s) => s.trim().replace(/^https?:\/\//, '').replace(/\/$/, '')).filter(Boolean)
}

/** Plain-text version of the CV: also what the checker measures and the .txt export saves. */
export function toPlainText(cv: CvData): string {
  const lang = cv.settings.cvLang
  const titles = SECTION_TITLES[lang]
  const out: string[] = []
  out.push(cv.name.trim())
  if (cv.headline.trim()) out.push(cv.headline.trim())
  const contact = contactItems(cv).join(' | ')
  if (contact) out.push(contact)
  const links = linkItems(cv).join(' | ')
  if (links) out.push(links)

  if (cv.summary.trim()) out.push('', titles.summary.toUpperCase(), cv.summary.trim())

  const entrySection = (key: 'experience' | 'education' | 'projects') => {
    const list = cv[key].filter(hasContent)
    if (!list.length) return
    out.push('', titles[key].toUpperCase())
    for (const e of list) {
      const head = [e.title.trim(), e.org.trim()].filter(Boolean).join(' | ')
      const range = dateRange(e, lang)
      out.push([head, range].filter(Boolean).join(' - '))
      if (e.place.trim()) out.push(e.place.trim())
      for (const b of nonEmptyBullets(e)) out.push(`- ${b}`)
      out.push('')
    }
    if (out[out.length - 1] === '') out.pop()
  }
  entrySection('experience')
  entrySection('education')
  entrySection('projects')

  const groups = cv.skills.filter((g) => g.items.trim())
  if (groups.length) {
    out.push('', titles.skills.toUpperCase())
    for (const g of groups) out.push(g.label.trim() ? `${g.label.trim()}: ${g.items.trim()}` : g.items.trim())
  }

  const certs = cv.certs.filter((c) => c.name.trim())
  if (certs.length) {
    out.push('', titles.certs.toUpperCase())
    for (const c of certs) {
      const issuer = c.issuer.trim() ? ` - ${c.issuer.trim()}` : ''
      const date = c.date ? ` (${fmtMonth(c.date, lang)})` : ''
      out.push(`- ${c.name.trim()}${issuer}${date}`)
    }
  }
  return out.join('\n').trim() + '\n'
}

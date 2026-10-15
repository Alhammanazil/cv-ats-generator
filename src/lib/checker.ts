import type { CvData, Entry } from '../types'
import { nonEmptyBullets, toPlainText } from './format'

export type Level = 'warn' | 'tip' | 'ok'
export interface CheckResult {
  id: string
  level: Level
  params: Record<string, string | number>
}
export interface Report {
  results: CheckResult[]
  warn: number
  tip: number
  ok: number
}

const EN_VERBS = new Set(
  `built develop developed design designed implement implemented led lead managed manage created create improved improve reduced reduce
   increased increase delivered deliver maintained maintain optimized optimize automated automate collaborated collaborate analyzed analyze
   integrated integrate deployed deploy configured configure troubleshot troubleshoot resolved resolve provided provide engineered engineer
   streamlined streamline supported support completed complete organized organize coordinated coordinate launched launch migrated migrate
   documented document trained train wrote write established establish executed execute drove drive achieved achieve handled handle
   monitored monitor administered administer installed install upgraded upgrade secured secure tested test planned plan presented present
   researched research mentored mentor redesigned customized produced produce operated operate prepared prepare reviewed review initiated
   contributed contribute ran run made make took take set won kept held grew sold spent taught`.split(/\s+/),
)

const ID_VERB_PREFIX = /^(me|mem|men|meng|meny|ber|per|di)[a-z]{4,}$/

const CLICHES = [
  'hard worker', 'hardworking', 'team player', 'detail oriented', 'detail-oriented', 'go-getter', 'self-motivated',
  'results-oriented', 'think outside the box', 'responsible for', 'fast learner', 'pekerja keras',
  'mampu bekerja dalam tim', 'bertanggung jawab atas', 'berorientasi pada hasil', 'pembelajar cepat',
  'bekerja secara mandiri maupun tim',
]

function allBullets(cv: CvData): string[] {
  return [...cv.experience, ...cv.projects].flatMap(nonEmptyBullets)
}

function startsWithAction(bullet: string): boolean {
  const first = bullet.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '') ?? ''
  if (!first) return false
  if (EN_VERBS.has(first)) return true
  if (first.length > 4 && first.endsWith('ed')) return true
  return ID_VERB_PREFIX.test(first)
}

function monthIndex(v: string): number | null {
  const m = /^(\d{4})-(\d{2})$/.exec(v)
  return m ? Number(m[1]) * 12 + Number(m[2]) - 1 : null
}

function nowIndex(): number {
  const d = new Date()
  return d.getFullYear() * 12 + d.getMonth()
}

function sentenceCount(text: string): number {
  return text
    .trim()
    .split(/[.!?]+(?:\s|$)/)
    .filter((s) => s.trim().length > 0).length
}

function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

function longestGap(entries: Entry[]): number {
  const spans = entries
    .map((e) => ({ s: monthIndex(e.start), e: e.current ? nowIndex() : monthIndex(e.end) }))
    .filter((x): x is { s: number; e: number } => x.s !== null && x.e !== null)
    .sort((a, b) => a.s - b.s)
  let gap = 0
  let reach = spans.length ? spans[0].e : 0
  for (const span of spans.slice(1)) {
    gap = Math.max(gap, span.s - reach - 1)
    reach = Math.max(reach, span.e)
  }
  return gap
}

type Rule = (cv: CvData) => Omit<CheckResult, 'id'>
const pass: Omit<CheckResult, 'id'> = { level: 'ok', params: {} }

const RULES: Record<string, Rule> = {
  contact(cv) {
    const missing = [cv.name, cv.email, cv.phone].filter((v) => !v.trim()).length
    return missing ? { level: 'warn', params: { n: missing } } : pass
  },
  summary(cv) {
    if (!cv.summary.trim()) return { level: 'warn', params: { n: 0 } }
    const n = sentenceCount(cv.summary)
    return n < 2 || n > 5 ? { level: 'tip', params: { n } } : pass
  },
  experience(cv) {
    const filled = cv.experience.filter((e) => e.title.trim() || nonEmptyBullets(e).length)
    return filled.length ? pass : { level: 'warn', params: {} }
  },
  verbs(cv) {
    const bullets = allBullets(cv)
    if (bullets.length < 2) return pass
    const weak = bullets.filter((b) => !startsWithAction(b)).length
    const pct = Math.round((weak / bullets.length) * 100)
    return pct > 40 ? { level: 'tip', params: { n: weak, total: bullets.length } } : pass
  },
  numbers(cv) {
    const bullets = cv.experience.flatMap(nonEmptyBullets)
    if (bullets.length < 3) return pass
    const withNumber = bullets.filter((b) => /\d/.test(b)).length
    return withNumber / bullets.length < 0.25 ? { level: 'tip', params: { n: withNumber, total: bullets.length } } : pass
  },
  longBullets(cv) {
    const long = allBullets(cv).filter((b) => b.length > 220).length
    return long ? { level: 'tip', params: { n: long } } : pass
  },
  cliches(cv) {
    const text = [cv.summary, ...allBullets(cv)].join(' ').toLowerCase()
    const found = CLICHES.filter((c) => text.includes(c))
    return found.length ? { level: 'tip', params: { list: found.slice(0, 3).join(', ') } } : pass
  },
  gaps(cv) {
    const gap = longestGap(cv.experience)
    return gap > 6 ? { level: 'tip', params: { n: gap } } : pass
  },
  dates(cv) {
    const missing = [...cv.experience, ...cv.education].filter(
      (e) => (e.title.trim() || e.org.trim()) && !e.start,
    ).length
    return missing ? { level: 'warn', params: { n: missing } } : pass
  },
  skills(cv) {
    return cv.skills.some((g) => g.items.trim()) ? pass : { level: 'warn', params: {} }
  },
  size(cv) {
    const words = wordCount(toPlainText(cv))
    if (words > 850) return { level: 'tip', params: { n: words } }
    if (words < 150 && cv.experience.length) return { level: 'tip', params: { n: words } }
    return pass
  },
}

/** Rules that only make sense once there is something to measure; hidden (not shown as "ok") until then. */
const NEEDS: Record<string, (cv: CvData) => boolean> = {
  verbs: (cv) => allBullets(cv).length > 0,
  numbers: (cv) => cv.experience.some((e) => nonEmptyBullets(e).length > 0),
  longBullets: (cv) => allBullets(cv).length > 0,
  cliches: (cv) => Boolean(cv.summary.trim()) || allBullets(cv).length > 0,
  gaps: (cv) => cv.experience.length > 1,
  dates: (cv) => [...cv.experience, ...cv.education].some((e) => e.title.trim() || e.org.trim()),
  size: (cv) => Boolean(cv.name.trim() || cv.summary.trim() || cv.experience.length),
}

export function runChecks(cv: CvData): Report {
  const results: CheckResult[] = Object.entries(RULES)
    .filter(([id]) => NEEDS[id]?.(cv) ?? true)
    .map(([id, rule]) => ({ id, ...rule(cv) }))
  const count = (level: Level) => results.filter((r) => r.level === level).length
  return { results, warn: count('warn'), tip: count('tip'), ok: count('ok') }
}

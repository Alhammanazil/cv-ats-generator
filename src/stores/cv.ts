import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Cert, CvData, Entry, EntryKind, SkillGroup } from '../types'
import { uid } from '../lib/format'
import { sampleCv } from '../content/sample'
import { locale } from '../i18n'

const KEY = 'cvats.cv.v1'

function emptyCv(): CvData {
  return {
    name: '', headline: '', location: '', phone: '', email: '', links: ['', ''], summary: '',
    experience: [], education: [], projects: [], skills: [], certs: [],
    settings: { cvLang: locale.value, template: 'classic' },
  }
}

export function newEntry(): Entry {
  return { id: uid(), title: '', org: '', place: '', start: '', end: '', current: false, bullets: [''] }
}

/** Fill gaps in stored/imported data so older or hand-edited files never crash the UI. */
function normalize(raw: unknown): CvData {
  const base = emptyCv()
  if (!raw || typeof raw !== 'object') return base
  const r = raw as Partial<CvData>
  const str = (v: unknown) => (typeof v === 'string' ? v : '')
  const entries = (v: unknown): Entry[] =>
    Array.isArray(v)
      ? v.map((e: Partial<Entry>) => ({
          id: str(e?.id) || uid(), title: str(e?.title), org: str(e?.org), place: str(e?.place),
          start: str(e?.start), end: str(e?.end), current: Boolean(e?.current),
          bullets: Array.isArray(e?.bullets) ? e.bullets.map(str) : [''],
        }))
      : []
  return {
    name: str(r.name), headline: str(r.headline), location: str(r.location), phone: str(r.phone), email: str(r.email),
    links: Array.isArray(r.links) ? r.links.map(str) : base.links,
    summary: str(r.summary),
    experience: entries(r.experience), education: entries(r.education), projects: entries(r.projects),
    skills: Array.isArray(r.skills)
      ? r.skills.map((g: Partial<SkillGroup>) => ({ id: str(g?.id) || uid(), label: str(g?.label), items: str(g?.items) }))
      : [],
    certs: Array.isArray(r.certs)
      ? r.certs.map((c: Partial<Cert>) => ({ id: str(c?.id) || uid(), name: str(c?.name), issuer: str(c?.issuer), date: str(c?.date) }))
      : [],
    settings: {
      cvLang: r.settings?.cvLang === 'id' || r.settings?.cvLang === 'en' ? r.settings.cvLang : base.settings.cvLang,
      template: r.settings?.template === 'compact' ? 'compact' : 'classic',
    },
  }
}

function load(): CvData {
  try {
    const text = localStorage.getItem(KEY)
    return text ? normalize(JSON.parse(text)) : emptyCv()
  } catch {
    return emptyCv()
  }
}

export const useCvStore = defineStore('cv', () => {
  const cv = ref<CvData>(load())

  let timer: ReturnType<typeof setTimeout> | undefined
  watch(
    cv,
    (value) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        try {
          localStorage.setItem(KEY, JSON.stringify(value))
        } catch {
          /* private mode or full storage: the CV still works, it just won't be remembered */
        }
      }, 400)
    },
    { deep: true },
  )

  function reset(): void {
    cv.value = emptyCv()
    try {
      localStorage.removeItem(KEY)
    } catch {
      /* ignore */
    }
  }

  function loadSample(): void {
    const lang = cv.value.settings.cvLang
    cv.value = { ...sampleCv(lang), settings: { ...cv.value.settings } }
  }

  function importJson(text: string): boolean {
    try {
      const parsed = JSON.parse(text)
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return false
      cv.value = normalize(parsed)
      return true
    } catch {
      return false
    }
  }

  function addEntry(kind: EntryKind): void {
    cv.value[kind].push(newEntry())
  }

  function removeEntry(kind: EntryKind, index: number): void {
    cv.value[kind].splice(index, 1)
  }

  function moveEntry(kind: EntryKind, index: number, delta: -1 | 1): void {
    const list = cv.value[kind]
    const target = index + delta
    if (target < 0 || target >= list.length) return
    const [item] = list.splice(index, 1)
    list.splice(target, 0, item)
  }

  return { cv, reset, loadSample, importJson, addEntry, removeEntry, moveEntry }
})

import { ref } from 'vue'
import { ui } from './content/ui'

export type Locale = 'id' | 'en'
export type Bilingual = { id: string; en: string }

const KEY = 'cvats.locale'

function readStored(): Locale | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'id' || v === 'en' ? v : null
  } catch {
    return null
  }
}

const initial: Locale =
  readStored() ?? (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('id') ? 'id' : 'en')

export const locale = ref<Locale>(initial)

export function setLocale(next: Locale): void {
  locale.value = next
  document.documentElement.lang = next
  try {
    localStorage.setItem(KEY, next)
  } catch {
    /* storage can be blocked; the choice just won't persist */
  }
}

/** Translate a UI key. Reads `locale`, so templates re-render when it changes. */
export function t(key: string, params?: Record<string, string | number>): string {
  const text = ui[locale.value][key] ?? ui.en[key] ?? key
  if (!params) return text
  return text.replace(/\{(\w+)\}/g, (_, k: string) => String(params[k] ?? ''))
}

/** Pick the current language from an inline {id, en} pair. */
export function L(pair: Bilingual): string {
  return pair[locale.value]
}

export function LA(pair: { id: string[]; en: string[] }): string[] {
  return pair[locale.value]
}

if (typeof document !== 'undefined') document.documentElement.lang = locale.value

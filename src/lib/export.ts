import type { CvData } from '../types'
import { toPlainText } from './format'

function download(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function baseName(cv: CvData): string {
  const slug = cv.name
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
  return slug ? `${slug}-CV` : 'CV'
}

export function downloadTxt(cv: CvData): void {
  download(`${baseName(cv)}.txt`, toPlainText(cv), 'text/plain')
}

export function downloadJson(cv: CvData): void {
  download(`${baseName(cv)}.json`, JSON.stringify(cv, null, 2), 'application/json')
}

/** Uses the browser's own "Save as PDF" so the PDF keeps real, selectable text. */
export function printCv(cv: CvData): void {
  const previous = document.title
  document.title = baseName(cv)
  const restore = () => {
    document.title = previous
    window.removeEventListener('afterprint', restore)
  }
  window.addEventListener('afterprint', restore)
  window.print()
}

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCvStore } from '../stores/cv'
import { t } from '../i18n'
import {
  SECTION_TITLES, contactItems, dateRange, fmtMonth, hasContent, linkItems, nonEmptyBullets,
} from '../lib/format'
import type { Entry } from '../types'

const { cv } = storeToRefs(useCvStore())

const lang = computed(() => cv.value.settings.cvLang)
const titles = computed(() => SECTION_TITLES[lang.value])
const contact = computed(() => contactItems(cv.value).join(' | '))
const links = computed(() => linkItems(cv.value).join(' | '))
const skills = computed(() => cv.value.skills.filter((g) => g.items.trim()))
const certs = computed(() => cv.value.certs.filter((c) => c.name.trim()))

const entrySections = computed(() =>
  (['experience', 'education', 'projects'] as const)
    .map((key) => ({ key, list: cv.value[key].filter(hasContent) }))
    .filter((s) => s.list.length),
)

function heading(e: Entry): string {
  return [e.title.trim(), e.org.trim()].filter(Boolean).join(' | ')
}

function certLine(name: string, issuer: string, date: string): string {
  return `${issuer.trim() ? ` - ${issuer.trim()}` : ''}${date ? ` (${fmtMonth(date, lang.value)})` : ''}`
}

// The paper is a fixed A4 width; on narrow screens it is zoomed down to fit.
const frame = ref<HTMLElement | null>(null)
const scale = ref(1)
let observer: ResizeObserver | undefined
const A4_PX = 794

onMounted(() => {
  if (!frame.value || typeof ResizeObserver === 'undefined') return
  observer = new ResizeObserver(() => {
    // A hidden pane (mobile "Fill in" tab) reports width 0; keep the last good scale until it is visible again.
    const width = frame.value?.clientWidth ?? 0
    if (width > 0) scale.value = Math.min(1, width / A4_PX)
  })
  observer.observe(frame.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="frame" class="preview-frame">
    <article
      id="cv-paper"
      class="paper"
      :class="`tpl-${cv.settings.template}`"
      :style="{ zoom: scale }"
      :lang="lang"
    >
      <header class="cv-head">
        <h1>{{ cv.name.trim() || t('preview.placeholder') }}</h1>
        <p v-if="cv.headline.trim()" class="cv-headline">{{ cv.headline }}</p>
        <p v-if="contact" class="cv-contact">{{ contact }}</p>
        <p v-if="links" class="cv-contact">{{ links }}</p>
      </header>

      <section v-if="cv.summary.trim()" class="cv-section">
        <h2>{{ titles.summary }}</h2>
        <p class="cv-summary">{{ cv.summary }}</p>
      </section>

      <section v-for="s in entrySections" :key="s.key" class="cv-section">
        <h2>{{ titles[s.key] }}</h2>
        <div v-for="e in s.list" :key="e.id" class="cv-entry">
          <div class="cv-row">
            <strong>{{ heading(e) }}</strong>
            <span class="cv-date">{{ dateRange(e, lang) }}</span>
          </div>
          <p v-if="e.place.trim()" class="cv-place">{{ e.place }}</p>
          <ul v-if="nonEmptyBullets(e).length">
            <li v-for="(b, i) in nonEmptyBullets(e)" :key="i">{{ b }}</li>
          </ul>
        </div>
      </section>

      <section v-if="skills.length" class="cv-section">
        <h2>{{ titles.skills }}</h2>
        <ul>
          <li v-for="g in skills" :key="g.id">
            <strong v-if="g.label.trim()">{{ g.label.trim() }}:</strong> {{ g.items.trim() }}
          </li>
        </ul>
      </section>

      <section v-if="certs.length" class="cv-section">
        <h2>{{ titles.certs }}</h2>
        <ul>
          <li v-for="c in certs" :key="c.id">
            <strong>{{ c.name.trim() }}</strong>{{ certLine(c.name, c.issuer, c.date) }}
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>

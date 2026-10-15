<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCvStore } from '../stores/cv'
import { L, LA, t } from '../i18n'
import { stepTips, summaryExample, type StepId } from '../content/tips'
import { runChecks } from '../lib/checker'
import { downloadJson, downloadTxt, printCv } from '../lib/export'
import { uid } from '../lib/format'
import CvPreview from '../components/CvPreview.vue'
import EntryList from '../components/EntryList.vue'
import CheckerPanel from '../components/CheckerPanel.vue'

const store = useCvStore()
const { cv } = storeToRefs(store)

const steps: StepId[] = ['contact', 'summary', 'experience', 'education', 'projects', 'skills', 'certs', 'review']
const optionalSteps: StepId[] = ['projects', 'certs']
const stepIndex = ref(0)
const step = computed(() => steps[stepIndex.value])
const mobileTab = ref<'form' | 'preview'>('form')
const formTop = ref<HTMLElement | null>(null)

const report = computed(() => runChecks(cv.value))
const suggestions = computed(() => report.value.warn + report.value.tip)

async function go(i: number): Promise<void> {
  stepIndex.value = Math.max(0, Math.min(steps.length - 1, i))
  await nextTick()
  formTop.value?.scrollIntoView({ block: 'start', behavior: 'smooth' })
}

const tips = computed(() => (step.value === 'review' ? [] : LA(stepTips[step.value])))

// Links
function addLink(): void {
  cv.value.links.push('')
}
function removeLink(i: number): void {
  cv.value.links.splice(i, 1)
}

// Skills and certs
function addSkill(): void {
  cv.value.skills.push({ id: uid(), label: '', items: '' })
}
function addCert(): void {
  cv.value.certs.push({ id: uid(), name: '', issuer: '', date: '' })
}

// Data actions
const fileInput = ref<HTMLInputElement | null>(null)
const notice = ref<{ kind: 'ok' | 'error'; text: string } | null>(null)

function onImport(ev: Event): void {
  const input = ev.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const ok = store.importJson(String(reader.result))
    notice.value = ok ? { kind: 'ok', text: t('import.ok') } : { kind: 'error', text: t('import.error') }
  }
  reader.onerror = () => {
    notice.value = { kind: 'error', text: t('import.error') }
  }
  reader.readAsText(file)
  input.value = ''
}

function onReset(): void {
  if (window.confirm(t('btn.reset.confirm'))) {
    store.reset()
    stepIndex.value = 0
  }
}
</script>

<template>
  <div class="builder wrap page-pad" :class="`show-${mobileTab}`">
    <div class="mobile-tabs no-print" role="tablist">
      <button
        type="button" role="tab" :aria-selected="mobileTab === 'form'" :class="{ on: mobileTab === 'form' }"
        @click="mobileTab = 'form'"
      >
        {{ t('tab.form') }}
      </button>
      <button
        type="button" role="tab" :aria-selected="mobileTab === 'preview'" :class="{ on: mobileTab === 'preview' }"
        @click="mobileTab = 'preview'"
      >
        {{ t('tab.preview') }}
        <span v-if="suggestions" class="badge">{{ suggestions }}</span>
      </button>
    </div>

    <section ref="formTop" class="form-pane no-print">
      <div class="data-actions">
        <button type="button" class="btn btn-soft btn-sm" @click="store.loadSample()">{{ t('btn.sample') }}</button>
        <button type="button" class="btn btn-ghost btn-sm" @click="fileInput?.click()">{{ t('btn.import') }}</button>
        <button type="button" class="btn btn-ghost btn-sm" @click="downloadJson(cv)">{{ t('btn.json') }}</button>
        <button type="button" class="btn btn-ghost btn-sm danger-text" @click="onReset">{{ t('btn.reset') }}</button>
        <input ref="fileInput" type="file" accept="application/json,.json" class="visually-hidden" @change="onImport" />
      </div>
      <p v-if="notice" class="notice" :class="notice.kind" role="status">{{ notice.text }}</p>

      <nav class="stepper" :aria-label="t('step.of', { n: stepIndex + 1, total: steps.length })">
        <ol>
          <li v-for="(s, i) in steps" :key="s">
            <button
              type="button" :class="{ on: i === stepIndex, done: i < stepIndex }"
              :aria-current="i === stepIndex ? 'step' : undefined" @click="go(i)"
            >
              <span class="dot">{{ i + 1 }}</span>
              <span class="label">{{ t(`step.${s}`) }}</span>
            </button>
          </li>
        </ol>
      </nav>

      <div class="card step-card">
        <p class="step-of">
          {{ t('step.of', { n: stepIndex + 1, total: steps.length }) }}
          <span v-if="optionalSteps.includes(step)" class="pill">{{ t('step.optional') }}</span>
        </p>
        <h2>{{ step === 'review' ? t('review.title') : t(`step.${step}`) }}</h2>

        <!-- Contact -->
        <div v-if="step === 'contact'" class="grid-2">
          <div class="field">
            <label for="f-name">{{ t('f.name') }}</label>
            <input id="f-name" v-model="cv.name" type="text" autocomplete="name" />
          </div>
          <div class="field">
            <label for="f-headline">{{ t('f.headline') }}</label>
            <input id="f-headline" v-model="cv.headline" type="text" :placeholder="t('f.headline.ph')" />
          </div>
          <div class="field">
            <label for="f-email">{{ t('f.email') }}</label>
            <input id="f-email" v-model="cv.email" type="email" autocomplete="email" />
          </div>
          <div class="field">
            <label for="f-phone">{{ t('f.phone') }}</label>
            <input id="f-phone" v-model="cv.phone" type="tel" autocomplete="tel" />
          </div>
          <div class="field span-2">
            <label for="f-location">{{ t('f.location') }}</label>
            <input id="f-location" v-model="cv.location" type="text" autocomplete="address-level2" />
          </div>
          <div class="field span-2">
            <span class="label-like">{{ t('f.links') }}</span>
            <p class="hint">{{ t('f.links.hint') }}</p>
            <div v-for="(_, i) in cv.links" :key="i" class="inline-row">
              <input v-model="cv.links[i]" type="text" :aria-label="`${t('f.links')} ${i + 1}`" placeholder="linkedin.com/in/..." />
              <button type="button" class="btn btn-ghost btn-sm" @click="removeLink(i)">{{ t('entry.remove') }}</button>
            </div>
            <button type="button" class="btn btn-soft btn-sm" @click="addLink">+ {{ t('f.links.add') }}</button>
          </div>
        </div>

        <!-- Summary -->
        <div v-else-if="step === 'summary'" class="field">
          <label for="f-summary">{{ t('f.summary') }}</label>
          <textarea id="f-summary" v-model="cv.summary" rows="7" :placeholder="t('f.summary.ph')"></textarea>
          <button type="button" class="btn btn-soft btn-sm" @click="cv.summary = L(summaryExample)">
            + {{ t('tips.example') }}
          </button>
        </div>

        <!-- Entries -->
        <EntryList v-else-if="step === 'experience'" kind="experience" />
        <EntryList v-else-if="step === 'education'" kind="education" />
        <EntryList v-else-if="step === 'projects'" kind="projects" />

        <!-- Skills -->
        <div v-else-if="step === 'skills'" class="entry-list">
          <fieldset v-for="(g, i) in cv.skills" :key="g.id" class="entry-card">
            <legend>{{ t('entry.n', { n: i + 1 }) }}</legend>
            <div class="grid-2">
              <div class="field">
                <label :for="`sk-l-${g.id}`">{{ t('f.skills.label') }}</label>
                <input :id="`sk-l-${g.id}`" v-model="g.label" type="text" />
              </div>
              <div class="field">
                <label :for="`sk-i-${g.id}`">{{ t('f.skills.items') }}</label>
                <input :id="`sk-i-${g.id}`" v-model="g.items" type="text" :placeholder="t('f.skills.items.ph')" />
              </div>
            </div>
            <div class="row-actions">
              <button type="button" class="btn btn-danger btn-sm" @click="cv.skills.splice(i, 1)">{{ t('entry.remove') }}</button>
            </div>
          </fieldset>
          <button type="button" class="btn btn-soft" @click="addSkill">+ {{ t('f.skills.add') }}</button>
        </div>

        <!-- Certifications -->
        <div v-else-if="step === 'certs'" class="entry-list">
          <fieldset v-for="(c, i) in cv.certs" :key="c.id" class="entry-card">
            <legend>{{ t('entry.n', { n: i + 1 }) }}</legend>
            <div class="grid-2">
              <div class="field">
                <label :for="`c-n-${c.id}`">{{ t('f.cert.name') }}</label>
                <input :id="`c-n-${c.id}`" v-model="c.name" type="text" />
              </div>
              <div class="field">
                <label :for="`c-i-${c.id}`">{{ t('f.cert.issuer') }}</label>
                <input :id="`c-i-${c.id}`" v-model="c.issuer" type="text" />
              </div>
              <div class="field">
                <label :for="`c-d-${c.id}`">{{ t('f.cert.date') }}</label>
                <input :id="`c-d-${c.id}`" v-model="c.date" type="month" />
              </div>
            </div>
            <div class="row-actions">
              <button type="button" class="btn btn-danger btn-sm" @click="cv.certs.splice(i, 1)">{{ t('entry.remove') }}</button>
            </div>
          </fieldset>
          <button type="button" class="btn btn-soft" @click="addCert">+ {{ t('f.certs.add') }}</button>
        </div>

        <!-- Review -->
        <div v-else class="review">
          <p class="muted">{{ t('review.sub') }}</p>
          <CheckerPanel :report="report" />
          <div class="card export-card">
            <h3>{{ t('export.title') }}</h3>
            <div class="export-actions">
              <button type="button" class="btn btn-primary" @click="printCv(cv)">{{ t('btn.print') }}</button>
              <button type="button" class="btn btn-soft" @click="downloadTxt(cv)">{{ t('btn.txt') }}</button>
              <button type="button" class="btn btn-ghost" @click="downloadJson(cv)">{{ t('btn.json') }}</button>
            </div>
            <p class="hint">{{ t('print.hint') }}</p>
          </div>
        </div>

        <aside v-if="tips.length" class="tips" aria-labelledby="tips-h">
          <h3 id="tips-h">{{ t('tips.title') }}</h3>
          <ul>
            <li v-for="(tip, i) in tips" :key="i">{{ tip }}</li>
          </ul>
        </aside>

        <div class="nav-row">
          <button type="button" class="btn btn-ghost" :disabled="stepIndex === 0" @click="go(stepIndex - 1)">
            {{ t('btn.back') }}
          </button>
          <button v-if="step !== 'review'" type="button" class="btn btn-primary" @click="go(stepIndex + 1)">
            {{ t('btn.next') }}
          </button>
        </div>
      </div>
      <p class="muted saved-note">{{ t('saved.note') }}</p>
    </section>

    <section class="preview-pane" :aria-label="t('tab.preview')">
      <div class="preview-toolbar no-print">
        <div class="field inline">
          <label for="tpl">{{ t('tpl.label') }}</label>
          <select id="tpl" v-model="cv.settings.template">
            <option value="classic">{{ t('tpl.classic') }}</option>
            <option value="compact">{{ t('tpl.compact') }}</option>
          </select>
        </div>
        <div class="field inline">
          <label for="cvlang">{{ t('cvlang.label') }}</label>
          <select id="cvlang" v-model="cv.settings.cvLang" :title="t('cvlang.hint')">
            <option value="en">English</option>
            <option value="id">Bahasa Indonesia</option>
          </select>
        </div>
        <button type="button" class="chip" :class="{ ok: !suggestions }" @click="go(steps.length - 1)">
          {{ suggestions ? t('preview.chip', { n: suggestions }) : t('preview.chip.ok') }}
        </button>
        <button type="button" class="btn btn-primary btn-sm" @click="printCv(cv)">{{ t('btn.print') }}</button>
      </div>
      <CvPreview />
    </section>
  </div>
</template>

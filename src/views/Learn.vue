<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { L, LA, t } from '../i18n'
import {
  atsIntro, atsSteps, beforeAfter, checklist, cvIntro, donts, dos, myths, sources,
} from '../content/learn'
import { stepTips } from '../content/tips'

// Myth cards: click to reveal the fact.
const revealed = reactive<boolean[]>(myths.map(() => false))

// Before/after toggles.
const showAfter = reactive<boolean[]>(beforeAfter.map(() => false))

// Checklist progress, remembered in this browser only.
const CHECK_KEY = 'cvats.check.v1'
function loadChecks(): boolean[] {
  try {
    const raw = JSON.parse(localStorage.getItem(CHECK_KEY) ?? '[]')
    return checklist.map((_, i) => Boolean(Array.isArray(raw) && raw[i]))
  } catch {
    return checklist.map(() => false)
  }
}
const checks = ref<boolean[]>(loadChecks())
const doneCount = computed(() => checks.value.filter(Boolean).length)
const allDone = computed(() => doneCount.value === checklist.length)

function saveChecks(): void {
  try {
    localStorage.setItem(CHECK_KEY, JSON.stringify(checks.value))
  } catch {
    /* progress just won't persist */
  }
}
function resetChecks(): void {
  checks.value = checklist.map(() => false)
  saveChecks()
}

const tipSections = (Object.keys(stepTips) as (keyof typeof stepTips)[]).map((k) => k)
</script>

<template>
  <div class="learn wrap page-pad">
    <header class="page-head">
      <h1>{{ t('learn.title') }}</h1>
      <p class="lead">{{ t('learn.sub') }}</p>
    </header>

    <section class="prose-block">
      <h2>{{ t('learn.cv.t') }}</h2>
      <p>{{ L(cvIntro) }}</p>
    </section>

    <section class="prose-block">
      <h2>{{ t('learn.ats.t') }}</h2>
      <p>{{ L(atsIntro) }}</p>
      <ol class="flow">
        <li v-for="(s, i) in atsSteps" :key="i">
          <span class="num" aria-hidden="true">{{ i + 1 }}</span>
          <span>{{ L(s) }}</span>
        </li>
      </ol>
    </section>

    <section class="prose-block">
      <h2>{{ t('learn.dd.t') }}</h2>
      <div class="two-col">
        <div class="card do">
          <h3>{{ t('learn.do') }}</h3>
          <ul>
            <li v-for="(d, i) in dos" :key="i">{{ L(d) }}</li>
          </ul>
        </div>
        <div class="card dont">
          <h3>{{ t('learn.dont') }}</h3>
          <ul>
            <li v-for="(d, i) in donts" :key="i">{{ L(d) }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="prose-block">
      <h2>{{ t('learn.myths.t') }}</h2>
      <p class="muted">{{ t('learn.myths.sub') }}</p>
      <div class="myth-grid">
        <button
          v-for="(m, i) in myths" :key="i" type="button" class="myth card" :class="{ open: revealed[i] }"
          :aria-expanded="revealed[i]" @click="revealed[i] = !revealed[i]"
        >
          <span class="tag" :class="revealed[i] ? 'fact' : 'myth'">
            {{ revealed[i] ? t('learn.fact') : t('learn.myth') }}
          </span>
          <span class="myth-text">{{ revealed[i] ? L(m.fact) : L(m.myth) }}</span>
        </button>
      </div>
    </section>

    <section class="prose-block">
      <h2>{{ t('learn.tips.t') }}</h2>
      <div class="acc">
        <details v-for="k in tipSections" :key="k" class="card">
          <summary>{{ t(`step.${k}`) }}</summary>
          <ul>
            <li v-for="(tip, i) in LA(stepTips[k])" :key="i">{{ tip }}</li>
          </ul>
        </details>
      </div>
    </section>

    <section class="prose-block">
      <h2>{{ t('learn.ba.t') }}</h2>
      <p class="muted">{{ t('learn.ba.sub') }}</p>
      <div class="ba-list">
        <article v-for="(b, i) in beforeAfter" :key="i" class="card ba">
          <div class="seg">
            <button type="button" :class="{ on: !showAfter[i] }" @click="showAfter[i] = false">
              {{ t('learn.ba.before') }}
            </button>
            <button type="button" :class="{ on: showAfter[i] }" @click="showAfter[i] = true">
              {{ t('learn.ba.after') }}
            </button>
          </div>
          <p class="ba-text" :class="showAfter[i] ? 'after' : 'before'">
            {{ showAfter[i] ? L(b.after) : L(b.before) }}
          </p>
          <p v-if="showAfter[i]" class="ba-why"><strong>{{ t('learn.ba.why') }}:</strong> {{ L(b.why) }}</p>
        </article>
      </div>
    </section>

    <section class="prose-block">
      <h2>{{ t('learn.check.t') }}</h2>
      <p class="muted">{{ t('learn.check.sub') }}</p>
      <div class="card check-card">
        <div class="progress" role="progressbar" :aria-valuenow="doneCount" aria-valuemin="0" :aria-valuemax="checklist.length">
          <span :style="{ width: `${(doneCount / checklist.length) * 100}%` }"></span>
        </div>
        <p class="muted small">{{ t('learn.check.progress', { n: doneCount, total: checklist.length }) }}</p>
        <ul class="checks">
          <li v-for="(c, i) in checklist" :key="i">
            <label class="check">
              <input v-model="checks[i]" type="checkbox" @change="saveChecks" />
              <span>{{ L(c) }}</span>
            </label>
          </li>
        </ul>
        <p v-if="allDone" class="celebrate" role="status"><span aria-hidden="true">🎉</span> {{ t('learn.check.done') }}</p>
        <button type="button" class="btn btn-ghost btn-sm" @click="resetChecks">{{ t('learn.check.reset') }}</button>
      </div>
    </section>

    <section class="prose-block">
      <h2>{{ t('learn.sources') }}</h2>
      <ul class="sources">
        <li v-for="s in sources" :key="s.url">
          <a :href="s.url" target="_blank" rel="noopener noreferrer">{{ s.label }}</a>
        </li>
      </ul>
      <p class="muted small">{{ t('learn.sources.note') }}</p>
    </section>

    <section class="band final">
      <RouterLink to="/builder" class="btn btn-primary btn-lg">{{ t('learn.cta') }}</RouterLink>
    </section>
  </div>
</template>

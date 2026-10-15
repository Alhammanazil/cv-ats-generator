<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { t } from '../i18n'
import HeroScene from '../components/HeroScene.vue'
import ParserDemo from '../components/ParserDemo.vue'

// Headline is split into words so each one can rise in with its own delay.
const words = computed(() => {
  const parts: [string, '' | 'a' | 'b'][] = [
    [t('hero.t1'), ''],
    [t('hero.em1'), 'a'],
    [t('hero.t2'), ''],
    [t('hero.em2'), 'b'],
  ]
  return parts.flatMap(([text, em]) => text.split(' ').filter(Boolean).map((w) => ({ w, em })))
})

const features = [
  { t: 'feat1.t', d: 'feat1.d' },
  { t: 'feat2.t', d: 'feat2.d' },
  { t: 'feat3.t', d: 'feat3.d' },
]
const steps = [
  { t: 'step1.t', d: 'step1.d' },
  { t: 'step2.t', d: 'step2.d' },
  { t: 'step3.t', d: 'step3.d' },
]
</script>

<template>
  <div class="landing">
    <section class="hero">
      <div class="wrap hero-in">
        <div class="hero-copy">
          <span class="eyebrow">{{ t('hero.badge') }}</span>
          <h1>
            <span v-for="(w, i) in words" :key="i" class="w" :class="w.em ? ['em', w.em] : []" :style="{ '--i': i }">{{ w.w }}</span>
          </h1>
          <p class="lead">{{ t('hero.sub') }}</p>
          <div class="cta-row">
            <RouterLink to="/builder" class="btn btn-primary btn-lg">{{ t('hero.cta') }}</RouterLink>
            <RouterLink to="/belajar" class="btn btn-soft btn-lg">{{ t('hero.cta2') }}</RouterLink>
          </div>
        </div>
        <HeroScene />
      </div>
    </section>


    <section class="band">
      <div class="wrap">
        <span class="eyebrow">{{ t('eb.feat') }}</span>
        <h2>{{ t('feat.title') }}</h2>
        <div class="cards-3">
          <article v-for="f in features" :key="f.t" class="card feature">
            <h3>{{ t(f.t) }}</h3>
            <p>{{ t(f.d) }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="band sky">
      <div class="wrap">
        <span class="eyebrow">{{ t('eb.demo') }}</span>
        <h2>{{ t('demo.title') }}</h2>
        <p class="band-sub">{{ t('demo.sub') }}</p>
        <ParserDemo />
      </div>
    </section>

    <section class="band">
      <div class="wrap">
        <span class="eyebrow">{{ t('eb.steps') }}</span>
        <h2>{{ t('steps.title') }}</h2>
        <ol class="how">
          <li v-for="(s, i) in steps" :key="i" class="card">
            <span class="num" aria-hidden="true">{{ i + 1 }}</span>
            <h3>{{ t(s.t) }}</h3>
            <p>{{ t(s.d) }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="final">
      <div class="wrap">
        <h2>{{ t('final.title') }}</h2>
        <p class="lead">{{ t('final.sub') }}</p>
        <RouterLink to="/builder" class="btn btn-primary btn-lg">{{ t('final.cta') }}</RouterLink>
      </div>
    </section>
  </div>
</template>

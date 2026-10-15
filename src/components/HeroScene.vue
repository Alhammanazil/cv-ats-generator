<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { t } from '../i18n'

// A tiny scripted loop: a CV draws itself, a scan beam sweeps down, checks and tags pop in, a stamp lands, repeat.
const rows = [
  { w: '54%', kind: 'name' },
  { w: '70%', kind: '' },
  { w: '38%', kind: 'h' },
  { w: '92%', kind: '' },
  { w: '80%', kind: '' },
  { w: '38%', kind: 'h' },
  { w: '88%', kind: '' },
  { w: '72%', kind: '' },
  { w: '38%', kind: 'h' },
  { w: '84%', kind: '' },
  { w: '60%', kind: '' },
]
const TOTAL = rows.length + 1
const HOLD = 5

const tick = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

// Confetti: fixed positions (no randomness at render time), mixed shapes and the five palette colours.
const COLORS = ['var(--pink)', 'var(--yellow)', 'var(--blue)', 'var(--green)', 'var(--orange)']
const SHAPES = ['', 'r', 't', '']
const confetti = Array.from({ length: 14 }, (_, i) => ({
  cls: SHAPES[i % SHAPES.length],
  c: COLORS[i % COLORS.length],
  x: `${4 + ((i * 41) % 90)}%`,
  y: `${3 + ((i * 29) % 90)}%`,
  s: `${10 + (i % 3) * 4}px`,
  d: `${4 + ((i * 3) % 4)}s`,
  dl: `${((i * 0.4) % 3).toFixed(1)}s`,
  dx: `${((i % 5) - 2) * 10}px`,
}))

const tags = [
  { cls: 't1', key: 'scene.t1', at: 3 },
  { cls: 't2', key: 'scene.t2', at: 5 },
  { cls: 't3', key: 'scene.t3', at: 7 },
  { cls: 't4', key: 'scene.t4', at: 9 },
]

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tick.value = TOTAL + 1
    return
  }
  timer = setInterval(() => {
    tick.value = tick.value >= TOTAL + HOLD ? 0 : tick.value + 1
  }, 650)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="scene" aria-hidden="true">
    <span class="blob b1"></span>
    <span class="blob b2"></span>
    <span class="blob b3"></span>
    <div class="confetti">
      <i
        v-for="(p, i) in confetti" :key="i" :class="p.cls"
        :style="{ '--x': p.x, '--y': p.y, '--s': p.s, '--c': p.c, '--d': p.d, '--dl': p.dl, '--dx': p.dx }"
      ></i>
    </div>

    <div class="cv-card">
      <div class="m-top">
        <span class="m-avatar"></span>
        <div>
          <div class="m-row"><span class="m-line name" :class="{ on: tick > 0 }" style="--w: 120px"></span></div>
          <div class="m-row"><span class="m-line" :class="{ on: tick > 1 }" style="--w: 80px"></span></div>
        </div>
      </div>
      <div v-for="(r, i) in rows.slice(2)" :key="i" class="m-row">
        <span class="m-line" :class="[r.kind, { on: tick > i + 2 }]" :style="{ '--w': r.w }"></span>
        <span v-if="r.kind !== 'h'" class="m-ok" :class="{ on: tick > i + 4 }">✓</span>
      </div>
      <div class="beam" :class="{ on: tick >= 1 && tick <= TOTAL }" :style="{ '--p': Math.min(tick / TOTAL, 1) }"></div>
    </div>

    <span
      v-for="g in tags" :key="g.cls" class="tag3" :class="[g.cls, { on: tick >= g.at }]"
      :style="{ '--bd': `${g.at * 0.2}s` }"
    >
      {{ t(g.key) }}
    </span>
    <span class="stamp" :class="{ on: tick >= TOTAL }">{{ t('scene.stamp') }}</span>
  </div>
</template>

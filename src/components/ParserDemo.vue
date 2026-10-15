<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '../i18n'

type Mode = 'two' | 'one'
const mode = ref<Mode>('two')

const twoLeft = ['SKILLS', 'PHP, Laravel', 'MySQL, Git']
const twoRight = ['EXPERIENCE', 'Web Developer', '2024 - Present']
const oneLines = [...twoLeft, ...twoRight]

const parsed = computed(() =>
  mode.value === 'two'
    ? twoLeft.map((left, i) => `${left} ${twoRight[i]}`)
    : oneLines,
)
</script>

<template>
  <div class="parser-demo card">
    <div class="seg" role="tablist" :aria-label="t('demo.title')">
      <button
        type="button" role="tab" :aria-selected="mode === 'two'" :class="{ on: mode === 'two' }"
        @click="mode = 'two'"
      >
        {{ t('demo.tab1') }}
      </button>
      <button
        type="button" role="tab" :aria-selected="mode === 'one'" :class="{ on: mode === 'one' }"
        @click="mode = 'one'"
      >
        {{ t('demo.tab2') }}
      </button>
    </div>

    <div class="demo-grid">
      <div>
        <h4>{{ t('demo.see') }}</h4>
        <div class="mini-paper" :class="mode">
          <template v-if="mode === 'two'">
            <div class="col"><span v-for="l in twoLeft" :key="l">{{ l }}</span></div>
            <div class="col"><span v-for="l in twoRight" :key="l">{{ l }}</span></div>
          </template>
          <div v-else class="col"><span v-for="l in oneLines" :key="l">{{ l }}</span></div>
        </div>
      </div>
      <div>
        <h4>{{ t('demo.read') }}</h4>
        <pre class="parsed" :class="{ bad: mode === 'two', good: mode === 'one' }"><code>{{ parsed.join('\n') }}</code></pre>
      </div>
    </div>
    <p class="demo-note" :class="{ bad: mode === 'two' }" role="status">
      {{ mode === 'two' ? t('demo.note1') : t('demo.note2') }}
    </p>
  </div>
</template>

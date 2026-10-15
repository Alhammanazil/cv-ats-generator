<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import type { Level, Report } from '../lib/checker'

const props = defineProps<{ report: Report }>()

const levels: Level[] = ['warn', 'tip', 'ok']
const groups = computed(() =>
  levels.map((level) => ({ level, items: props.report.results.filter((r) => r.level === level) })),
)
const symbol: Record<Level, string> = { warn: '!', tip: 'i', ok: '✓' }
</script>

<template>
  <section class="card checker" aria-labelledby="chk-h">
    <h3 id="chk-h">{{ t('chk.title') }}</h3>
    <p class="muted">{{ t('chk.sub') }}</p>
    <p v-if="!report.warn && !report.tip" class="allok" role="status">{{ t('chk.allok') }}</p>

    <template v-for="g in groups" :key="g.level">
      <div v-if="g.items.length" class="chk-group">
        <h4 class="chk-h" :class="g.level">{{ t(`chk.${g.level}`) }} ({{ g.items.length }})</h4>
        <ul class="chk-list">
          <li v-for="r in g.items" :key="r.id" :class="g.level">
            <span class="chk-icon" :class="g.level" aria-hidden="true">{{ symbol[g.level] }}</span>
            <details v-if="g.level !== 'ok'" :open="g.level === 'warn'">
              <summary>{{ t(`chk.${r.id}.title`, r.params) }}</summary>
              <p><strong>{{ t('chk.why') }}:</strong> {{ t(`chk.${r.id}.why`) }}</p>
              <p><strong>{{ t('chk.fix') }}:</strong> {{ t(`chk.${r.id}.fix`, r.params) }}</p>
            </details>
            <span v-else class="chk-ok-text">{{ t(`chk.${r.id}.ok`) }}</span>
          </li>
        </ul>
      </div>
    </template>
  </section>
</template>

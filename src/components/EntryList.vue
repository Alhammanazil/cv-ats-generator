<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCvStore } from '../stores/cv'
import { L, t } from '../i18n'
import { bulletExample } from '../content/tips'
import type { EntryKind } from '../types'

const props = defineProps<{ kind: EntryKind }>()
const store = useCvStore()
const { cv } = storeToRefs(store)

const list = computed(() => cv.value[props.kind])

function bulletsText(i: number): string {
  return list.value[i].bullets.join('\n')
}

function setBullets(i: number, ev: Event): void {
  list.value[i].bullets = (ev.target as HTMLTextAreaElement).value.split('\n')
}

function addExample(i: number): void {
  const current = list.value[i].bullets.filter((b) => b.trim())
  list.value[i].bullets = [...current, L(bulletExample)]
}

function fieldId(entryId: string, name: string): string {
  return `${props.kind}-${entryId}-${name}`
}
</script>

<template>
  <div class="entry-list">
    <p v-if="!list.length" class="muted empty">{{ t('entry.empty') }}</p>

    <fieldset v-for="(e, i) in list" :key="e.id" class="entry-card">
      <legend>{{ t('entry.n', { n: i + 1 }) }}</legend>

      <div class="grid-2">
        <div class="field">
          <label :for="fieldId(e.id, 'title')">{{ t(`entry.${kind}.title`) }}</label>
          <input :id="fieldId(e.id, 'title')" v-model="e.title" type="text" autocomplete="off" />
        </div>
        <div class="field">
          <label :for="fieldId(e.id, 'org')">{{ t(`entry.${kind}.org`) }}</label>
          <input :id="fieldId(e.id, 'org')" v-model="e.org" type="text" autocomplete="off" />
        </div>
        <div class="field">
          <label :for="fieldId(e.id, 'place')">{{ t(`entry.${kind}.place`) }}</label>
          <input :id="fieldId(e.id, 'place')" v-model="e.place" type="text" autocomplete="off" />
        </div>
        <div class="field dates">
          <div>
            <label :for="fieldId(e.id, 'start')">{{ t('entry.start') }}</label>
            <input :id="fieldId(e.id, 'start')" v-model="e.start" type="month" />
          </div>
          <div>
            <label :for="fieldId(e.id, 'end')">{{ t('entry.end') }}</label>
            <input :id="fieldId(e.id, 'end')" v-model="e.end" type="month" :disabled="e.current" />
          </div>
        </div>
      </div>

      <label class="check">
        <input v-model="e.current" type="checkbox" />
        <span>{{ t('entry.current') }}</span>
      </label>

      <div class="field">
        <label :for="fieldId(e.id, 'bullets')">{{ t('entry.bullets') }}</label>
        <textarea
          :id="fieldId(e.id, 'bullets')"
          :value="bulletsText(i)"
          rows="5"
          @input="setBullets(i, $event)"
        ></textarea>
        <p class="hint">{{ t('entry.bullets.hint') }}</p>
        <button v-if="kind === 'experience'" type="button" class="btn btn-ghost btn-sm" @click="addExample(i)">
          + {{ t('tips.example') }}
        </button>
      </div>

      <div class="row-actions">
        <button type="button" class="btn btn-ghost btn-sm" :disabled="i === 0" @click="store.moveEntry(kind, i, -1)">
          {{ t('entry.up') }}
        </button>
        <button
          type="button" class="btn btn-ghost btn-sm" :disabled="i === list.length - 1"
          @click="store.moveEntry(kind, i, 1)"
        >
          {{ t('entry.down') }}
        </button>
        <button type="button" class="btn btn-danger btn-sm" @click="store.removeEntry(kind, i)">
          {{ t('entry.remove') }}
        </button>
      </div>
    </fieldset>

    <button type="button" class="btn btn-soft" @click="store.addEntry(kind)">+ {{ t(`entry.${kind}.add`) }}</button>
  </div>
</template>

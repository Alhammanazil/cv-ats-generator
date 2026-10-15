<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { locale, setLocale, t } from './i18n'
import LogoMark from './components/LogoMark.vue'

function toggleLocale(): void {
  setLocale(locale.value === 'id' ? 'en' : 'id')
}
</script>

<template>
  <a href="#main" class="skip-link no-print">Skip to content</a>
  <header class="site-header no-print">
    <div class="wrap bar">
      <RouterLink to="/" class="brand" aria-label="CV ATS Generator">
        <LogoMark />
        <span>{{ t('brand') }}</span>
      </RouterLink>
      <nav class="nav" :aria-label="t('nav.menu')">
        <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/builder">{{ t('nav.builder') }}</RouterLink>
        <RouterLink to="/belajar">{{ t('nav.learn') }}</RouterLink>
        <button type="button" class="lang" :aria-label="t('lang.label')" @click="toggleLocale">
          {{ t('lang.switch') }}
        </button>
      </nav>
    </div>
  </header>

  <main id="main">
    <RouterView />
  </main>

  <footer class="site-footer no-print">
    <div class="wrap">
      <p>{{ t('footer.privacy') }}</p>
      <p class="muted">{{ t('footer.credit') }}</p>
    </div>
  </footer>
</template>

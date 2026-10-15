import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/instrument-sans'
import App from './App.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/Landing.vue') },
    { path: '/builder', component: () => import('./views/Builder.vue') },
    { path: '/belajar', component: () => import('./views/Learn.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

createApp(App).use(createPinia()).use(router).mount('#app')

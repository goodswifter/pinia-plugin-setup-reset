import { createPinia } from 'pinia'
import { resetPlugin } from 'pinia-plugin-setup-reset'
import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import '@/assets/styles/index.scss'

const app = createApp(App)

const pinia = createPinia()
pinia.use(resetPlugin)
app.use(pinia)

app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
// 配置unocss
import 'virtual:uno.css'
// 配置全局样式
import '@/assets/styles/index.scss'

const app = createApp(App)

app.mount('#app')

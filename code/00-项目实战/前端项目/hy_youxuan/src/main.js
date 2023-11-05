import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import "normalize.css"
import "./assets/css/index.less"

createApp(App).use(createPinia()).use(router).mount('#app')

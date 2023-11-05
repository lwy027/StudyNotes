

import { createApp } from 'vue'
import router from "./07-vue-router的使用/router"
// import App from "./02-readonly的使用/App.vue"
// import App from "./03-computed的使用/App.vue"
// import App from './04-侦听数据的变化/App.vue'
// import App from "./05-setup语法糖的使用/App.vue"
// import App from './06-实战练习/App.vue'
import App from './07-vue-router的使用/App.vue'


createApp(App).use(router).mount("#app")

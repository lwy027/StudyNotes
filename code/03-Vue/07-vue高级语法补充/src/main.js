import { createApp } from "vue";
import directs from "./hooks";
// import App from "./01-自定义指令/02-自定义指令参数和修饰符.vue"
// import App from "./01-自定义指令/App.vue"
// import App from "./02-渲染函数的使用/App.vue"
// import App from "./03-过度动画的使用/App.vue"
import App from "./04-demo/App.vue";

const app = createApp(App);

app.mount("#app");

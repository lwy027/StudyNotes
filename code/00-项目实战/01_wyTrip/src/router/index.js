import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: () => import("../views/home/home.vue") },
    { path: "/favor", component: () => import("../views/favor/favor.vue") },
    { path: "/order", component: () => import("../views/order/order.vue") },
    { path: "/message", component: () => import("../views/message/message.vue") },
    {
      path: "/city", component: () => import("../views/city/city.vue"),
      meta: {
        showTabbar: true
      },

    },
    {
      path: "/details/:id", component: () => import("../views/details/details.vue"),
      meta: {
        showTabbar: true
      },

    },
  ],
  history: createWebHashHistory()
})

export default router
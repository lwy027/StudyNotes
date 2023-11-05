import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import Nine from '@/views/nine/index.vue'
import SuperValue from '@/views/supervalue/index.vue'
import Cooling from '@/views/cooling/index.vue'
import Detail from '@/views/detail/index.vue'
import Cart from '@/views/cart/index.vue'
import Category from '@/views/category/index.vue'

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/nine",
    name: "nine",
    component: Nine
  },
  {
    path: "/supervalue",
    name: "supervalue",
    component: SuperValue
  },
  {
    path: "/cooling",
    name: "cooling",
    component: Cooling
  },
  {
    path: "/detail",
    name: "detail",
    component: Detail
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart
  },
  {
    path: "/category",
    name: "category",
    component: Category
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

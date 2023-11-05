import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"
//导入创建的组件
// import Home from "../components/Home.vue"
// import About from "../components/About.vue"
import NotFound from "../components/About.vue"

//配置路由的映射关系
const router = createRouter({
  routes: [
    //如果为/重定向为home
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      name: "home",
      component: () => import("../components/Home.vue"),
      children: [
        { path: '', redirect: '/home/product' },
        { path: "product", component: () => import("../components/product.vue") },
        { path: "message", component: () => import("../components/message.vue") }
      ]

    },
    { path: "/about", component: () => import("../components/About.vue") },
    {
      path: "/user/:id", component: () => import("../components/User.vue")
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("../components/NotFound.vue")
    },
    {
      path: "/login",
      component: () => import("../components/Login.vue")
    },
    {
      path: "/order",
      component: () => import("../components/order.vue")
    }
  ],
  //使用路由的模式,一中hash,一种history
  history: createWebHashHistory()
  // history: createWebHistory()
})

//动态添加路由
const adminRouter = {
  path: "/admin",
  component: () => import("../components/Admin.vue")
}
//通过admin是否存在判断是否添加路由
let admin = true

if (admin) {
  router.addRoute(adminRouter)
}

const HomeVipRoute = {
  path: "vip",
  component: () => import("../components/HomeVip.vue")
}
router.addRoute("home", HomeVipRoute)

//路由守卫
router.beforeEach((to, from) => {
  //如果去的是登录页面执行代码
  if (to.path !== "/login") {
    //获取token
    const token = localStorage.getItem("token")
    //如果当前没有登录，不允许去其他页面
    if (!token) {
      return "/login"
    }
  }
})





export default router
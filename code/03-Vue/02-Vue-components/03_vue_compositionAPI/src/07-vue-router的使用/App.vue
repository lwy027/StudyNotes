<script setup>
import { useRouter } from 'vue-router';


const router = useRouter()

function jumpAbout() {
  router.push({
    path: "/about",
    query: {
      name: "lwy",
      age: 20
    }
  })
}



</script>

<template>
  <div>
    <h2> App组件</h2>
    <p>
      <router-link to="/home">首页</router-link>
      <router-link to="/about">关于</router-link>
      <router-link to="/user/123">关于</router-link>
      <router-link to="/user/456">关于</router-link>
      <router-link to="/admin">admin</router-link>
      <router-link to="/order">order页面</router-link>
      <router-link to="/login">login</router-link>

      <button @click="jumpAbout"> 跳转到about页面</button>
    </p>
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped></style>
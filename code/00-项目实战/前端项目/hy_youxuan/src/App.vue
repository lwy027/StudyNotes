<template>
  <div id="app">
    <div class="header"><app-header></app-header></div>
    <div class="nav"><app-nav></app-nav></div>
    <router-view></router-view>
    <div class="footer"><app-footer></app-footer></div>

    <!-- 返回顶部 -->
    <back-top></back-top>
  </div>
</template>

<script setup>
  import AppHeader from '@/components/app-header/index.vue'
  import AppNav from '@/components/app-nav/index.vue'
  import AppFooter from '@/components/app-footer/index.vue'
  import BackTop from '@/components/back-top/index.vue'

</script>

<style lang="less">
  .header {
    background-color: #fff;
  }

  .nav {
    background-color: #43240c;
  }
</style>

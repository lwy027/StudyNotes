<script setup>
import tarBar from "./components/tar-bar.vue"
import loading from "./components/loading/loading.vue";




</script>

<template>
  <div class="App">
    <!-- 路由占位 -->
    <routerView></routerView>
    <tarBar v-if="!$route.meta.showTabbar" ref="tabbar" />
    <loading />
  </div>
</template>

<style lang="less" scoped></style>
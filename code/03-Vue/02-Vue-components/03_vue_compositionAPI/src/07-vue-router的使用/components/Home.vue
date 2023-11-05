<script setup>


</script>

<template>
  <div>
    <h2>Home组件 </h2>
    <RouterLink to="/home/message">message</RouterLink>
    <RouterLink to="/home/vip">vip</RouterLink>

    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped></style>
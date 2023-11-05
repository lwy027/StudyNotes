<script setup>
import { useRoute } from 'vue-router';


const route = useRoute()
console.log(route.params.id)
</script>

<template>
  <div>
    <h2>用户:{{ $route.params.id }} </h2>
  </div>
</template>

<style lang="less" scoped></style>
<script setup>
import home from "./home.vue"

</script>

<template>
  <div class="app">
    <h2>app</h2>
    <Teleport to="body">
      <home></home>
    </Teleport>
  </div>
</template>

<style lang="less" scoped></style>
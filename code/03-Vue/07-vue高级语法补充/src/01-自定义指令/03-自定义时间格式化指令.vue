<script setup>

const timeStamp = new Date()

</script>

<template>
  <div class="home">
    <h1 v-ftime="'YYYY / MM / DD'">{{ timeStamp }} </h1>
    <h1 v-ftime>{{ 1551234569874 }} </h1>

  </div>
</template>

<style lang="less" scoped></style>
<template>
  <div>
    <h2>{{ info.name }} </h2>
    <h2>{{ info.age }} </h2>
    <h2>{{ count }} </h2>
  </div>
</template>

<script setup>
import { inject } from 'vue';



const info = inject("info")
const count = inject("count")



</script>

<style scoped lang="less"></style>

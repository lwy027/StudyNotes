
<script setup>
import { ref } from "vue";
import info from "./info.vue"

const name = 'liweiye'
let age = ref(20)

function changeAge(newage) {
  age.value = newage
}
</script>

<template>
  <div>

    <info :name="name" :age="age" @changeAge="changeAge"></info>

  </div>
</template>

<style scoped lang="less"></style>

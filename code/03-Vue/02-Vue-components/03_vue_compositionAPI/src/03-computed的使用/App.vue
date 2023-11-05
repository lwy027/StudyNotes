<template>
  <div>
    <h1>{{ sum }} </h1>

    <button @click="changeNum" ref="title">更改sum值</button>

    <hr>

    <count></count>
  </div>
</template>


<script setup>
import Count from "./count.vue"
import { computed, provide, ref } from 'vue';



const num1 = ref(500)
const num2 = ref(20000)

// const sum = computed(() => {
//   return num1 + num2
// })
const sum = computed({
  get() {
    return num1.value + num2.value
  },
  set(newnum) {
    num1.value = newnum
  }
})
function changeNum() {
  sum.value = 222
}


const title = ref(null)
console.log(title.value)

let count = 100
let info = {
  name: 'lwy',
  age: 20
}

provide("count", count)
provide("info", info)

</script>

<style scoped lang="less"></style>

<template>
  <div>
    <h2>{{ counter }} </h2>
    <h2>{{ info.counter }} </h2>

    <button @click="decrease">+1</button>
    <button @click="increase">-1</button>

    <hr>

    <h2>{{ message }} </h2>

    <hr>

    <h2>{{ state.name }} </h2>
    <h2>{{ state.passage }} </h2>
  </div>
</template>

<script>
import { reactive, ref } from "vue"
export default {

  setup() {

    const state = reactive({
      passage: 0,
      name: 'liweiye'
    })

    let counter = ref(0)
    const info = { counter }
    let message = ref("hello world")
    const increase = () => {
      counter.value--
      console.log(counter
      )
    }
    const decrease = () => {
      counter.value++
      message = "l;lllll"
      state.name = 'kobe'
      console.log(state)
    }
    const mounted = () => {
      console.log(counter)
    }
    return {
      counter,
      decrease,
      increase,
      mounted,
      message,
      state,
      info
    }
  }
}
</script>

<style scoped lang="less"></style>

<template>
  <div>
    <h2>我是info组件 </h2>

    <h2>{{ name }} </h2>
    <h2>{{ age }} </h2>

    <button @click="changeAge"> +1</button>
  </div>
</template>

<script setup>

//使用defineProps定义props，可以使用返回值
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  age: {
    type: Number
  }
})

//使用difineEmits自定义事件
const emits = defineEmits(["changeAge"])

function changeAge() {
  //使用返回值是个函数，第一个参数要触发的事件，第二个传参
  emits("changeAge", 22)
}

</script>

<style scoped lang="less"></style>

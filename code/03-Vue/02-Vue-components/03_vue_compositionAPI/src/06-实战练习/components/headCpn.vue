<script setup>

defineProps({
  title: {
    type: String,
    default: ""
  },
  subTitle: {
    type: String,
    default: ""
  }
})

</script>

<template>
  <div>
    <h2>{{ title }} </h2>
    <h6>{{ subTitle }} </h6>
  </div>
</template>

<style lang="less" scoped></style>
<script setup>


const message = "hello world"
const vWy = {

  mounted(el, bindings) {


    console.log(el, bindings)
    el.textContent = bindings.value
  }

}

</script>

<template>
  <div class="home">
    <!-- <h1 v-wy:info.aaa.bbb="message">哈哈哈哈哈</h1> -->

    <h2 v-unit>{{ 111 }} </h2>
  </div>
</template>

<style lang="less" scoped></style>
<!-- <script setup>
import { onMounted, ref, withDirectives } from 'vue';


// const inputRef = ref()

// onMounted(() => {
//   inputRef.value.focus()
// })

withDirectives



</script> -->

<script>
export default {

  // directives: {
  //   focus: {
  //     mounted(el) {
  //       console.log(el)
  //       el.focus()
  //     }
  //   }
  // }

}
</script>

<template>
  <div class="app">
    <h1>
      <input type="text" v-focus>
    </h1>
  </div>
</template>

<style lang="less" scoped></style>
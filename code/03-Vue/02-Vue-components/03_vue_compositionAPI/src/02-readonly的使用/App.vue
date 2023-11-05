<template>
  <div>

  </div>
</template>

<script>
import { reactive, readonly, ref } from 'vue';
export default {

  setup() {
    const info = {
      name: 'lwy',
      age: 20
    }
    //1.传入普通对象
    const state = readonly(info)

    //2.传入reactive对象
    const state1 = reactive({
      name: 'lwy',
      age: 20
    })
    const state2 = readonly(state1)


    //3.传入ref对象
    const state3 = ref("lwy")
    const state4 = readonly(state3)


    return {
      state
    }


  }
}
</script>

<style scoped lang="less"></style>

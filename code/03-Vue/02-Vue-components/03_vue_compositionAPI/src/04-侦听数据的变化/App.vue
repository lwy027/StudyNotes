<template>
  <div>

    <h2>{{ name }} </h2>
    <h2>{{ age }} </h2>


    <button @click="changeName">changeName</button>

  </div>
</template>

<script>
import { ref, watch, watchEffect } from 'vue';

export default {


  setup() {

    let name = ref('kobe')
    let age = ref(18)

    // watch(name, (newname, oldname) => {
    //   console.log(newname, oldname)
    // }, {
    //   deep: true,
    //   immediate: true
    // })

    const stopWatch = watchEffect(() => {
      console.log('watchEffect执行', name.value, age.value)
    })
    const changeName = () => {
      name.value = 'lwy'
      age.value++
      if (age.value > 20) {
        stopWatch()
      }
    }

    return {
      name,
      changeName,
      age
    }
  }



}
</script>

<style scoped lang="less"></style>

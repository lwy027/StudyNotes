<script setup>
import { ref } from 'vue';
import house from './date/high_score.json'
import headCpn from "./components/headCpn.vue"

import areaCpn from "./components/areaCpn.vue"

const houseDate = ref([])

houseDate.value = house



const title = houseDate.value.title
const subTitle = houseDate.value.subtitle
const itemList = houseDate.value.list




</script>

<template>
  <div class="main">
    <!--头部  -->
    <head-cpn :title="title" :sub-title="subTitle"></head-cpn>
    <!-- 区域 -->
    <area-cpn :house-list="itemList"></area-cpn>

  </div>
</template>

<style  scoped>
.main {
  margin: 0 auto;
}
</style>
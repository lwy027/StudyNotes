<script setup>
import { ref } from "vue";

const city = ["纽约", "广州", "深圳", "上海"];
let currentTab = ref(0);
console.log(currentTab.value);

const changeIndex = (index) => {
  currentTab.value = index;
  console.log(currentTab.value, index);
};
</script>

<template>
  <div class="app">
    <template v-for="(item, index) in city" :key="index">
      <span
        :class="{ active: currentTab === index }"
        @click="changeIndex(index)"
      >
        {{ item }}
      </span>
    </template>
  </div>
</template>

<style lang="less" scoped>
.app {
  margin-left: 500px;
  display: flex;
}
span {
  display: block;
  margin-left: 20px;
  font-size: 30px;
  cursor: pointer;
}

.active {
  border-bottom: 5px solid red;
}
</style>

<script setup>
import { ref } from 'vue';


const sums = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])


const randomNum = () => {
  return Math.floor(Math.random() * sums.value.length)
}


const addEl = () => {
  sums.value.splice(randomNum(), 0, randomNum())
}
const subEl = () => {
  sums.value.splice(randomNum(), 1)
}

</script>

<template>
  <div class="home">

    <button @click="addEl">添加元素</button>
    <button @click="subEl">删除元素</button>

    <transition-group tag="div">
      <div>
        <template v-for="item in sums" :key=item>
          <span>{{ item }} </span>
        </template>
      </div>
    </transition-group>


  </div>
</template>

<style lang="less" scoped>
span {
  display: inline-block;
  margin-left: 10px;

}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(100px);
}


.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.v-leave-active,
.v-enter-active {
  transition: all 2s ease;
}

v-move {
  transform: translate(100px);
  transition: all 2s ease-in-out;
}
</style>
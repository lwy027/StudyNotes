<script setup>
import { ref } from 'vue';

import home from "./home.vue"


let isShow = ref(true)

</script>

<template>
  <div class="home">


    <!-- <button @click="isShow = !isShow">显示/隐藏</button>

    <transition type="animation">
      <p v-show="isShow">
        2017年五四青年节前，习近平总书记在考察中国政法大学时，参加了民商经济法学院1502班团支部“不忘初心跟党走”主题团日活动，对团员青年成长成才提出了殷切期望。一年后，1502班团支部全体同学给习近平总书记写信，汇报了一年以来的活动和进步。习近平总书记委托工作人员向1502班团员青年致以节日的问候，对同学们立志“不忘初心，用一生来践行跟党走的理想追求”予以充分肯定。
      </p>
    </transition> -->
    <home></home>


  </div>
</template>

<style lang="less" scoped>
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(0.6);

}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: scale(1);
}

.v-enter-active,
.v-leave-active {

  animation: bounce 2s ease-in-out;
}


@keyframes bounce {

  0% {

    opacity: 0;
    transform: scale(0.6);
  }

  20% {
    opacity: 0.2;
    transform: scale(1);
  }

  60% {
    opacity: 0.8;
    transform: scale(1.2);
  }

  80% {
    opacity: 1;
    transform: scale(1.5);
  }

  100% {
    transform: scale(2);
  }

}
</style>
<script setup>
import useLoadingStore from "../../stores/modules/loading";
import { storeToRefs } from "pinia";
const loadingStore = useLoadingStore()

const { isLoading } = storeToRefs(loadingStore)
</script>

<template>
  <div class="loading" v-show="isLoading">

    <div class="bg">
      <img src="../../assets/img/home/full-screen-loading.gif" alt="">
    </div>

  </div>
</template>

<style lang="less" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .5);
}

// background-color: rgb(0, 0, 0, );

.bg {
  width: 107px;
  height: 107px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../../assets/img/home/loading-bg.png) 0 0 / 100% 100%;

  img {
    width: 70px;
    height: 70px;
    margin-bottom: 8px;
  }
}
</style>
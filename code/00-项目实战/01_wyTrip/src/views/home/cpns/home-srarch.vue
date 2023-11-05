<script setup>
import { ref, computed } from 'vue';
import useHomeStore from '../../../stores/modules/home';
import { storeToRefs } from 'pinia';
const sreachValue = ref()
const homeStore = useHomeStore()

const { startDate, endDate } = storeToRefs(homeStore)



</script>

<template>
  <div class="home-search">

    <div class="serach-box">

      <van-search v-model="sreachValue" shape="round" placeholder="关键字/位置/民宿" left-icon="none" right-icon="search"
        class="vant-search" size="20">
        <template #left-icon>
          <div class="data">
            <div class="start">
              <span>住&nbsp;{{ startDate }} </span>
            </div>
            <div class="end">
              <span>离&nbsp;{{ endDate }} </span>
            </div>
          </div>


        </template>

      </van-search>
    </div>


  </div>
</template>

<style lang="less" scoped>
.serach-box {
  position: fixed;
  top: 0;
  z-index: 999999;
  width: 100%;
  height: 80px;
  text-align: center;

  --van-search-input-height: 43px;

  .data {
    margin-left: 5px;

    .start {
      padding: 0;
      margin: 0;

    }

    .end {
      padding: 0;
      margin: 0;
      margin-top: -10px;
    }

    font-size: 10px;
  }
}
</style>
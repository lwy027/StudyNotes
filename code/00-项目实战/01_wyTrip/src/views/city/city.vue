<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from "../../stores/modules/city"
import { storeToRefs } from "pinia"
import cityList from './cpns/city-list.vue';

const srearchValue = ref('')


const router = useRouter()


//点击取消
const cancelClick = () => {
  router.back()
}

// 记录当前的值
const currentTab = ref()

// 使用store
const cityStore = useCityStore()

const { Allcity } = storeToRefs(cityStore)


// const currentGroup = computed(() => {
//   return Allcity.value[currentTab?.value]
// })


</script>

<template>
  <div class="city top-page">
    <!-- 搜索框 -->
    <div class="top">
      <van-search v-model="srearchValue" placeholder="城市/区域/位置" shape="round" clearable show-action
        @cancel="cancelClick" />
      <!-- tab的切换 -->
      <van-tabs v-model:active="currentTab" color="#ff9854">
        <template v-for="(value, key, index) in Allcity ">
          <van-tab :title="value.title" :name="key">
          </van-tab>
        </template>
      </van-tabs>
    </div>
    <!-- 内容 -->
    <div class="content">
      <template v-for="(value, key, index) in Allcity" :key="key">
        <cityList :groupData="value" v-show="key === currentTab" />
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.city {


  :deep(.van-field__left-icon) {
    color: var(--primary-color);
  }

  // .top {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  // }

  .content {
    height: calc(100% - 98px);
    overflow-y: auto;
  }



}
</style>
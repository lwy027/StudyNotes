<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '../../../stores/modules/city';
import { storeToRefs } from 'pinia';


const props = defineProps({
  groupData: {
    type: Object,
    defaul: () => ({})
  }
})

const indexList = computed(() => {
  const indexs = props.groupData.cities.map(item => item.group)
  indexs.unshift("#")
  return indexs

})
const cityStore = useCityStore()
const router = useRouter()
//点击退出并获取当前城市名称
const clickCity = (item) => {
  cityStore.currentCity = item
  router.back()

}

</script>

<template>
  <div class="city-list">
    <van-index-bar :index-list="indexList">

      <van-index-anchor index="热门" highlight-color="#ff9854" />
      <div class="hot">
        <template v-for="item in groupData?.hotCities">
          <div class="item" @click="clickCity(item)">{{ item.cityName }} </div>
        </template>
      </div>
      <div class="cities">
        <template v-for="(item, index) in groupData?.cities">
          <van-index-anchor :index="item.group" />

          <template v-for="(item, index) in item.cities">
            <van-cell :title="item.cityName" @click="clickCity(item)" />
          </template>

        </template>


      </div>

    </van-index-bar>
  </div>
</template>

<style lang="less" scoped>
.city-list {
  .hot {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    ;
    align-items: center;



    .item {
      width: 70px;
      height: 28px;
      margin: 5px 10px;
      text-align: center;
      line-height: 28px;
      border-radius: 18px;
      background-color: #fff4ec;
    }
  }

  // :deep(--van-index-bar-index-line-height) {
  //   color: var(--primary-color);
  // }
}
</style>
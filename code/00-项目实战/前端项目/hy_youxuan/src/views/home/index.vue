<template>
  <div class="home">
    <div class="recommend">
      <home-category></home-category>
      <home-discount></home-discount>
    </div>
    <div class="choiceness">
      <div class="header">
        <span class="title">小编精选</span>
        <span class="desc">每天更新</span>
      </div> 
      <div class="list">
        <product-list :listData="choicelessData.list"></product-list>
      </div>
    </div>
    <div class="more">
      <look-more @click="handleLoadMore"></look-more>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'

import { ProductList } from '@/components/product-list'

import HomeCategory from './childCpns/home-category.vue'
import HomeDiscount from './childCpns/home-discount.vue'
import LookMore from '@/components/look-more/index.vue'

import { getChoicelessData } from '@/service/module/home'

const choicelessData = reactive({
  list: [],
  totalCount: 0
})

onMounted(() => {
  getChoicelessDataAction()
})

const getChoicelessDataAction = () => {
  getChoicelessData(choicelessData.list.length).then(res => {
    if (res.code < 0) return
    choicelessData.list = [ ...choicelessData.list, ...res.data.list ]
    choicelessData.totalCount = res.data.totalCount
  })
}

const handleLoadMore = () => {
  getChoicelessDataAction()
}

</script>

<style lang="less" scoped>
  @import url(@/assets/css/index.less);

  .home {
    .recommend {
      .contentArea();
      display: flex;
    }

    .choiceness {
      .contentArea();
      margin-top: 10px;

      .header {
        height: 56px;
        line-height: 56px;
        .title {
          display: inline-block;
          margin-left: 52px;
          font-size: 18px;
          font-weight: 500;
          color: #43240c;
        }

        .desc {
          display: inline-block;
          margin-left: 30px;
          font-size: 14px;
          color: #877a73;
        }
      }
    }
  }
</style>

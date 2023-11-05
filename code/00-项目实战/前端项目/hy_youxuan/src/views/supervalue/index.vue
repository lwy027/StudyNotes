<template>
  <div class="supervalue">
    <sub-title title="超值大额券"></sub-title>
    <tab-bar 
      :defaultActiveId="defaultActiveId"
      :subTitles="subTitles" 
      @tab-bar-click="handleTabBarClick"
    ></tab-bar>

    <product-list :listData="columnDatas"></product-list>
    <look-more @click="handleLoadMore"></look-more>

  </div>
</template>

<script setup>
// import { ref, onMounted } from 'vue'

import SubTitle from '@/components/sub-title/index.vue'
import TabBar from '@/components/tab-bar/index.vue'
import { ProductList } from '@/components/product-list'
import LookMore from '@/components/look-more/index.vue'

import { useNinePage } from '@/hooks/index'

const {
    subTitles, 
    defaultActiveId, 
    columnDatas, 

    handleTabBarClick,
    handleLoadMore
} = useNinePage(170)


</script>

<style lang="less" scoped>
  .supervalue{
    .contentArea();
  }
</style>

<template>
  <div class="nine">
    <sub-title title="9块9专区"></sub-title>
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
// import { getSubColumns, getSubColumnItems } from '@/service/module/nine'

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
} = useNinePage(29)


// const subTitles = ref([])
// const defaultActiveId = ref(0)

// const columnDatas = ref([])

// onMounted(() => {
//   getSubColumns().then((res)=>{
//     // console.log(res)
//     subTitles.value = res.data.subColumns
//     if(subTitles.value.length){
//       let firstColumn = res.data.subColumns[0]
//       defaultActiveId.value = firstColumn.id
//       // 初始化列表的数据
//       getColumnData(firstColumn.id, 0)
//     }
//   })
// })

// const getColumnData = (id, start) => {
//   getSubColumnItems(id, start).then((res) => {
//     console.log(res.data.list)
//     if(start){
//       columnDatas.value = [...columnDatas.value, ...res.data.list]
//     } else {
//       columnDatas.value = res.data.list || []
//     }
    
//   })
// }

// const handleTabBarClick = (item) => {
//    // 初始化列表的数据
//   //  columnDatas.value = []
//   defaultActiveId.value = item.id
//    getColumnData(item.id, 0)
// }

// const handleLoadMore = () => {
//   getColumnData(defaultActiveId.value, columnDatas.value.length)
// }
</script>

<style lang="less" scoped>
  .nine{
    .contentArea();
  }
</style>

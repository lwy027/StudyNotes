<template>
  <div v-if="listData.length" class="product-list">
    <template v-for="(item, index) in listData" :key="index">
      <product-list-item :itemData="item" ></product-list-item>
    </template>
  </div>
  <div v-else class="no-data">
    <!-- <div>———— 我是有底线滴 ————</div> -->
    <div>———— 没有数据 ————</div>
  </div>
</template>

<script setup>
import ProductListItem from './product-list-item.vue'
defineProps({
  listData: {
    type: Array,
    default: () => []
  }
})

</script>

<style lang="less" scoped>
  .product-list {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    padding: 10px 0;
    margin-left: -12px;
  }
  .no-data {
      color: #666;
      font-size: 14px;
      text-align: center;
      padding-top: 50px;
      padding-bottom: 10px;
      
  }
</style>
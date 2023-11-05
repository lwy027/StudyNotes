<template>
  <div class="detail">
    <div class="info">
      <detail-product :productInfo="detailInfo.detail"></detail-product>
      <detail-shop :shopInfo="detailInfo.shop"></detail-shop>
    </div>
    <div class="photos">
      <template v-for="(item, index) in detailInfo.detail.photo" :key="index">
        <img :src="item.url" alt="">
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProductDetail } from '@/service/module/detail'

import DetailProduct from './childCpns/detail-product.vue'
import DetailShop from './childCpns/detail-shop.vue'

const route = useRoute()
const id = route.query.id
const detailInfo = ref({ 
  detail: {},
  shop: {}
})

onMounted(() => {
  getProductDetail(id).then(res => {
    detailInfo.value = res.data
    detailInfo.value.detail.id = id
  })
})

</script>

<style lang="less" scoped>
  @import url(@/assets/css/index.less);

  .detail {
    .contentArea();

    .info {
      display: flex;
    }

    .photos {
      background-color: #fff;
      margin-top: 10px;
      padding: 50px 20px;
      img {
        width: 790px;
        height: 790px;
        display: inline-block;
      }
    }
  }
</style>
<template>
  <div class="product-list-item" @click="handleProductItemClick">
    <img :src="itemData.image" alt="">
    <div class="info">
      <div class="title">{{itemData.title}}</div>
      <div class="service">
        <span class="source">淘宝</span>
        <span class="baoyou">包邮</span>
      </div>
      <div class="price">
        <span class="tag">¥</span>
        <span class="value">{{itemData.price}}</span>
        <span class="count">{{itemData.saleNum}}人已买</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})

const handleProductItemClick = () => {
  router.push({
    path: "/detail",
    query: {
      id: props.itemData.id
    }
  })
}

</script>

<style lang="less" scoped>
  .product-list-item {
    width: 276px;
    background-color: #fff;
    margin-top: 24px;
    margin-left: 24px;
    cursor: pointer;

    img {
      width: 100%;
    }

    .info {
      padding: 8px 18px;

      .title {
        font-size: 14px;
        line-height: 18px;
        color: #877a73;

        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .service {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;

        .source {
          margin: 0 6px 0 0;
          padding: 0 6px;

          background-color: #f40;
          color: #fff;
          border-radius: 2px;
        }
      }

      .price {
        margin-top: 20px;
        .tag, .value {
          color: #fa585a;
          display: inline-block;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 12px;
        }

        .value {
          font-size: 28px;
        }

        .count {
          color: #877a73;
          font-size: 14px;
          margin-left: 10px;
        }
      }
    }
  }
</style>
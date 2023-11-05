<template>
  <div class="product">
    <img :src="productInfo.image" alt="" />
    <div class="desc">
      <div class="title">
        <img class="taobao" src="@/assets/image/icon_taobao.png" alt="" />
        <img class="baoyou" src="@/assets/image/icon_baoyou.png" alt="" />
        {{ productInfo.title }}
      </div>
      <div class="price">
        <div class="old-price">原价{{ productInfo.originPrice }}</div>
        <div class="new-price">
          折扣价: ¥<span class="value">{{ productInfo.price }}</span>
        </div>
        <div class="count">{{ productInfo.saleNum }}人购买</div>
      </div>
      <div class="cart">
        <div class="btn" @click="handleAddCartClick">加入购物车</div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useCartStore } from '@/store'

const cartStore = useCartStore()

const props = defineProps({
  productInfo: {
    type: Object,
    default: () => ({})
  }
})

function handleAddCartClick() {
  cartStore.addProductToCart(props.productInfo)
}

</script>

<style lang="less" scoped>
.product {
  display: flex;
  flex: 1;
  padding: 20px 30px;
  background-color: #fff;

  img {
    width: 282px;
    height: 282px;
    margin-top: 20px;
  }

  .desc {
    padding: 10px 20px;
    .title {
      font-size: 24px;
      line-height: 36px;

      img {
        position: relative;
        top: 5px;
        left: 5px;
        width: 24px;
        height: 24px;
        margin-right: 10px;
      }

      img.baoyou {
        width: 42px;
      }
    }

    .price {
      background-color: #f5f5f5;
      padding: 16px;
      position: relative;
      margin-top: 8px;

      .old-price {
        font-size: 16px;
        font-weight: 400;
        color: #b1a9a5;
        line-height: 22px;
        text-decoration: line-through;
      }

      .new-price {
        font-size: 20px;
        color: #ff4653;
        line-height: 28px;
        margin-top: 5px;

        .value {
          font-size: 40px;
          font-weight: 700;
        }
      }

      .count {
        position: absolute;
        right: 20px;
        bottom: 10px;
        color: #b1a9a5;
      }
    }

    .cart {
      display: flex;
      justify-content: flex-end;

      .btn {
        cursor: pointer;
        width: 224px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 4px;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        margin-top: 11px;
        margin-bottom: 39px;
        display: block;
        background-color: rgb(250, 88, 90);
      }
    }
  }
}
</style>

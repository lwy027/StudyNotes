<template>
  <div id="header">
    <div class="logo">
      <img src="@/assets/image/logo.png" alt="">
      <div class="title">
        <h3>弘源优选</h3>
        <span>HONG YUAN YOU XUAN</span>
      </div>
    </div>
    <div class="search">
      <img class="icon" src="@/assets/image/icon_search.png" alt="">
      <input type="text" placeholder="搜索商品，发现更多优惠">
      <div class="btn">搜索</div>
    </div>
    <div class="service">
      <div class="baoyou item">
        <img src="@/assets/image/baoyou.png" alt="">
        <span>全国包邮</span>
      </div>
      <div class="exchange item">
        <img src="@/assets/image/exchange.png" alt="">
        <span>7天退换</span>
      </div>
      <div class="quality item">
        <img src="@/assets/image/quality.png" alt="">
        <span>品质保证</span>
      </div>
    </div>
    <div class="cart" @click="handleCartClick">
      <img src="@/assets/image/icon_cart.png" alt="">
      购物车({{cartStore.cartList.length}})
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/store'

const router = useRouter()
const cartStore = useCartStore()

function handleCartClick() {
  router.push({
    path: "/cart"
  })
}

</script>

<style lang="less" scoped>
  @import url(@/assets/css/base.less);

  #header {
    .contentArea();

    height: 160px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: #43200c;

    .logo {
      display: flex;
      align-items: center;

      img {
        width: 75px;
        height: 75px;
      }

      .title {
        margin-left: 20px;
        text-align: center;

        h3 {
          font-size: 35px;
          font-weight: 600;
          line-height: 40px;
          margin: 0;
        }

        span {
          font-size: 12px;
          line-height: 17px;
          transform: scale(.8);
        }
      }
    }

    .search {
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 532px;
      height: 46px;
      border: 2px solid #43200c;
      border-radius: 30px;

      .icon {
        width: 24px;
        height: 24px;
        margin: 0 12px;
      }

      input {
        flex: 1;
        border: none;
        outline: none;
      }

      .btn {
        height: 46px;
        width: 124px;
        font-size: 14px;
        line-height: 46px;
        text-align: center;
        border-radius: 30px;
        background-color: #fee44e;
      }
    }

    .service {
      display: flex;
      align-items: center;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 15px;
        color: #877a73;

        img {
          width: 40px;
          height: 40px;
        }

        span {
          font-size: 12px;
          margin-top: 8px;
        }
      }
    }

    .cart {
      cursor: pointer;
      display: flex;
      align-items: center;
      border: 2px solid #43200c;
      padding: 10px 15px ;
      border-radius: 20px;

      img {
        position: relative;
        top: -3px;
        margin-right: 5px;
      }
    }
  }
</style>
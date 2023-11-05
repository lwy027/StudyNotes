<template>
  <div class="cart" v-if="cartStore.cartList.length">
    <div class="select-all">
      <input type="checkbox" @change="handleSelectAllChange" :checked="cartStore.isSelectAll"/>
      <span class="text">全选</span>
    </div>
    <div class="product-list">
      <template v-for="(item, index) in cartStore.cartList" :key="index">
        <div class="item" :class="item.selected ? 'select': ''">
          <input type="checkbox" v-model="item.selected" />
          <div class="info">
            <img :src="item.image" alt=""/>
            <div class="desc">{{item.title}}</div>
          </div>
          <div class="price">
            <div class="old">¥{{item.originPrice}}</div>
            <div class="new">¥{{item.price}}</div>
          </div>
          <div class="count">
            <button :disabled="item.count <= 1" @click="handleCountClick(item.id, -1)">-</button>
            <input type="text" v-model="item.count" />
            <button @click="handleCountClick(item.id, +1)">+</button>
          </div>
          <div class="value">¥{{(item.count * item.price).toFixed(2)}}</div>
          <div class="handle">
            <button @click="handleDeleteBtnClick(item.id)">删除</button>
          </div>
        </div>
      </template>
    </div>
    <div class="footer">
      <div class="select-all">
        <input type="checkbox" @change="handleSelectAllChange" :checked="cartStore.isSelectAll"/>
        <span class="text">全选</span>
      </div>
    </div>
  </div>
  <div class="empty" v-else>购物车为空, 快选择喜欢的商品吧~</div>
</template>

<script setup>
import { useCartStore } from "@/store";
const cartStore = useCartStore();


function handleCountClick(id, counter) {
  cartStore.updateProductCounter(id, counter)
}

function handleSelectAllChange(event) {
  const isChecked = event.target.checked
  cartStore.updateAllProductSelected(isChecked)
}

function handleDeleteBtnClick(id) {
  cartStore.deleteProductById(id)
}

</script>

<style lang="less" scoped>
@import url(@/assets/css/index.less);

.empty {
  .contentArea();

  height: 80px;
  line-height: 80px;
  left: 80px;
  background-color: #fff;
  text-align: center;
  color: #f40;
  font-size: 24px;
}

.cart {
  .contentArea();
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;

  .select-all {
    display: flex;
    align-items: center;
    height: 50px;
    color: #3c3c3c;
    font-size: 12px;
    margin-left: 8px;

    .text {
      position: relative;
      top: 2px;
      left: 8px;
    }
  }

  .product-list {
    border: 1px solid #ccc;

    .item {
      display: flex;
      // align-items: center;
      padding: 25px;
      background-color: #fcfcfc;
      border-bottom: 1px solid #e7e7e7;
      font-size: 12px;

      &.select {
        background-color: #fff8e1;
      }

      &:last-of-type {
        border-bottom: none;
      }

      .info {
        display: flex;
        flex: 1;

        img {
          width: 80px;
          height: 80px;
          margin: 0 12px;
        }

        .desc {
          font-size: 12px;
          display: block;
          max-height: 36px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .price {
        width: 130px;

        .old {
          color: #999;
          text-decoration: line-through;
        }

        .new {
          color: #3c3c3c;
          font-weight: 700;
          font-family: Verdana, Tahoma, arial;
          font-size: 13px;
          margin-top: 10px;
        }
      }

      .count {
        width: 120px;

        input {
          display: inline-block;
          width: 41px;
          height: 15px;
          padding: 3px;
          text-align: center;
          vertical-align: middle;
        }

        button {
          height: 25px;
          background-color: #f0f0f0;
          outline: none;
          border: 1px solid rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
      }

      .value {
        width: 140px;
        color: #f40;
        font-weight: 700;
        font-size: 14px;
      }

      .handle {
        width: 120px;

        button {
          border: none;
          background-color: transparent;
        }
      }
    }
  }

  .footer {
    height: 50px;
    line-height: 50px;
    background-color: #e5e5e5;
    margin-top: 20px;
  }
}
</style>

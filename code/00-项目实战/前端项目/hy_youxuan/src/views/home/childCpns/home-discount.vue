<template>
  <div class="discount">
    <div class="top">
      <template v-for="(item, index) in discountTopData" :key="index">
        <div class="item">
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.desc }}</div>
          <img :src="item.imgUrl" alt="" />
        </div>
      </template>
    </div>
    <div class="bottom">
      <template v-for="(item, index) in discountBottomData" :key="index">
        <div class="item">
          <div class="info">
            <div class="title">{{ item.title }}</div>
            <div class="desc">{{ item.desc }}</div>
            <div class="go" v-if="item.hasGo">GO</div>
          </div>
          <img :src="item.imgUrl" alt="" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import {
  topList as discountTopData,
  bottomList as discountBottomData,
} from "@/assets/data/discount";
</script>

<style lang="less" scoped>
.discount {
  flex: 1;
  margin-left: 10px;

  .top {
    display: flex;
    justify-content: space-between;

    .item {
      position: relative;
      width: 272px;
      height: 170px;
      padding: 32px 13px;
      margin-left: 10px;
      background-color: #fff4e4;

      &:nth-child(2) {
        background-color: #ffd1dd;
      }

      &:nth-child(3) {
        background-color: #e7f5ff;
      }

      .title {
        z-index: 3;
        position: absolute;
        top: 32px;
        left: 13px;
        font-size: 24px;
        color: #ff5817;
      }

      .desc {
        position: absolute;
        top: 76px;
        left: 0;
        padding: 0 47px 0 22px;
        font-size: 18px;
        line-height: 36px;
        color: #fff;
        background: url(@/assets/image/discount_bg.png) no-repeat 50% / cover;
      }

      img {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 134px;
        height: 134px;
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    color: #fff;
    margin-top: 10px;

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 275px;
      height: 86px;
      padding: 26px 5px 16px 34px;
      border-radius: 18px;
      cursor: pointer;

      &:nth-child(1) {
        background: linear-gradient(270deg, #ffd1dd, #fca6c0);
      }

      &:nth-child(2) {
        background: linear-gradient(270deg, #fffffe, #fec07e);
      }

      &:nth-child(3) {
        background: linear-gradient(270deg, #e7f5ff, #afdcff);

        img {
          width: 100px;
          height: 100px;
        }
      }

      .info {
        .title {
          font-size: 22px;
          font-weight: 600;
        }
        .desc {
          font-size: 18px;
          margin: 8px 0;
        }
        .go {
          color: #fca6c0;
          display: block;
          margin-top: 11px;
          width: 47px;
          font-size: 14px;
          line-height: 20px;
          text-align: center;
          background-color: #fff;
          border-radius: 10px;
        }
      }

      img {
        width: 125px;
        height: 125px;
      }
    }
  }
}
</style>

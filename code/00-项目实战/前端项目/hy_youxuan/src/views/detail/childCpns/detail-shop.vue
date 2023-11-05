<template>
  <div class="shop">
    <div class="header">
      <div class="line"></div>
      <div>卖家信息</div>
      <div class="line"></div>
    </div>
    <div class="logo">
      <img :src="shopInfo.picUrl" alt="" />
    </div>
    <div class="name">{{ shopInfo.nickname }}</div>
    <div class="grade">
      <div class="item">
        <div class="name">描述</div>
        <div class="score">{{ shopInfo.itemScore }}</div>
      </div>
      <div class="item">
        <div class="name">服务</div>
        <div class="score">{{ shopInfo.serviceScore }}</div>
      </div>
      <div class="item">
        <div class="name">物流</div>
        <div class="score">{{ shopInfo.deliveryScore }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  shopInfo: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="less" scoped>
.shop {
  width: 275px;
  height: 352px;
  border: 1px solid #fee44e;
  margin-left: 10px;
  background-color: #fff;

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 63px;
    background: linear-gradient(180deg, #fee44e, #fff 85%, #fff);

    .line {
      width: 56px;
      height: 1px;
      background: #43240c;
      opacity: 0.2;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;

    img {
      width: 150px;
      height: 150px;
    }
  }

  .name {
    margin-top: 10px;
    font-size: 18px;
    color: #43240c;
    line-height: 25px;
    text-align: center;
  }

  .grade {
    display: flex;
    justify-content: center;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 8px 16px;

      .name {
        font-size: 14px;
        color: #b1a9a5;
        line-height: 20px;
      }

      .score {
        font-size: 14px;
        color: #fb9547;
        line-height: 20px;
      }
    }
  }
}
</style>

<script setup>


defineProps({
  title: {
    type: String,
    default: "默认标题"
  },
  moreText: {
    type: String,
    default: "更多内容"
  },
  // weight: {
  //   type: String,
  //   default: 400 + "px"
  // },
  // height: {
  //   type: String,
  //   default: 400 + "px"
  // }
})


</script>

<template>
  <div class="detail-section">


    <div class="title">
      <h2>{{ title }} </h2>
    </div>
    <div class="content">
      <div class="solt-area">
        <slot>
          <h3>我是默认插槽</h3>
        </slot>
      </div>
      <div class="moreText">
        <h3> {{ moreText }}<van-icon name="arrow" /> </h3>

      </div>

    </div>



  </div>
</template>

<style lang="less" scoped>
.detail-section {

  border-top: 5px solid #eee;
  margin-bottom: 40px;

  .title {
    width: 389px;
    height: 56px;
    line-height: 56px;
    margin-left: 10px;
    border-bottom: 1px solid #eee;
  }

  .content {
    position: relative;

    .solt-area {


      padding: 20px;
    }

    .moreText {
      position: absolute;
      right: 20px;
      bottom: -20px;
      margin-bottom: 0px;
      color: var(--primary-color);
    }
  }

  .topBg,
  .btmBg {
    height: 5px;
    margin-top: 60px;
    background-color: rgb(242, 243, 244);
  }
}
</style>
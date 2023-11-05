<script setup>


defineProps({
  hotCitySuggest: Array,
  default: () => []
})
</script>

<template>
  <div class="hot-suggest">
    <div class="hot-area">
      <div class="top">
        <span>价格不限</span>
        <span>人数不限</span>
      </div>
      <div class="local">
        <span>关键字/位置/民宿名</span>
      </div>
      <div class="suggest-area">
        <template v-for="(item, index) in hotCitySuggest" :key="index">
          <span :style="{ color: item.tagText.color, background: item.tagText.background.color }"> {{ item.tagText.text }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.hot-suggest {
  margin-top: 10px;

  .hot-area {
    span {
      font-size: 15px;
    }

    width: 86%;
    height: 48px;
    margin-left: 11px;

    .top {
      display: flex;
      justify-content: space-between;
    }

    .local {
      margin-top: 30px;
    }

    .suggest-area {
      margin-top: 20px;

      span {
        font-size: 12px;
        display: inline-block;
        border-radius: 18px;
        margin: 5px 5px;
        padding: 5px 8px;
      }
    }
  }

}
</style>
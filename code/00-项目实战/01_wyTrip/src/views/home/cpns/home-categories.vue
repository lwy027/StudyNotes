<script setup>
import useHomeStore from "../../../stores/modules/home"


const homeStore = useHomeStore()

//获取推荐分类的数据
homeStore.fetchCategoriesData()

</script>

<template>
  <div class="home-categories">
    <!-- 推荐类别 -->
    <div class="categories">
      <template v-for="(item, index) in homeStore.categories">
        <div class="item">
          <img :src="item.pictureUrl" alt="">
          <p>{{ item.title }} </p>
        </div>
      </template>
    </div>

  </div>
</template>

<style lang="less" scoped>
.home-categories {
  .categories {
    display: flex;
    overflow-x: auto;
    height: 80px;
    padding: 0 10px;
    margin-top: 8px;

    .item {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 70px;
      text-align: center;

      p {
        font-size: 12px;
        margin-top: 8px;
      }

      img {
        width: 32px;
        height: 32px;
      }
    }
  }


}
</style>
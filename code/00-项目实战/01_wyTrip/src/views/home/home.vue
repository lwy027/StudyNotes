<script setup>
import navTop from './cpns/home-nav-bar.vue';
import HomeSearchBox from "./cpns/home-search-box.vue"
import homeCategories from './cpns/home-categories.vue';
import homeContent from './cpns/home-content.vue';
import HomeSearch from './cpns/home-srarch.vue';
import { computed } from 'vue';
import useScroll from '../../hooks/useScroll';



const { scrollTop } = useScroll()

const isShow = computed(() => {
  return scrollTop.value >= 350
})

</script>

<template>
  <div class="home">
    <!-- 顶层 -->
    <navTop />
    <!-- banner -->
    <div class="banner">
      <img src="../../assets/img/home/banner.webp" alt="">
    </div>
    <!-- 搜索区域 -->
    <HomeSearchBox />
    <!-- 推荐类别 -->
    <home-categories />
    <!-- 房屋列表 -->
    <homeContent />
    <!-- 搜索 -->
    <HomeSearch v-show="isShow" />


  </div>
</template>

<style lang="less" scoped>
.home {

  .banner {

    img {
      width: 100%;

    }
  }

}
</style>
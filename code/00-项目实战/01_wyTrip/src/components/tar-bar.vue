<script setup>
import { ref } from 'vue';
import tabbarData from '../assets/data/tarbarData';
import getAssetURL from "../utils/load_assets"


const currentIndex = ref(0)
</script>

<template>
  <div class="tar-bar">
    <van-tabbar v-model="currentIndex">
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <template #default>
            <span> {{ item.text }}</span>
          </template>

          <template #icon>
            <img :src="getAssetURL(item.imageActive)" v-if="index === currentIndex">
            <img :src="getAssetURL(item.image)" alt="" v-else>
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<style lang="less" scoped>
// .tar-bar {
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   .item {
//     flex: 1;
//     display: flex;
//     align-items: center;
//     flex-direction: column;

//     img {
//       width: 36px;
//     }
//   }

// }
.van-tabbar-item--active {
  color: var(--primary-color);
}

:deep(.van-tabbar-item__icon) {
  font-size: 50px;
}


img {
  width: 26px;
}
</style>
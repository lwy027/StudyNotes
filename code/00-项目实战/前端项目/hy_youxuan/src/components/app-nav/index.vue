<template>
  <div class="nav">
    <template v-for="(item, index) in navLists" :key="index">
      <div class="item" 
            :class="currentIndex === index ? 'active': ''"
            @click="navToPath(item, index)">
        {{item.title}}
      </div>
    </template>
  </div>
</template>

<script setup>
  import { ref, reactive, watch} from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const navLists = reactive([
    {id: 0, title: "首页", path: "/home" },
    {id: 1, title: "9块9包邮", path: "/nine" },
    {id: 2, title: "超值大额券", path: "/supervalue" },
    {id: 3, title: "降温急救穿搭", path: "/cooling" },
  ])


  
  const currentIndex = ref(0)

  // 监听路由的变化
  watch(()=>router.currentRoute.value, (newRouter, oldRouter)=>{
    let nav = navLists.find(( item ) => item.path === newRouter.fullPath)
    if(nav && nav.length){
      currentIndex.value = nav.id
    }
  })


  const navToPath = (item, index) => {
    router.push({ path: item.path })
    currentIndex.value = item.id
  }
</script>

<style lang="less" scoped>
  @import url(@/assets/css/index.less);

  .nav {
    .contentArea();
    display: flex;

    height: 46px;
    line-height: 46px;
    color: #FFF;

    .item {
      width: 160px;
      text-align: center;
      cursor: pointer;

      &:first-of-type {
        width: 220px;
      }

      &.active, &:hover {
        background-color: #fee44e;
        color: #43200c;
      }
    }
  }
</style>
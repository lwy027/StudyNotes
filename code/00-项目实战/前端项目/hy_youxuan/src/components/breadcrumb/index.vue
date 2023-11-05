<template>
    <div class="breadcrumb">
        <template v-for="(item, index) in breadcrumds" :key="item.title">
            <span :class="['title', index===0 ?  'first' : '']" @click="titleClick(item, index)">{{item.title}}</span>
            <span v-if="index !== breadcrumds.length -1 " class="line"> > </span>
        </template>
    </div>
</template>

<script setup>
import { useRouter  } from 'vue-router'
const props = defineProps({
  breadcrumds: {
      type: Array,
      default: function() {
          return []
      }
  }
})

const router = useRouter()

const titleClick = (item, index) => {
    router.push({
        path: "/home",
        query: {}
    })
}

</script>

<style lang="less" scoped>
    .breadcrumb{
        height: 56px;
        padding: 0 32px;
        background-color: white;
        color: #333;
        font-size: 18px;
        font-weight: 400;
        line-height: 56px;
       
        .first{
            cursor: pointer;
            &:hover{
                color: @linkColor;
            }
        }
        .line{
            margin: 0 2px;
        }
    }
</style>

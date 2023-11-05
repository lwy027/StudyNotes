<template>
    <div class="category-bar">
        <div class="l-title">
            分类：
        </div>
        <div class="r-category">
            <template v-for="(item) in categories" :key="item.id">
                <div :class="['item', activeId === item.id ? 'active': '']"
                    @click="handleItemClick(item)"
                >
                    <img :src="item.imageUrl" alt="">
                    <span>{{item.title}}</span>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  categories: {
      type: Array,
      default: function() {
          return []
      }
  },
  defaultActiveId: {
    type: Number,
    default: 0
  },
})

// data
const activeId = ref(props.defaultActiveId)

// watch
watch(()=> props.defaultActiveId, (newActiveId, oldActiveId) => {
    activeId.value = newActiveId
})

const emit = defineEmits(['cateItemClick'])

const handleItemClick = (item) => {
    emit('cateItemClick', item)
}

</script>

<style lang="less" scoped>
    .category-bar{
        margin-top: 16px;
        margin-bottom: 8px;
        height: 112px;
        width: 100%;
        background-color: white;

        display: flex;
        flex-direction: row;
        .l-title{
            padding: 20px 33px;
            font-size: 14px;
            color: #43240c;
        }
        .r-category{
            display: flex;
            flex-direction: row;
            align-items: center;
            .item{
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-right: 30px;
                cursor: pointer;
                img{
                    width: 41px;
                    height: 41px;
                    margin: 0 10px 10px 0;
                    transition: all 0.4s linear;
                }
                span{
                    font-size: 14px;
                    text-align: center;
                    white-space: nowrap;
                    color: #877a73;
                    margin-left: -10px;
                    
                    
                }
                &:hover{
                    span{
                        color: @linkColor;
                    }
                    img{
                        transform: translateY(-4px);
                    }
                }
                 
            }
            .item.active{
                span{
                    color: @linkColor;
                }
            }
        }
    }
</style>

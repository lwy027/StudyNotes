<template>
    <div v-if="subTitles.length"  class="tab-bar">
        <ul class="u-bar">
            <template v-for="(item) in subTitles" :key="item.id">
                <li :class="['item', activeId === item.id ? 'active': '' ]"
                    @click="handleTitleClick(item)"
                >
                    {{item.name}}
                </li>
            </template>
        </ul>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
// props
const props = defineProps({
  subTitles: {
    type: Array,
    default: function(){
      return []
    }
  },
  defaultActiveId: { 
    type: Number,
    default: 0
  },
  unActiveColor: {
      type: String,
      default: '#43240c'
  },
  activeColor: {
      type: String,
      default: '#43240c'
  }
})
// emit
const emit = defineEmits(['tabBarClick'])

// data
const activeId = ref(props.defaultActiveId)

// watch
watch(()=> props.defaultActiveId, (newActiveId, oldActiveId) => {
    activeId.value = newActiveId
})

// methods
const handleTitleClick = (item) => {
    activeId.value = item.id
    emit('tabBarClick', item)
}

</script>

<style lang="less" scoped>
    .tab-bar{
        height: 56px;
        background-color: white;
        ul{
            margin: 0;
            padding: 0;
            list-style: none;

            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .item{
            height: 100%;
            line-height: 56px;

            margin: 0 0 0 16px;
            padding: 0 17px;
            font-size: 18px;
            // font-weight: 500;
            text-align: center;
            line-height: 56px;
            color: v-bind(unActiveColor);
            cursor: pointer;
        }
        .item.active,
        .item:hover{
             color: v-bind(activeColor);
            box-shadow: inset 0 -3px 0 -1px currentColor;
        }

    }
</style>


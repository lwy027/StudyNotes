<template>
  <div class="category">
    <template v-for="(item, index) in categoryData" :key="index">
      <div class="item">
        <img class="icon" :src="loadIcon(item.iconImg)" alt="" />
        <div class="title">
          <template v-for="(iten, indey) in item.items" :key="indey">
            <span class="iten" @click="handleCateClick(iten)">{{ iten.type }}</span>
            <span v-if="indey < item.items.length - 1">/</span>
          </template>
        </div>

        <div class="item-panel">
          <template v-for="(cate) in item.items" :key="cate.iconImg">
            <div class="content">
            <div class="title">{{cate.type}}</div>
            <ul v-if="cate.categories.length">
              <template v-for="(category) in cate.categories" :key="category.id">
                <li @click="handleSubCateClick(cate.id,category)">{{category.title}}</li>
              </template>
            </ul>
            <ul v-else>
              <li>暂无数据</li>
            </ul>
          </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import categoryData from "@/assets/data/category";
import { useRouter } from 'vue-router'

const router = useRouter()

const loadIcon = (icon) => {
  return require("@/assets/image/" + icon)
}

const handleCateClick = (iten) => {
    router.push({
    path: "/category",
    query: {
      id: iten.id
    }
  })
}
const handleSubCateClick = (id, category) => {
  let categoryId = category.url.split('=')[1]
  router.push({
    path: "/category",
    query: {
      id: id,
      categoryId: categoryId
    }
  })
}
</script>

<style lang="less" scoped>
.category {
  width: 220px;
  background-color: #fcf9e3;

  .item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 41px;
    font-size: 15px;

    .icon {
      position: absolute;
      left: 45px;
    }

    .title {
      font-size: 14px;
      color:#43200c ;
      .iten:hover {
        text-decoration: underline;
        cursor: pointer;
        color: @linkColor;
      }
    }
  }
  .item:hover{
    background-color: white;
    .item-panel{
      display: inline-block;
    }
  }

  .item-panel{
    position: absolute;
    top: 0;
    right: -220px;
    width: 220px;
    background-color: white;
    z-index: 100;
    display: none;

    .content{
      padding: 15px 20px 0px 20px;
      color: #877a73;
      font-size: 13px;
      line-height: 30px;

      .title{
        color: #877a73;
        // cursor: pointer;
        border-bottom: 1px solid #e7e7ee;
      }
      ul{
        margin: 0;
        padding: 5px 0 0 0 ;
        list-style: none;
        opacity: .7;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        li{
          padding-right: 10px;
          cursor: pointer;
          &:hover{
            color: @linkColor;
          }
        }
      }
    }
  }
}
</style>

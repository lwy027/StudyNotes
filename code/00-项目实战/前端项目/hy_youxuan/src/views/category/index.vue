<template>
    <div class="category">
        <breadcrumb :breadcrumds="breadcrumds"></breadcrumb>
        <category-bar :categories="categories"
            :defaultActiveId="defaultActiveCategoryId"
            @cateItemClick="handleCateItemClick"
        >

        </category-bar>

        <tab-bar 
        activeColor="#ff5556"
        :defaultActiveId="defaultActiveId"
        :subTitles="subTitles"
        @tabBarClick="handleTabBarClick"
        ></tab-bar>
        <product-list :listData="columnDatas"></product-list>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCategoryData, getSubCategoryData } from '@/service/module/category'


import Breadcrumb from '@/components/breadcrumb/index.vue'
import CategoryBar from '@/components/category-bar/index.vue'
import TabBar from '@/components/tab-bar/index.vue'


import { ProductList } from '@/components/product-list'

const route = useRoute()
const id = route.query.id
const categoryId = route.query.categoryId
const breadcrumds = ref([])
const categories = ref([])

const defaultActiveCategoryId = ref(0)

const defaultActiveId = ref(0)
const subTitles = ref([])

const columnDatas = ref([])


onMounted(()=>{
    getCategoryData(id, 0).then((res)=>{
        if(!res.data){
            return
        }
        setBreadcrumds(res.data.category)
        setCategories(res.data.categories)
        setTitles(res.data.sortTypes)
        // 首页点击二级分类跳转进来，需要重新发起请求获取对应分类的数据
        if(categoryId){
            // 模拟点击了第一个分类
            if(res.data.categories.length){
                let category = res.data.categories.find((item)=>{
                    return item.url.split('=')[1] == categoryId 
                })
                if(category){
                    handleCateItemClick(category)
                }
                
            }
            
        } else {
            // 首页一级分类跳转进来
            setColumnDatas(res.data.items.list)
        }
    })
})

const setBreadcrumds = (category = {})=> {
    breadcrumds.value = [
        {
            title: '首页',
            path: '/home'
        },
        {
            title: category.name,
            path:''
        }
    ]
}

const setCategories = (categorys = [])=>{
    categories.value = categorys || []
    // 首页点击二级分类进来，需要高亮二级的类别
    if(categories.value.length && categoryId){
        defaultActiveCategoryId.value = categories.value[0].id
    }
}

const setTitles = (sortTypes = [])=>{
    subTitles.value = sortTypes.map((item)=>{
        return {
            id: item.sortType,
            name: item.name
        }
    })
    if(subTitles.value.length){
        defaultActiveId.value = subTitles.value[0].id
    }
    
}
const setColumnDatas = (list = [])=>{
    // id 排序
    columnDatas.value = list.sort((a, b)=>a.id -b.id)
    if(subTitles.value.length){
        console.log(subTitles.value[0])
        defaultActiveId.value = subTitles.value[0].id
    }
}



const handleTabBarClick = (item)=> {
    defaultActiveId.value = item.id
    if(item.name === '销量'){
        columnDatas.value = columnDatas.value.sort((a, b)=>{
            return b.saleNum - a.saleNum
        })
    } else if(item.name === '价格最低'){
        columnDatas.value = columnDatas.value.sort((a, b)=>{
            return a.price - b.price
        })
    } else {
          columnDatas.value = columnDatas.value.sort((a, b)=>{
            return a.id - b.id
        })
    }
}

const handleCateItemClick = (item)=>{
    // console.log(item)
    defaultActiveCategoryId.value = item.id
    // 发起网络请求
    let id = item.url.split('=')[1]
    getSubCategoryData(id, 0).then((res)=>{
        // 修改列表数据
        if(!res.data){
            return 
        }
        setColumnDatas(res.data.items.list)
    })
}


</script>

<style lang="less" scoped>
    .category{
        .contentArea();
    }
</style>


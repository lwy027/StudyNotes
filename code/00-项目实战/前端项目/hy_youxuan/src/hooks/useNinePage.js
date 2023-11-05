import { ref, onMounted } from 'vue';
import { getSubColumns, getSubColumnItems } from '@/service/module/nine'

export default function(id) {

    const subTitles = ref([])
    const defaultActiveId = ref(0)
    const columnDatas = ref([])

    onMounted(() => {
        getSubColumns(id).then((res)=>{
            // console.log(res)
            subTitles.value = res.data.subColumns
            if(subTitles.value.length){
                let firstColumn = res.data.subColumns[0]
                defaultActiveId.value = firstColumn.id
                // 初始化列表的数据
                getColumnData(firstColumn.id, 0)
            }
        })
    })

    const getColumnData = (id, start) => {
        getSubColumnItems(id, start).then((res) => {
            console.log(res.data.list)
            if(start){
            columnDatas.value = [...columnDatas.value, ...res.data.list]
            } else {
            columnDatas.value = res.data.list || []
            }
            
        })
    }

    const handleTabBarClick = (item) => {
        // 初始化列表的数据
        //  columnDatas.value = []
        defaultActiveId.value = item.id
        getColumnData(item.id, 0)
    }

    const handleLoadMore = () => {
        getColumnData(defaultActiveId.value, columnDatas.value.length)
    }

  return {
    subTitles, 
    defaultActiveId, 
    columnDatas, 

    handleTabBarClick,
    handleLoadMore
  }
}
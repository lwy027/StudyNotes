import { defineStore } from "pinia";
import { getHotSuggestsData, getCategoriesData, getHouselistData } from "../../services/modules/home";
import { ref } from "vue";
import { formatMonthDay } from "../../utils/format_data"


const useHomeStore = defineStore('home', () => {

  //热门建议
  const hotSuggests = ref([])
  //推荐类别
  const categories = ref([])
  //房间列表数据
  const houseList = ref([])
  //当前页
  const currentPage = ref(1)
  const nowDate = new Date()
  const newDate = new Date()
  newDate.setDate(nowDate.getDate() + 1)

  const startDate = ref(formatMonthDay(nowDate))
  const endDate = ref(formatMonthDay(newDate))


  //请求热门建议数据
  async function fetchHotSuggestsDate() {
    const res = await getHotSuggestsData()
    hotSuggests.value = res.data
  }
  //请求推荐类别数据
  async function fetchCategoriesData() {
    const res = await getCategoriesData()
    categories.value = res.data
  }

  //获取房间列表
  async function fetchHouseListdata() {
    const res = await getHouselistData(currentPage.value)
    houseList.value.push(...res.data)
    currentPage.value++

  }


  return {
    hotSuggests,
    categories,
    houseList,
    startDate,
    endDate,
    fetchHotSuggestsDate,
    fetchCategoriesData,
    fetchHouseListdata,
  }
})

export default useHomeStore
import { defineStore } from "pinia";
import { getCityAll } from "../../services/index"
import { reactive, ref } from "vue"


const useCityStore = defineStore('city', () => {
  // 城市数据
  const Allcity = ref()

  //记录当前城市名称
  const currentCity = reactive({
    cityName: "广州"
  })

  getCityAll().then(res => {
    Allcity.value = res.data
  })


  return {
    Allcity,
    currentCity
  }



})

export default useCityStore

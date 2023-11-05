<script setup>
import { useRouter } from 'vue-router';
import useCityStore from '../../../stores/modules/city';
import useHomeStore from "../../../stores/modules/home"
import { getDiffDays, formatMonthDay } from "../../../utils/format_data"
import hotSuggest from "./home-hot-suggestion.vue"
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

const router = useRouter()

const cityClick = () => {

  router.push("/city")
}

// 获取当前位置
const getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition((res) => {
    console.log('获取位置成功', res)
  }, (err) => {
    console.log("获取位置失败", err)
  }, {
    timeout: 5000
  })
}

//获取当前城市
const cityStore = useCityStore()

//定义日期

////控制日历的展示和隐藏
const showCalendar = ref(false)

//事件差
const stayCount = ref(1)


//获取热门城市建议

const homeStore = useHomeStore()

const { startDate, endDate } = storeToRefs(homeStore)
// let startDate = computed(() => {
//   return homeStore.startDate
// })
// let endDate = computed(() => {
//   return homeStore.endDate
// })

//控制日历操作
const onConfirm = (value) => {
  startDate.value = formatMonthDay(value[0])
  endDate.value = formatMonthDay(value[1])
  stayCount.value = getDiffDays(value[0], value[1])
  showCalendar.value = false
}

homeStore.fetchHotSuggestsDate()




</script>

<template>
  <div class="home-search-box">
    <!-- 位置信息 -->
    <div class="position">
      <div class="city" @click="cityClick">{{ cityStore.currentCity.cityName }} </div>
      <div class="myPosition" @click="getCurrentLocation">
        <span class="text">我的位置</span>
        <img src="../../../assets/img/home/icon_location.png" alt="">
      </div>
    </div>
    <!-- 日期 -->
    <div class="house-data" @click="showCalendar = true">
      <div class="data-left">
        <span>入住</span>
        <p class="data">{{ startDate }} </p>
      </div>
      <p class="time">共{{ stayCount }} 晚</p>
      <div class="data-right">
        <span>离店</span>
        <p class="data">{{ endDate }} </p>
      </div>

    </div>
    <van-calendar v-model:show="showCalendar" color="#ee0a24" type="range" @confirm="onConfirm" />


    <!-- 热门建议 -->
    <hot-suggest :hotCitySuggest="homeStore.hotSuggests"></hot-suggest>

    <!-- 开始搜索 -->
    <van-button type="primary" size="large" block color="#ff9854" @click="queryData()">开始搜索</van-button>




  </div>
</template>

<style lang="less" scoped>
.home-search-box {
  color: #666;

  .position {
    display: flex;
    justify-content: space-between;
    padding: 15px;

  }

  .myPosition {
    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }

    .text {
      font-size: 14px;
    }
  }


  .house-data {
    display: flex;
    justify-content: space-around;
    margin-left: -30px;


    span {
      font-size: 12px;
    }

    .data {
      color: #333;
      margin-top: 3px;

    }

    .time {
      font-size: 12px;
    }
  }

  .van-button {
    width: 90%;
    height: 40px;
    margin: 0 auto;
    margin-top: 150px;
    border-radius: 30px;
    background-image: var(--theme-linear-gradient)
  }


}
</style>
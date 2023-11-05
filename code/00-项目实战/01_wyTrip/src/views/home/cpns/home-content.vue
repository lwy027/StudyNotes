<script setup>
import { useRouter } from 'vue-router';
import useHomeStore from '../../../stores/modules/home';
import useScroll from "../../../hooks/useScroll"
import { ref, watch } from 'vue';
const homeStore = useHomeStore()

const router = useRouter()

//评分
const { isReach } = useScroll()

homeStore.fetchHouseListdata()
watch(isReach, (newvalue, old) => {
  // console.log(newvalue, old)
  if (newvalue) {
    homeStore.fetchHouseListdata().then(() => {
      isReach.value = false
    })
  }
})

//点击跳转到detail页面
const entrydetails = (houseId) => {
  // console.log(houseId)
  router.push("/details/" + houseId)
}
</script>

<template>
  <div class="home-content">
    <h2>热门精选</h2>
    <div class="content">
      <template v-for="(item, index) in homeStore.houseList">
        <div @click="entrydetails(item.data.houseId)">
          <div class="box" v-if="item.discoveryContentType === 9">
            <div class="item">
              <img :src="item.data.image.url" alt="">
            </div>
            <div class="text">
              <p class="summary">{{ item.data.summaryText }} </p>
              <p class="housename">{{ item.data.houseName }} </p>
              <van-rate :model-value="Number(item.data.commentScore)" color="#fff" readonly allow-half />
            </div>
          </div>
          <div class="box2" v-if="item.discoveryContentType === 3">
            <div class="item">
              <img :src="item.data.image.url" alt="">
            </div>
            <div class="text">
              <img src="../../../assets/img/home/location.png" alt="">
              <span>{{ item.data.location }} </span>
              <p class="housename">{{ item.data.houseName }} </p>
              <p class="summary">{{ item.data.summaryText }} </p>
              <span class="new">{{ "￥" + item.data.finalPrice }} </span>
              <span class="old">{{ item.data.productPrice }} </span>
              <span class="sub">{{ item.data.priceTipBadge?.text }} </span>
            </div>
          </div>
        </div>

      </template>
      <!-- <button @click="changepage">加载更多</button> -->
    </div>

  </div>
</template>

<style lang="less" scoped>
.home-content {
  h2 {
    margin-top: 20px;
    margin-left: 10px;
  }

  p {
    margin: 5px;
  }

  .content {

    display: flex;
    flex-wrap: wrap;

    .box {
      position: relative;
      width: 186px;
      height: 248px;
      margin-left: 10px;
      margin-top: 10px;

      .item {

        border-radius: 50% !important;

        img {
          width: 186px;
          height: 248px;
        }
      }

      .text {
        position: absolute;
        bottom: 0px;
        font-size: 13px;
        color: #fff;
        padding: 10px;

        .housename {
          width: 164px;
          height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .box2 {
      width: 186px;
      height: 248px;
      margin-left: 10px;
      margin-top: 10px;


      .item {
        img {
          width: 186px;
          height: 124px;
        }

        border-radius: 20px;

      }

      .text {
        width: 186px;
        height: 133px;
        font-size: 13px;

        padding: 10px;

        img {
          width: 13px;
          height: 13px;
        }

        .old {
          text-decoration: line-through;
        }

        .new {
          color: var(--primary-color);
        }

        .sub {
          display: inline-block;
          background-color: #f33;
          color: white;
          border-radius: 15px;
          padding: 0 5px;
        }

      }


    }



  }

}
</style>
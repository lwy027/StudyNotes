<script setup>
import { useRoute, useRouter } from "vue-router";
import { getDetailInfos } from "../../services/modules/home";
import { ref, computed } from "vue";

import detailSwipe from "./cpns/detail-01-swipe.vue";
import detailInfos from "./cpns/detail-02-infos.vue";
import detailFacility from "./cpns/detail-03-facility.vue";
import detailIntro from "./cpns/deatil-04-landlord.vue";
import detailComment from "./cpns/detail-05-comment.vue";
import DetailNotice from "./cpns/detail-06-notice.vue";
import DetailMap from "./cpns/detail-07-map.vue";
import DetailIntro from "./cpns/detail-08-intro.vue";
import useScroll from "../../hooks/useScroll";

const route = useRoute();
const router = useRouter();

const houseId = route.params.id;
const detailInfosDate = ref([]);

getDetailInfos(houseId).then((res) => {
  detailInfosDate.value = res?.data;
});

const mainPart = computed(() => detailInfosDate?.value.mainPart);

const detailref = ref();

const tabbar = ref();
const onClickLeft = () => {
  router.back();
};

const { scrollTop } = useScroll(detailref.value);
const scroll = computed(() => {
  console.log(scroll.value);
  return scrollTop.value >= 300;
});

let active = ref();

const getSectionRef = (value) => {
  console.log(value);
};

const clickTab = (index) => {
  console.log(detailref.value.$el);
  detailref.value.scrollTo({
    top: (active.value + 1) * 200,
  });
};
</script>

<template>
  <div class="details" ref="detailref">
    <van-tabs
      v-model:active="active"
      v-if="scroll"
      ref="tabbar"
      class="tabbar"
      @click="clickTab(index)"
    >
      <template v-for="(item, index) in [1, 2, 3, 4, 5]">
        <van-tab :title="String(item)"></van-tab>
      </template>
    </van-tabs>
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 轮播 -->
    <detailSwipe :getImgData="mainPart?.topModule?.housePicture.housePics" />
    <!-- 信息 -->
    <detailInfos :getinfos="mainPart?.topModule" />
    <!-- 房屋设施 -->
    <detail-facility
      :ref="getSectionRef(value)"
      :facilityData="mainPart?.dynamicModule.facilityModule.houseFacility"
    />
    <!-- 房东介绍 -->
    <detailIntro
      :landlord="mainPart?.dynamicModule.landlordModule"
      :ref="getSectionRef(value)"
    />
    <!-- 热门评论 -->
    <detail-comment
      name="评论"
      :ref="getSectionRef(value)"
      :comment="mainPart?.dynamicModule.commentModule"
    />
    <detail-notice
      name="须知"
      :ref="getSectionRef(value)"
      :order-rules="mainPart?.dynamicModule.rulesModule.orderRules"
    />
    <detail-map
      name="周边"
      :ref="getSectionRef(value)"
      :position="mainPart?.dynamicModule.positionModule"
    />
    <detail-intro :price-intro="mainPart?.introductionModule" />
  </div>
</template>

<style lang="less" scoped>
.tabbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
</style>

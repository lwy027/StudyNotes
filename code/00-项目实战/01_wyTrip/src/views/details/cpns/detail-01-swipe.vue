<script setup>
const props = defineProps({
  getImgData: {
    type: Array,
    default: () => []
  }
})

const swipeGroup = {}

for (const item of props.getImgData) {
  let valueArray = swipeGroup[item?.enumPictureCategory]
  if (!valueArray) {
    valueArray = []
    swipeGroup[item.enumPictureCategory] = valueArray
  }
  valueArray.push(item)
}
console.log(swipeGroup)

const getName = (name) => {
  return name.replace("：", "").replace("【", "").replace("】", "")
}

const getCategoryIndex = (item) => {
  const valueArray = swipeGroup[item.enumPictureCategory] //3:['zazaz']
  return valueArray.findIndex(data => data === item) + 1
}

</script>

<template>
  <div class="detail-swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in getImgData">
        <van-swipe-item class="item">
          <img :src="item.url" alt="">
        </van-swipe-item>

      </template>
      <template #indicator="{ active, total }">
        <div class="custom-indicator">

          <template v-for="(value, key, index) in swipeGroup">
            <span class="item" :class="{ active: getImgData[active]?.enumPictureCategory == key }">
              <span>{{ getName(value[0].title)
              }} </span>
              <span class="count" v-if="getImgData[active]?.enumPictureCategory == key">
                {{ getCategoryIndex(getImgData[active]) }}/{{ value.length }}
              </span>
            </span>
          </template>

        </div>

      </template>
    </van-swipe>
  </div>
</template>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}

.item {
  img {
    width: 423px;
    height: 282px;
  }
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);

  .item {

    padding: 0px 3px;

    &.active {
      background-color: #fff;
      color: #333;
      border-radius: 5px;
    }
  }
}
</style>
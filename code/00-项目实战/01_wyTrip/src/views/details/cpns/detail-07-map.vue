<script setup>
import deatailSection from "../../../components/detail-section/detail-section.vue"
const props = defineProps({
  position: {
    type: Object,
    default: () => ({})
  }
})

</script>

<template>
  <div class="map">
    <detail-section title="位置周边" more-text="查看更多周边信息">
      <div class="baidu" ref="mapRef"></div>
    </detail-section>
  </div>
</template>

<style lang="less" scoped>
.baidu {
  height: 250px;
}
</style>
<script setup>
import itemCpn from './itemCpn.vue'

defineProps({
  houseList: []
})



</script>

<template>
  <div>
    <!-- <h5>{{ houseList }} </h5> -->

    <div class="item">
      <template v-for="item in houseList" :key="item.id">

        <itemCpn :picture_url="item.picture_url" :messages="item.verify_info.messages" :name="item.name"
          :price="item.price" :content="item.bottom_info.content"></itemCpn>


      </template>

    </div>
  </div>
</template>

<style scoped>
.item {
  width: 930px;
  height: 500px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
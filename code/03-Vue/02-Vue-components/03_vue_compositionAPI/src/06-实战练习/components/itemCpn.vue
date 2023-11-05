<script setup>


defineProps({
  picture_url: '',
  messages: '',
  name: '',
  price: Number,
  content: ''
})



</script>

<template>
  <div class="mian">
    <div class="container">
      <img :src="picture_url" alt="">
      <div class="buttom">


        <span>{{ message }} </span>

        <span class="name">{{ name }} </span>
        <span> {{ price }} </span>
        <span>{{ content }} </span>
      </div>

    </div>
  </div>
</template>

<style  scoped>
.container img {
  width: 300px;
  height: 200px;

}

.container {
  width: 300px;
  height: 310px;
}



span {
  display: block;
  padding: 3px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: -5px;
}

.name {

  height: 40px;
  white-space: wrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
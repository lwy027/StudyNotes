<template>
    <img class="back-top" src="~@/assets/image/back_top.png" @click="backTop"/>
</template>

<script setup>

    const backTop = ()=>{
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
</script>

<style lang="less" scoped>
.back-top{
    position: fixed;
    bottom: 260px;
    right: 40px;
    width: 60px;
    height: 60px;
    cursor: pointer;
}
</style>
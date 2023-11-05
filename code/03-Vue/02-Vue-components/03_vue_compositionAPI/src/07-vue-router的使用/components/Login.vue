<script setup>



const setToken = () => {
  localStorage.setItem("token", "lwy")
}
const removeToken = () => {
  localStorage.removeItem("token")
}
</script>

<template>
  <div>
    <h2>登录界面 </h2>

    <button @click="setToken">登录</button>
    <button @click="removeToken">退出登录</button>
  </div>
</template>

<style lang="less" scoped></style>
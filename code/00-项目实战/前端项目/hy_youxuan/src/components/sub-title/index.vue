<template>
    <div class="sub-title">
        <h2>{{title}}</h2>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: String
    })
</script>

<style lang="less" scoped>
.sub-title{
    height: 56px;
    width: 100%;
    // padding: 0 30px;
    background: #fef9dd;
    h2{
        color: #43200c;
        margin: 0;
        padding: 0 30px;
        line-height: 56px;
        font-size: 24px;
        font-weight: 700;
        line-height: 56px;
    }
}
</style>
<script setup>

defineProps({
  getinfos: {
    type: Object,
    default: () => ({})
  }
})

</script>

<template>
  <div class="detail-infos">

    <div class="title">
      <h2>{{ getinfos.houseName }} </h2>
    </div>
    <div class="tags">
      <template v-for="(item, index) in getinfos.houseTags" :key="index">
        <div class="item">
          <span :style="{ color: item.tagText?.color, backgroundColor: item.tagText?.backgroundColor?.color }">
            {{ item?.tagText?.text }}
          </span>
        </div>
      </template>
    </div>
    <div class="comment extra">
      <div class="left">
        <span class="score">{{ getinfos.commentBrief?.overall }} </span>
        <span class="title">{{ getinfos.commentBrief?.scoreTitle }} </span>
        <span class="brief">{{ getinfos.commentBrief?.commentBrief }} </span>
      </div>
      <div class="right">
        <span class="count">
          {{ getinfos.commentBrief?.totalCount }}条评论
          <van-icon name="arrow" />
        </span>
      </div>
    </div>
    <div class="position extra">
      <div class="left ">
        <span class="adress">
          {{ getinfos?.nearByPosition?.address }}
        </span>
      </div>
      <div class="right">
        地图·周边
        <van-icon name="arrow" />
      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>
.detail-infos {
  width: 423px;
  height: 235px;
}

.title {
  margin-top: 20px;
  text-indent: 2em;
  margin: 10px;
}

.tags {
  display: flex;
  margin: 10px 10px;
  font-size: 14px;

  .item {
    margin-left: 5px;
    color: rgb(255, 150, 69);
    height: 17px;
    background-color: rgba(255, 150, 69, 0.15);
    ;
  }

}

.extra {
  display: flex;
  justify-content: space-between;
  margin-left: 30px;
  background-color: #f5f7fa;
  padding: 10px;

  .left {
    .score {
      font-size: 20px;
      font-weight: 600;
    }

    .title {
      font-weight: 600;
    }

    .brief {
      color: #666;
    }

    span {
      margin-left: 6px;
    }
  }

  .right {
    color: var(--primary-color);
  }
}

.position {
  margin-top: 10px;
}

.adress {
  font-weight: 600;
}
</style>
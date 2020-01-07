<template>
    <div class="container">
      <!-- 左边侧 -->
      <!-- <div class="left"></div> -->
      <postaside/>
      <!-- 右边侧 -->
      <div class="right">
        <!-- 头部 -->
        <!-- <div class="top"></div> -->
        <postheader/>
        <!-- 主题部 -->
        <!-- <div class="main"></div> -->
        <postmain/>
        <!-- 分页器 -->
        <div></div>
      </div>
    </div>
</template>

<script>
import postaside from '@/components/post/postaside'
import postheader from '@/components/post/postheader'
import postmain from '@/components/post/postmian'
export default {
components:{
  postaside,postheader,postmain
}
}
</script>

<style lang="less" scoped>
.container{
  display:flex;
  justify-content: space-between;
  width:1000px;
  margin:20px auto 0;
}
.right{
  width: 700px;
  // background:pink
}
</style>
<template>
  <div class='container'>
    <!-- 走马灯 -->
    <el-carousel :interval="2000"  arrow="always">
      <el-carousel-item v-for="(item,index) in banner" :key="index">
       <div class='photo' 
       :style="`background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;`"></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data(){
    return{
      banner:[]
    }
  },
  mounted(){
    this.$axios({
      url:'/scenics/banners',
    }).then(res=>{
      // console.log(res)
      let {data}=res.data
      // console.log(data)
      this.banner=data
    }).catch(err=>{
      console.log(err)
    })
  }
};
</script>

<style lang='less' scoped>
.container{
  min-width:1000px;
  margin:0 auto;
  position:relative
}
/deep/.el-carousel__container{
  height:700px
}
.photo{
  width:100%;
  height:100%
}
</style>

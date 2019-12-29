<template>
  <div class="container">
    <div>
      <div class="title">
        <span v-for='(item,index) in arr' :key='index'
        @click='tabControl(index)' 
        :class='{active:current===index}'>{{item}}</span>
      </div>
      <div class='login' v-show='current===0'>登陆页</div>
      <div class="registy" v-show="current===1">注册页</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: ["登陆", "注册"],
      current:0
    };
  },
  methods:{
    tabControl(index){
      this.current=index
    }
  }
};
</script>

<style lang='less' scoped>
.container {
  background: url("http://157.122.54.189:9095/assets/images/th03.jfif")
    no-repeat center 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 1000px;
  height: 700px;
}
.title {
  background-color: #ece4e4;
  > span {
    display: inline-block;
    width: 160px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    color: rgb(31, 29, 29);
  }
}
.login,.registy{
  width:inherit;
  height:300px;
  background-color:#fff
}
.active{
  background-color:#fff;
  border-top:rgb(241, 70, 2) !important;
  color:rgb(241, 70, 2)!important
}
</style>
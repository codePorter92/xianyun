<template>
  <div class="container">
    <div>
      <div class="title">
        <span v-for='(item,index) in arr' :key='index'
        @click='tabControl(index)' 
        :class='{active:current===index}'>{{item}}</span>
      </div>
      <div class='login' v-show='current===0'>
        <loginPage/>
      </div>
      <div class="registy" v-show="current===1">
        <registyPage/>
      </div>
    </div>
  </div>
</template>

<script>
import loginPage from '@/components/user/loginForm.vue'
import registyPage from '~/components/user/registyForm.vue'
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
  },
  components:{
    registyPage,loginPage
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
  height: 800px;
}
.title {
  background-color: #ece4e4;
  > span {
    display: inline-block;
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    color: rgb(31, 29, 29);
  }
}
.login,.registy{
  width:400px;
  background-color:#fff;
  display:flex;
  justify-content: center;
  align-items: center;
  padding-top:10px
}
.active{
  background-color:#fff;
  border-top:2px solid rgb(241, 70, 2) !important;
  color:rgb(241, 70, 2)!important
}
</style>
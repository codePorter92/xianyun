<template>
  <div class="postaside">
    <div class="big" @mouseleave="hiddenlist">
      <div v-for="(item,index) in cityArr" 
      :key="index" 
      @mouseenter="handlelist(index)"
      >
        <el-row type="flex" justify="space-between" align="middle" class="eachrow" :class="{'active':current===index}">
          <span>{{item.type}}</span>
          <span class="el-icon-arrow-right"></span>
        </el-row>
        <div class="list" v-show="current===index">
          <el-row v-for="(city,index) in item.children" :key="index" class="children">
            <el-col :span="2" style="font-style:italic;font-size:18px;color:#ffa500">{{index+1}}</el-col>
            <el-col :span="4" style="color:#ffa500">{{city.city}}</el-col>
            <el-col :span="18" >{{city.desc}}</el-col>
          </el-row>
        </div>
      </div>
    </div>

    <!-- 推荐城市 -->
    <div class="recomend">
      <h3 class="recomendheader">推荐城市</h3>
      <div class="recomendcity">
        <img src="http://localhost:1337/assets/images/pic_sea.jpeg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    let res = await this.$axios({
      url: "/posts/cities"
    });
    // console.log(res);
    this.cityArr=res.data.data
  },
  data() {
    return {
      isshow: false,
      current:'',
      cityArr:[]
    };
  },
  methods:{
      handlelist(index){
          console.log(111)
          this.current=index
      },
      hiddenlist(){
          this.current=''
      }
  }
};
</script>

<style lang="less" scoped>
.postaside {
  width: 260px;
  .eachrow {
    height: 41px;
    padding: 0 20px;
    font-size: 14px;
    border: 1px solid #dddddd;
  }
}
.list {
  position: absolute;
  top: 0;
  left: 260px;
  width: 300px;
  height: 190px;
  //   display: none;
  border: 1px solid #dddddd;
  background-color: #fff;
  // border-left: 1px solid transparent;
  padding: 10px;
  font-size: 16px;
  z-index: 999;
}
.big {
  position: relative;
}
.children{
    width: 300px;
    margin-bottom: 16px;
    color:rgb(158, 152, 152);
    font-size:15px;
    cursor: pointer;
    // 省略号
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
// 样式变化
.active{
    color:#ffa500;
    border-right:none;
}
.recomend {
  width: 260px;
  margin-top: 20px;
  .recomendheader {
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .recomendcity {
    margin-top: 15px;
    img {
      width: 100%;
    }
  }
}
</style>
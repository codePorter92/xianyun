<template>
  <div class="hotel-index">
    <hotelSearch/>
    <el-row type="flex" class="nav">
      <div class="left">
        <el-row type="flex" style="margin-bottom:20px">
          <el-col :span="3">区域：</el-col>
          <el-col>
            <div>
              <span class="allZone">全部</span>
              <span>
                <nuxt-link to="#" />镇兴路沿线
              </span>
            </div>
            <p>
              <i
                :class="['el-icon-d-arrow-right',{'arrow-right':isshow,'acitve':!isshow}]"
                @click="handleZone"
              ></i>
              等43个区域
            </p>
          </el-col>
        </el-row>
        <el-row type="flex" style="margin-bottom:20px">
          <el-col :span="3">攻略：</el-col>
          <el-col>北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都，景点以故宫为中心向四处辐射，地铁便宜通畅，而且覆盖绝大多数景点。由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="3">均价：</el-col>
          <el-col class="iconfont" :span="6">
            <i class="icon-huangguan"></i>
            <i class="icon-huangguan"></i>
            <i class="icon-huangguan"></i>
            <span>￥332</span>
          </el-col>
          <el-col class="iconfont" :span="6">
            <i class="icon-huangguan"></i>
            <i class="icon-huangguan"></i>
            <i class="icon-huangguan"></i>
            <i class="icon-huangguan"></i>
            <span>￥521</span>
          </el-col>
          <el-col class="iconfont" :span="7">
            <i class="icon-huangguan"></i>
            <i class="icon-huangguan"></i>
            <i class="icon-huangguan"></i>
            <i class="icon-huangguan"></i>
            <i class="icon-huangguan"></i>
            <span>￥768</span>
          </el-col>
        </el-row>
      </div>
      <!-- 地图容器 -->
      <div id="myMap" class="right"></div>
    </el-row>
    <!-- 酒店分类 -->
    <hotelCategory/>
    <!-- 酒店 -->
    <hotel/>
  </div>
</template>

<script>
import "@/assets/iconfont.css";
import hotel from "@/components/hotel/hotel"
import hotelSearch from "@/components/hotel/hotelSearch"
import hotelCategory from "@/components/hotel/hotelCategory"
export default {
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map("myMap");
    };
    let url =
      "https://webapi.amap.com/maps?v=1.4.15&key=546b8e253ddb612f80b5a39146804926&callback=onLoad";
    let jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  data() {
    return {
      isshow: true
    };
  },
  components:{
    hotel,hotelSearch,hotelCategory
  },
  methods: {
    handleZone() {
      this.isshow = !this.isshow;
    }
  }
};
</script>

<style lang="less" scoped>
.hotel-index {
  width: 1000px;
  margin: 20px auto;
}
.nav {
  height: 260px;
}
.left {
  width: 590px;
  padding-right: 10px;
  color: #666666;
  font-size: 14px;
}
.right {
  width: 420px;
  height: 260px;
}
.allZone {
  background-color: #eeeeee;
  border-radius: 4px;
}
.arrow-right {
  transform: rotate(90deg);
  color: #ff9900;
  transition: all 0.2s;
}
.acitve {
  transform: rotate(-90deg);
  color: #ff9900;
  transition: all 0.2s;
}
// 显示高度
.changeH {
  height: 20%;
}
// 封装函数样式
// .marginBt(){
//   margin-bottom:20px
// }
</style>
<template>
  <div class="hotel">
    <el-row type="flex" justify="space-between">
      <el-col class="hotelImage" :span="8">
        <img src="http://localhost:1337/assets/images/pic_sea.jpeg" />
      </el-col>
      <el-col :span="9" class="hotelValue">
        <h2>好来阁商务宾馆</h2>
        <p>
          <span>hao lai ge shang wu hotel</span>
          <span class="iconfont">
            <i class="icon-huangguan"></i>
            <i class="icon-huangguan"></i>
            <i class="icon-huangguan"></i>
          </span>
          <span>经济型</span>
        </p>
        <el-row class="pointline" type="flex">
          <!-- 评分星星 -->
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
          <span class="interval">
            <i class="orange">6</i>条评论
          </span>
          <span>
            <i class="orange">64</i>篇游记
          </span>
        </el-row>
        <el-row class="position">
          <i class="iconfont icon-zuobiao"></i>
          <span>位于：高淳县淳溪镇镇兴路118号(高淳县委党校对面)</span>
        </el-row>
      </el-col>
      <el-col :span="6" class="otherNet">
        <a href="https:/hotels.ctrip.com/hotel/694679.html" target="_blank">
          <el-row type="flex" justify="space-between">
            <el-col>携程</el-col>
            <el-col>
              <span class="price">￥129</span>起
              <i class="el-icon-arrow-right"></i>
            </el-col>
          </el-row>
        </a>
        <a href="https:/hotels.ctrip.com/hotel/694679.html" target="_blank">
          <el-row type="flex" justify="space-between">
            <el-col>艺龙</el-col>
            <el-col>
              <span class="price">￥38</span>起
              <i class="el-icon-arrow-right"></i>
            </el-col>
          </el-row>
        </a>
        <a href="https:/hotels.ctrip.com/hotel/694679.html" target="_blank">
          <el-row type="flex" justify="space-between">
            <el-col>Hotels.com</el-col>
            <el-col>
              <span class="price">￥119</span>起
              <i class="el-icon-arrow-right"></i>
            </el-col>
          </el-row>
        </a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    data(){
        return{
            value:3.7
        }
    }
};
</script>

<style lang="less" scoped>
.hotelImage {
  img {
    width: 100%;
  }
}
.hotelValue {
  h2 {
    font-weight: 300px;
    margin-bottom: 5px;
  }
  p {
    font-size: 16px;
    color: #999999;
  }
}
.mycolor {
  display: inline-block;
  font-size: 20px !important;
  // background-color:#ff9900;
}
.pointline {
  margin: 15px 0;
}
.point {
  font-size: 14px;
  color: #ff9900;
  padding-right: 20px;
}
.position {
  font-size: 14px;
  color: #666666;
}
.otherNet {
  padding-top: 30px;
  font-size: 14px;
  color: #999999;
  box-sizing: border-box;
  .el-row {
    padding: 10px 0;
    border-bottom: 1px solid #ededed;
  }
}
.price {
  color: #ff9900;
  font-size: 17px;
}
.orange{
   color: #ff9900; 
}
.interval{
    padding: 0 50px 0 30px;
}
</style>
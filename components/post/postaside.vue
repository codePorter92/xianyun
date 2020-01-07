<template>
  <div class="postaside">
    <div class="active">
      <el-row type="flex" justify="space-between" align="middle" class="eachrow">
        <span>热门城市</span>
        <span class="el-icon-arrow-right"></span>
      </el-row>
      <div class="list">
        <el-row>
          <el-col :span="2" style="font-style:italic;font-size:18px;color:#ffa500">1</el-col>
          <el-col :span="4" style="color:#ffa500">广州</el-col>
          <el-col :span="18">世界著名古都和现代化国际城市</el-col>
        </el-row>
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
  height: 220px;
  display: none;
  border: 1px solid #dddddd;
  background-color:#fff;
  // border-left: 1px solid transparent;
  padding: 10px;
  font-size: 16px;
  z-index: 999;
}
.active {
  position: relative;
}
.active:hover .eachrow + .list {
  display: block;
}
.recomend {
  width: 260px;
  margin-top:20px;
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
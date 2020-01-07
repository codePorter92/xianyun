<template>
  <div class="postheader">
    <el-input v-model="search" placeholder="请输入想去的地方，比如'广州'" class="input">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-row class="citys">
      <el-col :span="2">推荐：</el-col>
      <el-col :span="2" v-for="(city,index) in citys" :key="index" class="active">{{city}}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      citys: ["广州", "上海", "北京"]
    };
  }
};
</script>

<style lang="less" scoped>
.input {
  cursor: pointer;
  border: 4px solid #ffa500;
  outline: none;
  box-sizing: border-box
}
/deep/.el-button {
  background: transparent;
  .el-icon-search {
    font-size: 22px;
    font-weight: 600;
    color: #ffa500;
  }
}
.citys {
  cursor: pointer; 
  padding: 10px 0;
  font-size: 13px;
}
.active:hover{
    color:#ffa500;
    text-decoration: underline
}
</style>
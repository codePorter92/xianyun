<template>
  <div class="postheader">
    <el-input v-model="search" placeholder="请输入想去的地方，比如'广州'" class="input" @blur="getCityArticle">
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
      citys: ["广州", "上海", "北京"],
      oneCityArr: {}
    };
  },
  methods: {
    async getCityArticle() {
      if (!this.search) return;
      // 规范内容的情况
      let res = await this.getOneCityArticle(this.search);
      this.oneCityArr = res.data.data;
      // console.log(res.data.data)
      // this.$store.commit("post/sendArticleList", this.oneCityArr);
    },
    // 封装请求
    getOneCityArticle(id) {
      return this.$axios({
        url: "/posts",
        params: {
          city: id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.input {
  cursor: pointer;
  border: 4px solid #ffa500;
  outline: none;
  box-sizing: border-box;
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
.active:hover {
  color: #ffa500;
  text-decoration: underline;
}
</style>
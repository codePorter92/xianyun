<template>
  <div class="container">
    <!-- 左边侧 -->
    <!-- <div class="left"></div> -->
    <postaside @comeFromAside="recomendCity" />
    <!-- 右边侧 -->
    <div class="right">
      <!-- 头部 -->
      <el-input v-model.lazy="search" placeholder="请输入想去的地方，比如'广州'" class="input" @blur="getOneCityArticle">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-row class="citys">
        <el-col :span="2">推荐：</el-col>
        <el-col
          :span="2"
          v-for="(city,index) in citys"
          :key="index"
          class="active"
          @click.native="recomendCity(city)"
        >{{city}}</el-col>
      </el-row>
      <!-- 主题部 -->
      <!-- <div class="main"></div> -->
      <postmain :data="articlelist.data" />
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3,6,9,12]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="articlelist.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import postaside from "@/components/post/postaside";
import postmain from "@/components/post/postmian";
export default {
  async mounted() {
    let res = await this.getCityArticle();
    // console.log(res.data)
    this.articlelist = res.data;
  },

  watch: {
    search() {
      if (!this.search) {
        this.getCityArticle().then(res => {
       return this.articlelist = res.data;
        });
      }
      this.$axios({
        url: "/posts",
        params: {
          city: this.search,
          _limit: this.pageSize,
          _start: this.pageSize * (this.currentPage - 1)
        }
      }).then(res => {
        this.articlelist = res.data;
      });
    }
  },
  data() {
    return {
      articlelist: {},
      // 分页器
      currentPage: 1,
      pageSize: 3,
      // 头部
      search: "",
      citys: ["广州", "上海", "北京"]
    };
  },
  components: {
    postaside,
    postmain
  },
  methods: {
    // 分页器的两个函数
    async handleSizeChange(val) {
      this.pageSize = val;
      let res = await this.getCityArticle();
      this.articlelist = res.data;
    },
    async handleCurrentChange(val) {
      this.currentPage = val;
      let res = await this.getCityArticle();
      this.articlelist = res.data;
    },
    // 搜索框失焦函数
    getOneCityArticle() {
      if (!this.search) {
        this.getCityArticle().then(res => {
         return this.articlelist = res.data;
        });
      }
      this.$axios({
        url: "/posts",
        params: {
          city: this.search,
          _limit: this.pageSize,
          _start: this.pageSize * (this.currentPage - 1)
        }
      }).then(res => {
        this.articlelist = res.data;
      });
    },
    recomendCity(city) {
      this.search = city;
    },
    // 封装函数
    getCityArticle() {
      return this.$axios({
        url: "/posts",
        params: {
          _limit: this.pageSize,
          _start: this.pageSize * (this.currentPage - 1)
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 1000px;
  margin: 20px auto;
}
.right {
  width: 700px;
  // background:pink
}
.input {
  cursor: pointer;
  border: 4px solid #ffa500;
  outline: none;
  box-sizing: border-box;
}

/deep/.el-icon-search {
  font-size: 22px;
  font-weight: 600;
  color: #ffa500;
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
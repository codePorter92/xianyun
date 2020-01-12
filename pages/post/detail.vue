<template>
  <div class="detail">
    <!-- 面包屑 -->
    <el-row type="flex">
      <!-- 左页面 -->
      <el-col :span="15">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
          <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 文章详情 -->
        <detailArt :data="article" />
        <!-- 评论区 -->
        <comment />
      </el-col>
      <!-- 右页面 -->
      <el-col :span="8" :offset="1">
        <!-- 相关攻略 -->
        <strategy />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import detailArt from "@/components/post/detailArt"
import strategy from "@/components/post/detailStrategy"
import comment from "@/components/post/detailComment"
export default {
  data(){
    return{
      article:{}
    }
  },
  async mounted(){
    // // 获取该文章id值
    let {id}=this.$route.query
    let res =  await this.askForArticle(id)
    this.article=res.data.data[0]
  },
  components:{
    detailArt,strategy,comment
  },
  // 监听路由，传入文章信息
  watch:{
    async "$route"(){
      let {id}=this.$route.query
      let res =  await this.askForArticle(id)
      this.article=res.data.data[0]
    }
  },
  // 封装函数
  methods:{
    askForArticle(id){
       return this.$axios({
          url:"/posts",
          params:{
            id:id
          }
        })
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  width: 1000px;
  margin: 20px auto;
}
</style>
<template>
  <div class="comment">
    <p class="com-title">评论</p>
    <!-- 评论区 -->
    <p class="tipbox" v-if="isshow">{{`回复 @${replayName}`}}</p>
    <el-input
      class="input"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容"
      v-model="content"
    ></el-input>
    <!-- 照片墙 -->
    <el-row type="flex" justify="space-between" class="zone">
      <el-upload
        action="http://localhost:1337/upload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-success="handlePictureCardSuccess"
        :limit="3"
        name="files"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
      <!-- 按钮 -->
      <el-button type="primary" @click="subComment">提交</el-button>
    </el-row>
    <!-- 评论区 -->
    <commentZone :data="commentList" @writeReplay="writeReplay" />
    <!-- 添加分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import commentZone from "@/components/post/personComment";
export default {
  data() {
    return {
      content: "",
      commentList: [],
      articleId: 0,
      //分页器变量
      currentPage: 1,
      pageSize: 2,
      total: 0,
      //评论区变量
      dialogImageUrl: "",
      dialogVisible: false,
      //文件上传之后的图片地址列表
      images: [],
      //组件传回来之后的一些变量
      replayName: "",
      isshow: false,
      ReplayId: ""
    };
  },
  async mounted() {
    let res = await this.getCommentList();
    // console.log(res);
    // 把评论的值赋值给数组
    this.commentList = res.data.data;
    this.total = res.data.total;
  },
  components: {
    commentZone
  },
  methods: {
    getCommentList() {
      let { id } = this.$route.query;
      return this.$axios({
        url: "/posts/comments",
        params: {
          post: id,
          _limit: this.pageSize,
          _start: (this.currentPage - 1) * this.pageSize
        }
      });
    },
    // 组件反馈回来的信息
    async writeReplay(ID, name) {
      //   console.log("父组件",ID,name);
      this.replayName = name;
      this.isshow = true;
      this.ReplayId = ID;
      // window.scrollTo(0,0)
    },
    // 分页器的方法
    async handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.pageSize = val;
      let res = await this.getCommentList();
      // 把评论的值赋值给数组
      this.commentList = res.data.data;
    },
    async handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.currentPage = val;
      let res = await this.getCommentList();
      // 把评论的值赋值给数组
      this.commentList = res.data.data;
    },
    // 文件框的函数
    handlePictureCardPreview(file) {},
    handlePictureCardSuccess(response, file, fileList) {
      this.images = fileList.map(v => {
        let { url } = v.response[0];
        return url;
      });
    },
    // 提交内容
    async subComment() {
      //判断是否有token值
      let token = this.$store.state.user.userInfo.token;
      if (!token) {
        this.$message.warning("亲！请先登录");
        this.$route.push({ path: "/user/login" });
        return;
      }
      let res;
      if (!this.ReplayId) {
        res = await this.comment();
      } else {
        res = await this.comment(this.ReplayId);
        this.isshow=false
      }
      //   console.log(res);
      this.$message.success(res.data.message);
      this.content = "";
      // 刷新页面
      let result = await this.getCommentList();
      this.commentList = result.data.data;
      this.total = result.data.total;
    },
    // 封装文件上传函数
    comment(replayId) {
      let { id } = this.$route.query;
      if (!replayId) {
        return this.$axios({
          url: "/comments",
          method: "POST",
          headers: {
            Authorization: "Bearer " + this.$store.state.user.userInfo.token
          },
          data: {
            content: this.content,
            pics: this.images,
            post: id
          }
        });
      }
      //带回复id的
      return this.$axios({
        url: "/comments",
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        },
        data: {
          content: this.content,
          pics: this.images,
          post: id,
          follow: replayId
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.com-title {
  font-size: 18px;
  font-style: 400;
  margin-bottom: 20px;
}
.input {
  margin-bottom: 10px;
}
.zone {
  margin-bottom: 30px;
}
.el-button {
  width: 56px;
  height: 28px;
  padding: 0;
}
.tipbox {
  width: 200px;
  padding: 8px 20px;
  margin-bottom: 15px;
  font-size: 13px;
  color: #666666;
  background-color: #d1caca;
  border-radius: 8px;
}
</style>
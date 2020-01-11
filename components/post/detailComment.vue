<template>
  <div class="comment">
    <p class="com-title">评论</p>
    <!-- 评论区 -->
    <el-input
      class="input"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容"
      v-model="content"
    ></el-input>
    <!-- 照片墙 -->
    <el-row type="flex" justify="space-between" class="zone">
      <!-- <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog> -->
      <!-- 按钮 -->
      <el-button type="primary">提交</el-button>
    </el-row>
    <!-- 评论区 -->
    <commentZone/>
  </div>
</template>

<script>
import commentZone from "@/components/post/personComment"
export default {
    data(){
        return{
            content:''
        }
    },
    components:{
      commentZone
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
.zone{
    margin-bottom: 30px
}
.el-button{
    width: 56px;
    height: 28px;
    padding:0
}
</style>
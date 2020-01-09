<template>
  <div class="container">
    <el-row>
      <el-col :span="18">
        <h2>发表新攻略</h2>
        <el-row>分享你的个人游记,让更多人看到哦!</el-row>
        <!-- 输入框 -->
        <el-input placeholder></el-input>
        <!-- 富文本域 -->
        <VueEditor />
        <!-- 选择器提示框 -->
        <el-row>
          <span>选择城市：</span>
          <el-autocomplete
            class="inline-input"
            v-model="state2"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </el-row>
        <el-row>
          <el-button type="primary">发布</el-button>或者
          <span>保存到草稿</span>
        </el-row>
      </el-col>
      <el-col :span="6">
           <span>草稿箱</span> (2)
           <p>该功能<span>2020-01-09</span></p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入富文本域
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
export default {
  components: {
    VueEditor
  }
};
</script>

<style>
</style>
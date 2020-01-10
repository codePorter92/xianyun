<template>
  <div class="myarticle">
    <el-row type="flex" justify="space-between">
      <el-col :span="17">
        <h2 class="title">发表新攻略</h2>
        <el-row class="tip">分享你的个人游记,让更多人看到哦!</el-row>
        <!-- 输入框 -->
        <el-input placeholder="请输入你的标题" v-model="title" class="titleInput"></el-input>
        <!-- 富文本域 -->
        <VueEditor :config="config" ref="vueEditor" />
        <!-- 选择器提示框 -->
        <el-row class="cityselect">
          <span>选择城市&nbsp;&nbsp;&nbsp;</span>
          <el-autocomplete
            class="inline-input"
            v-model="city"
            :fetch-suggestions="querySearch"
            placeholder="请搜索游玩城市"
            :trigger-on-focus="false"
            @select="handleSelect"
            @blur="comfirmCity"
          ></el-autocomplete>
        </el-row>
        <el-row>
          <el-button @click="submitArticle" type="primary">发布</el-button>&nbsp;&nbsp;&nbsp;或者
          <span class="active" style="color:#ffa500;" @click="sendToDraft">保存到草稿</span>
        </el-row>
      </el-col>
      <el-col :span="5" class="box">
        <span>草稿箱 ({{$store.state.post.draftlist&&$store.state.post.draftlist.length}})</span>
        <ul>
          <li v-for="(draft , index) in $store.state.post.draftlist" :key="index">
            <span class="active" @click="recoverDraft(draft)">
              {{draft.title}}
              <i class="el-icon-edit"></i>
            </span>
            <p>{{draft.date}}</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入moment文档
import moment from "moment";
// 引入富文本域
import "quill/dist/quill.snow.css";
let VueEditor;

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  data() {
    return {
      title: "",
      // 文本域的内容
      config: {
        // 上传图片的配置
        uploadImage: {
          url: " http://localhost:1337/upload",
          name: "files",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
            console.log(res);
          }
        }
      },
      // 下拉框的情况
      citylist: [],
      city: "",
      cityId: ""
    };
  },
  components: {
    VueEditor
  },
  methods: {
    querySearch(queryString, cb) {
      // 对输入的数据发起请求
      if (!this.city) return;
      this.$store.dispatch("user/searchcity", this.city).then(res => {
        let result = res.data.data.map(v => {
          let { id, name } = v;
          return {
            value: name,
            id: id
          };
        });
        this.citylist = result.filter(v => {
          return v.value.indexOf(this.city) === 0;
        });
        cb(this.citylist);
      });
    },
    // 选中时触发的建议项，item为选中项
    handleSelect(item) {
      this.cityId = item.id;
    },
    // 当失焦时触发的事件
    comfirmCity() {},
    // 发布新增文章
    submitArticle() {
      if (!this.$store.state.user.userInfo.token) {
        this.$router.push({ path: "/user/login" });
        this.$message.warning("请先登录账号");
        return;
      }
      let data = this.Draft();
      console.log("data", data);
      let rules = {
        Title: {
          message: "标题不能为空",
          content: data.title
        },
        City: {
          message: "请选择城市",
          content: data.city
        }
      };
      let condition = true;
      Object.keys(rules).forEach(v => {
        if (!rules[v].content) {
          this.$message.warning(rules[v].message);
          condition = false;
        }
      });
      if (condition) {
        this.$store.dispatch("post/submitArticleSuc", data).then(res => {
          if (res) {
            this.$message.success("新增文章内容成功");
          }
        });
      }
    },
    // 放到草稿箱中去，放vuex中去
    sendToDraft() {
      let data = this.Draft();
      data = {
        date: moment(new Date()).format("YYYY-MM-DD"),
        ...data
      };
      this.$store.commit("post/draftstorege", data);
      // 长度发生变化
    },
    // 恢复数据
    recoverDraft(data) {
      this.city = data.city;
      this.title = data.title;
      //渲染富文本域
      let quill = this.$refs.vueEditor.editor;
      quill.clipboard.dangerouslyPasteHTML(0, data.content);
    },
    // 封装数据获取
    Draft() {
      // 获取富文本域的内容
      let quill = this.$refs.vueEditor.editor;
      let content = quill.root.innerHTML;
      // 获取参数
      let data = {
        content: content,
        title: this.title,
        city: this.city
      };
      return data;
    }
  }
};
</script>

<style lang="less" scoped>
.myarticle {
  width: 1000px;
  margin: 20px auto;
  font-size: 14px;
  color: #635f5f;
  .title {
    font-weight: 400;
    .marginBt10;
  }
  .tip {
    font-size: 12px;
    color: #999999;
    .marginBt10;
  }
  .titleInput {
    .marginBt25;
  }
  /deep/#editor {
    height: 400px;
    .marginBt25;
  }
  .cityselect {
    .marginBt25;
  }
}
// 草稿箱的样式
.box {
  width: 200px;
  height: 80px;
  padding: 10px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  > span {
    display: block;
    margin-bottom: 10px;
  }
}

ul li {
  .marginBt10;
  p {
    font-size: 13px;
    color: #999999;
  }
}
.active:hover {
  cursor: pointer;
  color: #ffa500;
  text-decoration: underline;
}
//封装marginbotton距离
.marginBt10() {
  margin-bottom: 10px;
}
.marginBt25() {
  margin-bottom: 25px;
}
</style>
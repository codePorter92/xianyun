<template>
  <div class="person">
    <div class="base">
      <el-row type="flex" justify="space-between" class="person-title">
        <el-col>
          <span>
            <img :src="`http://localhost:1337${Father.account.defaultAvatar}`" />
            {{Father.account.nickname}}
          </span>
          <span>{{Father.account.created_at|dateFormat}}</span>
        </el-col>
        <el-col :span="1" style="color:#999999">{{Father.level}}</el-col>
      </el-row>
      <grandfather
        v-if="Object.keys(Father).includes('parent') === true"
        :Father="Father.parent"
        @Fatherwrite="Fatherwrite"
      />
      <p class="person-com">{{Father.content}}</p>
      <!-- 相片框 -->
      <div class="clearFix" v-if="Father.pics.length!==0">
        <div class="showPhoto" v-for="(picture,index) in Father.pics" :key="index">
          <img :src="'http://127.0.0.1:1337'+picture.url" />
        </div>
      </div>
      <!-- 回复按钮，定位过去 -->
      <span class="replay" @click="Fatherwrite( Father.id , Father.account.nickname)">回复</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  // 父组件重新使用
  name: "grandfather",
  props: {
    Father: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    dateFormat(data) {
      return moment(data).format("YYYY-MM-DD  h:mm");
    }
  },
  methods: {
    Fatherwrite(ID, name) {
      this.$emit("Fatherwrite", ID, name);
    }
  }
};
</script>

<style lang="less" scoped>
// .person {
//   &:first-child {
//     border-bottom: 1px dashed #000 !important;
//   }
// }
.base {
  padding: 2px 2px 22px;
  border: 1px solid #e0d9d9;
}
.person-title {
  font-size: 12px;
  color: #666666;
  margin-bottom: 10px;
  img {
    width: 16px;
    height: 16px;
  }
}
.person-com {
  margin-top: 10px;
}
/deep/.el-upload--picture-card {
  width: 92px;
  height: 92px;
  line-height: 92px;
  margin: 10px 5px 0 0;
}
.clearFix::after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.showPhoto {
  width: 92px;
  height: 92px;
  float: left;
  margin: 10px 5px 0 0;
  padding: 5px;
  border: 1px dashed rgb(209, 206, 206);
  border-radius: 5px;
  img {
    max-width: 100%;
    height: 100%;
  }
}
.replay {
  float: right;
  font-size: 13px;
  cursor: pointer;
  color: transparent;
}
.replay:hover {
  text-decoration: underline;
  color: blue;
}
</style>
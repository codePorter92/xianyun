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
        :Father="Father.parent"  @Fatherwrite="Fatherwrite" 
      />
      <p class="person-com">{{Father.content}}</p>
      <!-- 相片框 -->
      <!-- <div class="box">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>-->
      <!-- 回复按钮，定位过去 -->
      <span class="replay" @click="Fatherwrite( Father.id , Father.account.nickname)">回复</span>
    </div>
  </div>
</template>

<script>
import moment from "moment"
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
  methods:{
      Fatherwrite(ID,name){
          this.$emit('Fatherwrite',ID,name)
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
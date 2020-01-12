<template>
  <div class="person">
    <div class="base" v-for="comment in data" :key="comment.id">
      <el-row type="flex" justify="space-between" class="person-title">
        <el-col>
          <span>
            <img :src="`http://localhost:1337${comment.account.defaultAvatar}`" />
            {{comment.account.nickname}}
          </span>
          <span>
            {{comment.account.created_at|dateFormat}}
          </span>
        </el-col>
        <el-col :span="1" style="color:#999999">{{comment.level}}</el-col>
      </el-row>
      <!-- 插入父亲组件,传值时，可以在值的后面传入一个自定义对象-->
      <father v-if="Object.keys(comment).includes('parent') === true" :Father="comment.parent || {account:{}}" @Fatherwrite="writeReplay"/>
      <p class="person-com">{{comment.content}}</p>
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
      <span class="replay" @click="writeReplay(comment.id,comment.account.nickname)">回复</span>
    </div>
  </div>
</template>

<script>
import father from "@/components/post/fatherComment";
import moment from "moment"
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    father
  },
  filters: {
    dateFormat(data) {
      return moment(data).format("YYYY-MM-DD  h:mm");
    }
  },
  methods:{
    writeReplay(ID,name){
      // console.log('id是',ID,'名字是',name)
      this.$emit('writeReplay',ID,name)
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
  padding: 20px 20px 22px;
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
<template>
  <div class="person">
    <div class="base" v-for="comment in data" :key="comment.id">
      <el-row type="flex" justify="space-between" class="person-title">
        <el-col>
          <span>
            <img :src="`http://localhost:1337${comment.account.defaultAvatar}`" />
            {{comment.account.nickname}}
          </span>
          <span>{{comment.account.created_at|dateFormat}}</span>
        </el-col>
        <el-col :span="1" style="color:#999999">{{comment.level}}</el-col>
      </el-row>
      <!-- 插入父亲组件,传值时，可以在值的后面传入一个自定义对象-->
      <father
        v-if="Object.keys(comment).includes('parent') === true"
        :Father="comment.parent || {account:{}}"
        @Fatherwrite="writeReplay"
      />
      <p class="person-com">{{comment.content}}</p>
      <!-- 相片框 -->
      <div class="clearFix" v-if="comment.pics.length!==0">
        <div class="showPhoto" v-for="(picture,index) in comment.pics" :key="index">
          <img :src="'http://127.0.0.1:1337'+picture.url" />
        </div>
      </div>
      <!-- 回复按钮，定位过去 -->
      <span class="replay" @click="writeReplay(comment.id,comment.account.nickname)">回复</span>
    </div>
  </div>
</template>

<script>
import father from "@/components/post/fatherComment";
import moment from "moment";
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
  methods: {
    writeReplay(ID, name) {
      // console.log('id是',ID,'名字是',name)
      this.$emit("writeReplay", ID, name);
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
// 清浮动
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
    height:100%
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
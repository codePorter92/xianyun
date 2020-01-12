<template>
  <div class="strategy">
    <p class="title">相关攻略</p>
    <div v-for="item in strategys" :key="item.id">
      <nuxt-link :to="`/post/detail?id=${item.id}`">
        <el-row type="flex" class="floor">
          <div class="str-left">
            <img :src="item.images[0]" />
          </div>
          <div class="str-right">
            <p>{{item.title}}</p>
            <div>
              <span>{{item.created_at|dateFormat}}</span>
              <span>阅读</span>
            </div>
          </div>
        </el-row>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      strategys: []
    };
  },
  async mounted() {
    let res = await this.$axios({
      url: "/posts"
    });
    // console.log(res);
    // 要渲染的攻略数组
    let arr = res.data.data.reverse();
    // 剪切数组
    this.strategys = arr.slice(0, 5);
  },
  // 过滤器
  filters: {
    dateFormat(data) {
      return moment(data.created_at).format("YYYY-MM-DD  h:mm");
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  width: 280px;
  padding: 0 0 10px;
  font-size: 18px;
  border-bottom: 1px solid #ededed;
}
.floor {
  width: 280px;
  padding: 20px 0;
  border-bottom: 1px solid #ededed;
  cursor: pointer;
  .str-left {
    width: 100px;
    height: 80px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .str-right {
    flex: 0 0 170px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span {
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>
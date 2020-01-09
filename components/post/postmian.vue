<template>
  <div class="postmian">
    <el-row type="flex" justify="space-between" align="middle" class="header">
      <span>推荐攻略</span>
      <el-button type="primary" icon="el-icon-edit" @click="writeArticle">写游记</el-button>
    </el-row>

    <!-- 第一个布局 -->
    <div v-for="item in data" :key="item.id">
      <nuxt-link :to="`/post/detail?id=${item.id}`">
      <div class="floor" v-if="item && item.images.length>=3">
        <el-row class="floor-header">{{item.title}}</el-row>
        <div class="article" v-html="item.summary"></div>
        <el-row type="flex" justify="space-between">
          <div class="photo" v-for="(photo , index) in item.images" :key="index">
            <img :src="photo" />
          </div>
        </el-row>
        <el-row type="flex" justify="space-between" align="middle" class="footer">
          <el-col :span="20">
            <span class="el-icon-location-outline">{{item.cityName}}</span>
            <span>by</span>
            <span>
              <img
                :src="`http://localhost:1337`+item.account.defaultAvatar"
                style="width:16px;height:16px;"
              />
              <span>{{item.account.nickname}}</span>
            </span>
            <span class="el-icon-view">{{item.watch}}</span>
          </el-col>
          <el-col :span="3" class="praise">
            <span>74</span> 赞
          </el-col>
        </el-row>
      </div>
      </nuxt-link>
      <!-- 第二个布局 -->
      <nuxt-link :to="`/post/detail?id=${item.id}`">
      <el-row type="flex" align="middle" v-if="item && item.images.length<=2">
        <el-col
          :span="8"
          class="photo"
          style="padding-right:8px"
          v-for="(item,index) in item.images"
          :key="index"
        >
          <img :src="item" />
        </el-col>
        <el-col :span="16" class="floor">
          <!-- 标题 -->
          <el-row class="floor-header">{{item.title}}</el-row>
          <!-- 文章 -->
          <div class="article" v-html="item.summary"></div>
          <!-- 尾部 -->
          <el-row type="flex" justify="space-between" align="middle" class="footer">
            <el-col :span="20">
              <span class="el-icon-location-outline">{{item.cityName}}</span>
              <span>by</span>
              <span>
                <img
                  :src="`http://localhost:1337`+item.account.defaultAvatar"
                  style="width:16px;height:16px;"
                />
                <span>{{item.account.nickname}}</span>
              </span>
              <span class="el-icon-view">{{item.watch}}</span>
            </el-col>
            <el-col :span="3" class="praise">
              <span>74</span> 赞
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods:{
    writeArticle(){
      this.$router.push({path:"/post/myarticle"})
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  border-bottom: 1px solid #ddd;
  span {
    color: #ffa500;
    border-bottom: 2px solid #ffa500;
    font-size: 20px;
  }
  /deep/.el-button--primary {
    height: 40px;
  }
}
// 第一个楼层
.floor {
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  &-header {
    margin-bottom: 15px;
    font-size: 18px;
    // 省略号
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .article {
    margin-bottom: 15px;
    font-size: 13px;
    color: #666666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
// 照片样式
.photo {
  width: 220px;
  height: 150px;
  img {
    width: 100%;
    height: 100%;
  }
}
.footer {
  font-size: 12px;
  span {
    margin-right: 5px;
  }
  .praise {
    color: #ffa500;
    font-size: 16px;
  }
}
// 图片的样式
.shadow {
  display: none;
}
</style>
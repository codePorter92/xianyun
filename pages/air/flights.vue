<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <div class="flights-content">
        <!-- 过滤条件 -->
        <flightsfilter :data="cacheflightslist||{}" @Filters="getFiltersArr"/>
        <!-- 航班头部布局 -->
        <flightsheader />
        <!-- 航班信息 -->
        <flightsitem v-for="data in pagination" :key="data.id" :data="data" />
        <!-- 分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="flightslist.total"
        ></el-pagination>
      </div>
      <!-- 侧边栏 -->
      <div class="aside">
          <flightsaside/>
      </div>
    </el-row>
  </section>
</template>

<script>
import flightsheader from "@/components/air/flightsheader";
import flightsitem from "@/components/air/flightslist";
import flightsfilter from "@/components/air/flightsfilter";
import flightsaside from "@/components/air/flightsaside"
export default {
  data() {
    return {
    // 清除传输时值的缺失，添加一个相应名字的空对象
      flightslist: {
          info:{},
          options:{}
      },
      // 设置一个有缓存的对象
      cacheflightslist:{
          info:{},
          options:{}
      },  
      // 分页导航用到的参数
      currentPage: 1,
      pageSize: 5,
    };
  },
  async mounted() {
    let res = await this.getTickeyInfo()
    console.log(res);
    this.flightslist = res.data;
    // 组件加载之后做的缓存
    this.cacheflightslist={...this.flightslist}
    //由于数据的获取是在父组件获取的，所以把参数的数据通过VUEX传送过去给历史纪录
    let data = this.$route.query
    console.log(data)
    this.$store.commit('air/sendhistory',data)
  },
  components: {
    flightsheader,
    flightsitem,
    flightsfilter,
    flightsaside
  },
  watch:{
     //   检测路由的变化
     async '$route'(){
            let res = await this.getTickeyInfo()
            this.flightslist = res.data;
            this.cacheflightslist={...this.flightslist}
      }
  },
  //通过computed来监听函数内部引用实例的属性
  computed: {
    pagination() {
      if(!this.flightslist.flights) return []  
       return this.flightslist.flights.slice(
        (this.currentPage - 1) * this.pageSize,
        this.pageSize * this.currentPage
      );
    }
  },
  methods: {
    getTickeyInfo() {
      let params = this.$route.query;
      return this.$axios({
        url: "/airs",
        params
      });
    },
    // 分页器的函数
    handleSizeChange(nub) {
      // console.log(`每页 ${nub} 条`);
      this.pageSize=nub
    },
    handleCurrentChange(pagenub) {
        this.currentPage=pagenub
    },
    getFiltersArr(arr){
        console.log(arr)
        this.flightslist.flights = arr
    }
  }
};
</script>

<style lang='less' scoped>
.contianer {
//   position:relative;  
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
//   position:absolute;
//   top:0;
//   right:0;  
  width: 240px;
    
}
</style>
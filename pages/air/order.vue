<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
          <orderform :data="tickeyInfo"/>
      </div>
      <!-- 侧边栏 -->
      <div class="aside" >
          <orderAside :data="tickeyInfo"/>
      </div>
    </el-row>
  </div>
</template>

<script>
import orderform from "@/components/air/orderform"
import orderAside from "@/components/air/orderAside"
export default {
  data(){
    return{
      tickeyInfo:{
        insurances:[],
        seat_infos:{}
      }
    }
  },
  mounted(){
    // 在父组件中的mounted事件中请求数据
    let {id,seat_xid}=this.$route.query
    this.$axios({
      url:`/airs/${id}`,
      params:{
        seat_xid
      }  
    }).then(res=>{
      console.log(res.data)
      this.tickeyInfo=res.data
    })
  },
  components:{
    orderform,
    orderAside
  },
  methods:{
    
  }
}
</script>

<style lang="less" scoped>
 .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>
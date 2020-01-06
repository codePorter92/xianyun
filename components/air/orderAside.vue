<template>
  <div class="aside">
    <div class="air-info">
      <el-row type="flex" justify="space-between" class="info-top">
        <div>{{data.dep_date}}</div>
        <div>{{data.org_city_name}} - {{data.dst_city_name}}</div>
      </el-row>
      <el-row type="flex" justify="space-between" align="middle" class="info-step">
        <el-col :span="5" class="flight-airport">
            <strong>{{data.dep_time}}</strong>
            <span>{{data.org_airport_name}}</span>
        </el-col>
        <el-col :span="14" class="flight-time">
          <span>---{{timeInterval}}---</span>
          <span>{{data.airline_name}}{{data.flight_no}}</span>
        </el-col>
        <el-col :span="5" class="flight-airport">
          <strong>{{data.arr_time}}</strong>
          <span>{{data.dst_airport_name}}</span>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="info-bar">
        <span>订单总价</span>
        <span>金额</span>
        <span>数量</span>
      </el-row>
      <el-row type="flex" justify="space-between" class="info-bar">
        <span>成人机票</span>
        <span>￥{{data.seat_infos.par_price}}</span>
        <span>×{{$store.state.air.person}}</span>
      </el-row>
      <el-row type="flex" justify="space-between" class="info-bar">
        <span>机建+燃油</span>
        <span>￥{{data.airport_tax_audlet}}/人/单程</span>
        <span>×{{$store.state.air.person}}</span>
      </el-row>
      <el-row type="flex" justify="space-between" align="middle" class="info-bar">
        <span>应付总额：</span>
        <span class="price">￥{{$store.state.air.allprice}}</span>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            default(){return{}}
        }
    },
    computed:{
        timeInterval(){
            if(!this.data.dep_time) return ''
            console.log(this.data)
            let depArr = this.data.dep_time.split(':')
            let arrArr = this.data.arr_time.split(':')
            
            if(+depArr[0]>+arrArr[0]){
                arrArr[0]=+arrArr[0]+24
            }
            let deptime=depArr[0]*60+ +depArr[1]
            let arrtime=arrArr[0]*60+ +arrArr[1]
            let time = arrtime-deptime
            let hour = Math.floor(time/60)
            let min = time%60
            return `${hour}时${min}分`
         }
    }
};
</script>

<style lang="less" scoped>
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}

.air-info {
  padding: 15px;

  .info-top {
    margin-bottom: 10px;
    > div:last-child {
      font-size: 14px;
    }
  }

  .info-step {
    .flight-airport {
      strong {
        display: block;
        font-size: 22px;
        font-weight: normal;
      }

      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      text-align: center;
      font-size: 12px;
      color: #999;
      span {
        display: block;
      }
    }
  }
}

.info-bar {
  border-top: 1px #ddd dashed;
  padding: 10px 15px;
  font-size: 14px;
  color: #666;

  .price {
    font-size: 28px;
    color: orange;
  }
}
</style>
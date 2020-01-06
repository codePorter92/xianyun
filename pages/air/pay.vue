<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage" ></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// 引入二维码插件
import QRCode from 'qrcode'
export default {
  data() {
    return {
        price:0,
        payInfo:{},
        timer:''
    };
  },
  mounted() {
    setTimeout(() => {
      let { id } = this.$route.query;
      let token = this.$store.state.user.userInfo.token
      this.$axios({
        url: `/airorders/${id}`,
        headers:{
            Authorization:` Bearer ${[token]}`
        }
      }).then(res=>{
          console.log(res)
          let {price,payInfo}=res.data
          // 渲染页面
          this.price=price
        // 把二维码渲染出来
        let canvass=document.querySelector('#qrcode-stage')
        QRCode.toCanvas(canvass,payInfo.code_url,{
            width:200
        })
        // 设置轮询，也就是不间断发请求服务器支付的情况
       this.timer = setInterval(() => {
           this.$axios({
               url:'/airorders/checkpay',
               method:"post",
               data:{
                   id:this.price,
                   nonce_str:this.payInfo.nonce_str,
                   out_trade_no:this.payInfo.order_no
               },
               headers:{
                   Authorization:` Bearer ${[token]}`
               }
           }).then(res=>{
                console.log(res)
                if(res.data.statusTxt==="订单支付成功"){
                    clearInterval(timer)
                }
           }) 
        }, 1000);
      });
    }, 1);
  },
//   生命周期的钩子函数，组件转载到其他地方去的时候，相当于摧毁文件的时候，中断定时器的发生
  destroyed(){
      clearInterval(this.timer)
  }
//   methods:{
//       askIfPay(){
//         setInterval(() => {
//            this.$axios({
//                url:'/airorders/checkpay',
//                method:"post",
//                data:{
//                    id:this.price,
//                    nonce_str:this.payInfo.nonce_str,
//                    out_trade_no:this.payInfo.order_no
//                },
//                headers:{
//                    Authorization:` Bearer ${[this.token]}`
//                }
//            }).then(res=>{

//            }) 
//         }, 1000000);
//       }
//   }
};
</script>

<style lang="less" scoped>
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>
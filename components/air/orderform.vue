<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <!-- 乘客人的信息 -->
      <el-form class="member-info" label-position="top">
        <div class="member-info-item" v-for="(item,index) in user" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select v-model="select1" slot="prepend" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select v-model="select2" slot="prepend" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <!-- 添加的删除键 -->
          <span class="delete-user" @click="deleteUser(index)">-</span>
        </div>
      </el-form>
      <el-button class="add-member" type="primary" @click="addPassager">添加乘机人</el-button>
    </div>

    <!-- 保险列表单 -->
    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="item in data.insurances" :key="item.id">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1 最高赔付${item.compensation}万`"
            border
            @change="chooseinsurance(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <!-- 联系人列表 -->
    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>
          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button
                  @click="sendcaptcha"
                  :disabled="isOk"
                >{{isOk?`${timeInterval}s后重新请求`:'发送验证码'}}</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="sendsubmit">提交订单</el-button>
      </div>
    </div>
    {{totolpay}}
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      user: [
        {
          username: "",
          id: ""
        }
      ],
      insurances: [],
      contactName: "",
      contactPhone: "",
      captcha: "",
      invoice: false,
      seat_xid: "",
      air: "",
      isOk: false,
      timeInterval: 60,
      select1: "",
      select2: ""
    };
  },
  computed: {
    totolpay() {
      // data.seat_infos.par_price   成人票价
      // data.airport_tax_audlet     燃油税
      // 用户计算，保险金计算,燃油费
      let result = 0;
      let len = this.user.length;
      let data={}
        result +=
          (this.data.seat_infos.par_price + this.data.airport_tax_audlet) *
          len;
        //   console.log(this.data.airport_tax_audler)
        this.insurances.forEach(v => {
          result += this.data.insurances[v - 1].price * len;
        });
        // console.log(result)
      // 把数据使用vuex传送出去
      data.result=result
      data.length=len
      this.$store.commit("air/countprice", data);
      return "";
    }
  },
  methods: {
    //   添加乘机员
    addPassager() {
      this.user.push({});
      // console.log(this.user)
    },
    deleteUser(index) {
      this.user.splice(index, 1);
      // console.log(this.user)
    },
    //   保险的方法
    chooseinsurance(id) {
      if (this.insurances.indexOf(id) > -1) {
        this.insurances.splice(this.insurances.indexOf(id), 1);
      } else {
        this.insurances.push(id);
      }
    },
    // 发送验证码请求
    sendcaptcha() {
      let tel = this.contactPhone;
      //   this.$store.dispatch('user/sendcaptchas',tel).then(res=>{
      //       console.log(res)
      //   })
      this.$axios({
        url: "/captchas",
        method: "post",
        data: { tel }
      }).then(res => {
        this.$message.success("验证码'000000'已经发送至您手机，请注意查收");
        let timId = setInterval(() => {
          this.timeInterval--;
          this.isOk = true;
          if (this.timeInterval === -1) {
            clearInterval(timId);
            this.isOk = false;
            this.timeInterval = 60;
          }
        }, 1000);
      });
    },
    // 提交订单，发送请求
    sendsubmit() {
      // 提交订单时要注册用户
      // 对是否存在进行判断，如果存在token值可以发送请求，不存在退回登录页进行登录验证
      // 对于表格内的数据格式，系统会对它做出判断，不需要我们再做判断
      // 通过vuex来获取token值，因为注册之后token值已经放到vuex中了
      let { seat_xid } = this.$route.query;
      this.seat_xid = seat_xid;
      this.air = this.data.id;
      let { token } = this.$store.state.user.userInfo;
      console.log(token);
      if (!token) {
        this.$router.push({ path: "/user/login" });
        return;
      }
      this.$axios({
        url: "/airorders",
        method: "post",
        data: {
          users: this.user,
          insurances: this.insurances,
          contactName: this.contactName,
          contactPhone: this.contactPhone,
          captcha: this.captcha,
          invoice: false,
          seat_xid: this.seat_xid,
          air: this.air
        },
        headers: {
          // bearer是token字符串前面必须要声明的，后面加上空格，再连接上token
          Authorization: `Bearer ${[token]}`
        }
      }).then(res => {
        // console.log(res);
        this.$message.success(res.data.message)
        let query={
            id:res.data.data.id
        }
        this.$router.push({path:'/air/pay',query:query})
      });
    }
  }
};
</script>

<style lang="less" scoped>
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>
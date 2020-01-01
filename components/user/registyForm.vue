<template>
  <div class="registy">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      style="width:300px"
    >
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="用户名手机"></el-input>
      </el-form-item>
      <el-form-item prop="authcode">
        <el-input v-model="ruleForm.captcha" placeholder="验证码">
          <template slot="append">
            <el-button @click="handleSendCaptcha" :disabled='isdisabled'>{{isdisabled?`${timeinterval}s后重新发送`:'发送验证码'}}</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input v-model="ruleForm.nickname" placeholder="你的名字"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="confirmpsd">
        <el-input v-model="ruleForm.confirmpsd" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:300px" @click="submitrequired">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    // 对用户名字进行判定
    let validateuser = (rule, value, callback) => {
      if (!value) {
        callback(new Error("手机号码不能为空"));
      } else {
        // 正则表达式规定手机号码
        let reg = /^1[3-9]\d{9}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback("请输入正确的手机号码");
        }
      }
    };
    let validateauthcode = (rule, value, callback) => {
      // console.log(this.$store.state)
      if (value === this.$store.state.user.authcode) {
        callback();
      } else {
        callback("验证出错");
      }
    };
    let validatepassword = (rule, value, callback) => {
      let reg = /\w{6,16}/;
      if (!value) {
        callback("密码不能为空");
      } else if (!reg.test(value)) {
        callback("请输入6~16位的字符密码");
      } else {
        callback();
      }
    };
    let validateconfirmpsd = (rule, value, callback) => {
      if (!value) {
        callback("请再次输入密码");
      } else if (value === this.ruleForm.password) {
        callback();
      } else {
        callback("密码输入错误");
      }
    };
    return {
      ruleForm: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        confirmpsd: ""
      },
      phoneattr: "",
      rules: {
        username: [{ validator: validateuser, trigger: "blur" }],
        captcha: [{ validator: validateauthcode, trigger: "blur" }],
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 3, max: 5, message: "昵称为 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ validator: validatepassword, trigger: "blur" }],
        confirmpsd: [{ validator: validateconfirmpsd, trigger: "blur" }]
      },
      // 当点击验证码发送按钮之后，一般等待60s的时间，才能从新点击，该设置的一些变量声明
      isdisabled:false,
      timeinterval:60
    };
  },
  methods: {
    handleSendCaptcha() {
      this.phoneattr = this.ruleForm.username;
      if (!this.phoneattr) {
        this.$message.warning("请输入用户手机");
      } else {
        let reg = /^1[3-9]\d{9}/;
        if (!reg.test(this.phoneattr)) {
          this.$message.warning("该手机号码不存在");
        } else {
          // this.$axios({
          //   url: "/captchas",
          //   method: "post",
          //   data: { tel: this.phoneattr }
          // }).then(res => {
          //   //  console.log(res)
          //   this.$message.success("获取成功，验证码：" + res.data.code);
          //   this.$store.commit("user/getauthcode", res.data.code);
          // });
          this.$store.dispatch('user/sendcaptchas',this.phoneattr).then(res=>{
            // console.log(res)
            this.$message.success("验证码'000000'以发至手机中，请及时填写")
            let intervalId=setInterval(() => {
              this.timeinterval--
              this.isdisabled=true
              if(this.timeinterval===-1){
                  clearInterval(intervalId)
                  this.isdisabled=false
              }
            }, 1000);
          })
        }
      }
    },
    submitrequired() {
      // 对信息进行二次的检查
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          // 使用解构把发送请求的参数从ruleForm提取出来
          let {confirmpsd,...others}=this.ruleForm
          // this.$axios({
          //   url: "/accounts/register",
          //   method: "post",
          //   data:others
          // }).then(res => {
          //   console.log(res);
          //   this.$message.success("注册成功，请重新登录");
          //   setTimeout(()=>{
          //     this.$router.push({path:'/'})
          //   },500)
          // });
          this.$store.dispatch('user/registyuser',others).then(res=>{
            if(res){
            const {captcha,nickname,confirmpsd,...others}=this.ruleForm
            this.$store.dispatch('user/login',others).then(res=>{
              this.$router.push({path:'/'})
            })
            }
          })
        } else {
          this.$message.warning('注册信息出错，请重新查看')
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
</style>
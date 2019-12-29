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
            <el-button @click="handleSendCaptcha">发送验证码</el-button>
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
        <el-input v-model="confirmpsd" placeholder="确认密码"></el-input>
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
        let reg = /^1[3-9]\d{9}/;
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
      confirmpsd: "",
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
      }
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
          this.$axios({
            url: "/captchas",
            method: "post",
            data: { tel: this.phoneattr }
          }).then(res => {
            //  console.log(res)
            this.$message.success("获取成功，验证码：" + res.data.code);
            this.$store.commit("user/getauthcode", res.data.code);
          });
        }
      }
    },
    submitrequired() {
      this.$axios({
        url: "/accounts/register",
        method: "post",
        data: this.ruleForm
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang='less' scoped>
</style>
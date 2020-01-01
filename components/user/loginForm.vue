<template>
  <div class="login">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm" style='width:300px'>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名/手机"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder='密码'></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" style='width:300px' @click='submitUserinfo'>登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    // username的自定义判断
    let validateusername=(rule,value,callback)=>{
      let reg = /^1[3-9]\d{9}$/
      if(reg.test(value)){
        callback()
      }else{
        console.log(11)
        callback(new Error('请输入正确的手机号码'))
      }
    }
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules:{
        username:[
          {required:true,message:'请输入手机号码',trigger: 'blur'},
          { validator: validateusername, trigger: 'blur' }
        ],
        password:[
          {required:true,message:'密码不能为空',trigger:'blur'},
        ]
      }
    };
  },
  methods:{
    submitUserinfo(){
        this.$refs['loginForm'].validate(valid=>{
          if(valid){
            // console.log('格式正确')
            // this.$axios({
            //   url:'/accounts/login',
            //   method:'post',
            //   data:this.loginForm
            // }).then(res=>{
            //   this.$message.success('登录成功，欢迎您的到来')
            //   this.$store.commit('user/senduserInfo',res.data)
            // })
            this.$store.dispatch('user/login',this.loginForm).then(res=>{
              if(res==true){
                this.$message.success('登录成功，欢迎您的到来')
                // router的路由跳转可以使用replace来跳转
                this.$router.replace('/')
              }
            })
          } else {
            this.$message.warning('请按格式输入用户信息')
          }
        })
    }
  }
};
</script>

<style>
</style>
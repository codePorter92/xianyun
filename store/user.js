export const state={
    userInfo:{},
    authcode:''
}

export const mutations={
    senduserInfo(state,data){
        state.userInfo=data
    },
    getauthcode(state,data){
        state.authcode=data
    }
}

export const actions={
    login(store,data){
      return this.$axios({
              url:'/accounts/login',
              method:'post',
              data
            }).then(res=>{
             store.commit('senduserInfo',res.data)
              return true
            })
    },
    sendcaptchas(store,data){
    return  this.$axios({
              url: "/captchas",
              method: "post",
              data: { tel: data }
            }).then(res => {
              //  console.log(res)
            //   this.$message.success("获取成功，验证码：" + res.data.code);
              store.commit("getauthcode", res.data.code);
            });
    },
    registyuser({commit},data){
       return this.$axios({
            url: "/accounts/register",
            method: "post",
            data
          }).then(res => {
            // console.log(res);
            // this.$message.success("注册成功，请重新登录");
            // setTimeout(()=>{
            //   this.$router.push({path:'/'})
            // },500)
            return true
          });
    }
}
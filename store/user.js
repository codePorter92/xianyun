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
    }
}
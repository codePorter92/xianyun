export const state={
    // name:'jack'
    authcode:''
}

export const mutations={
    change(state){
        // state.name='天天'
    },
    getauthcode(state,data){
        state.authcode=data
    }
}
export const state=()=>{
    return{
       historyArr:[],
       allprice:0,
       person:1
    }
}

export const mutations={
    sendhistory(state,data){
        state.historyArr.unshift(data)
    },
    cleanhistory(state){
        state.historyArr=[]
    },
    countprice(state,data){
        state.allprice=data.result
        state.person=data.length
    } 
}
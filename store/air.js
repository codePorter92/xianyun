export const state=()=>{
    return{
       historyArr:[] 
    }
}

export const mutations={
    sendhistory(state,data){
        state.historyArr.unshift(data)
    },
    cleanhistory(state){
        state.historyArr=[]
    } 
}
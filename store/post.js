export const state=()=>{
   return {
        articleList:[]
   } 
}

export const mutations={
    sendArticleList(state,data){
        state.articleList=data
    }
}

export const actions={
    
}
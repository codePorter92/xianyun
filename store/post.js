
export const state = () => {
    return {
        articleList: [],
        // 草稿箱
        draftlist: []
    }
}

export const mutations = {
    sendArticleList(state, data) {
        state.articleList = data
    },
    draftstorege(state, data) {
        if (state.draftlist.length === 5) {
            state.draftlist.unshift(data)
            state.draftlist.pop()
        } else {
            state.draftlist.unshift(data)
        }
    }
}

export const actions = {
    submitArticleSuc(store, data) {
        return this.$axios({
            url: "/posts",
            method: "post",
            headers: {
                Authorization: `Bearer ${store.rootState.user.userInfo.token}`
            },
            data: data
        }).then(res => {
            return true
        })
    }
}
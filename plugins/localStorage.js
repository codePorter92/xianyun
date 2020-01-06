import createPersistedState from 'vuex-persistedstate'
 
export default (nuxt) => {
  console.log(nuxt)
  window.onNuxtReady(() => {
    createPersistedState()(nuxt.store)
  })
}
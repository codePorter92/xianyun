// 引入el插件中的message对象
import {Message} from 'element-ui'

// 当我们配置插件在nuxt.config.js中之后，插件中的回调函数会有一个nuxt的全局参数返回的，里面包含了所有插件的对象,其中包括$axios的请求对象
export default (nuxt)=>{
    // console.log(nuxt)
    // console.log(1111)
    nuxt.$axios.onError(res=>{
        // res为浏览器返回的错误对象，通过这个对象，我们可以得到相应回来的错误对象response
        const {statusCode,message}=res.response.data
        if(statusCode===400){
            Message.warning(message)
        }
        if(statusCode === 401){
            Message.error("登录过期，跳转到登录页");
            // nuxt会成功的跳转到登录页去
            nuxt.redirect(200,"/user/login")
        }
    })
}
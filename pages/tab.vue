<template>
  <div class='tab'>
      <div class='title'>
          <span
          v-for="(value,index) in arr" :key='index' 
          @click='control(index)'
          :class='{red:current===index}'>{{value}}</span>
      </div>
      <div>
          <ul v-show='current===0'>
              <li>新闻板块</li>
              <li>新闻板块</li>
              <li>新闻板块</li>
          </ul>
          <ul v-show='current===1'>
              <li>体育板块</li>
              <li>体育板块</li>
              <li>体育板块</li>
          </ul>
          <ul v-show='current===2'>
              <li>娱乐版块</li>
              <li>娱乐版块</li>
              <li>娱乐版块</li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            arr:['新闻','体育','娱乐'],
            current:0,
            red:'red'
        }
    },
    methods:{
      control(index){
        this.current=index 
      }  
    }
}
</script>

<style>
/* .title{
    margin-right:20px
} */
.red{
    background:red
}
</style>
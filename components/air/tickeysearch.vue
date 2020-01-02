<template>
  <div class="search-form">
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        :class="{active:currentTab===index}"
        @click="handleSearchtabs(index)"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>
    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市" class="el-autocomplete">
        <el-autocomplete
          v-model='flyoptions.departCity'
          :fetch-suggestions="searchDepartCity"
          placeholder="请输入内容"
          @select="selectDepartCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市" class="el-autocomplete">
        <el-autocomplete
          v-model='flyoptions.destCity'
          :fetch-suggestions="searchDestCity"
          placeholder="请输入内容"
          @select="selectDestCity"
          @blur='defaultsdepart'
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <el-date-picker
        v-model="flyoptions.departDate" 
        type="date" 
        placeholder="选择日期" 
        style="width: 100%;"
        @change='getDate'
        :picker-options="banDate"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button 
        style="width:100%;" 
        type="primary" 
        icon="el-icon-search"
        @click='askfortickey'>搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click='handleReserve'>换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      // tab栏中的变量
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      // 搜索机票的参数
      flyoptions:{
        departCity:'',
        departCode:'',
        destCity:'',
        destCode:'',
        departDate:''
      },
      banDate:{
       disabledDate(time){
         return time.getTime-3600 * 1000 * 24>Date.now() 
       } 
      }
    };
  },
  methods: {
    // tab栏中的方法
    handleSearchtabs(index) {
      this.currentTab = index;
    },
    // 出发远程框的方法
    searchDepartCity(value, callback){
      this.$store.dispatch('user/searchcity',value).then(res=>{
        let citylist=res.data.data
        let result=value?citylist.map(item=>{
          let {name,sort}=item
          // console.log(name)
          if(name.includes('市')){
            name=name.replace('市','')
          }
          return {
          value:name,  
          sort:sort
          }
        }):[]
        callback(result)
      })
    },
    selectDepartCity(item){
      // 该item值是点击下列列表中所得到的值
      // console.log(item)
       this.flyoptions.departCity=item.value
       this.flyoptions.departCode=item.sort
    },
    searchDestCity(value,callback){
       this.$store.dispatch('user/searchcity',value).then(res=>{
        console.log(res.data.data)
        let citylist=res.data.data
        let result=value?citylist.map(item=>{
          let {name,sort}=item
          // 出现的bug,当
          if(name.includes('市')){
            name=name.replace('市','')
          }
          return {
            value:name,
            sort:sort
          }
        }):[]
        callback(result)
      })
    },
    selectDestCity(item){
      this.flyoptions.destCity=item.value
       this.flyoptions.destCode=item.sort
    },
    getDate(value){
      // value值为输入框的日期
      this.flyoptions.departDate=moment(value).format('YYYY-MM-DD')
    },
    askfortickey(){
      // 自定义判断
      // 创建自定义判断的对象
      let rules={
        depart:{
          value:this.flyoptions.departCity,
          message:'出发城市不能为空'
        },
        dest:{
          value:this.flyoptions.destCity,
          message:'到达城市不能为空'
        },
        departTime:{
          value:this.flyoptions.departDate,
          message:'出发时间不能为空'
        }
      }
      // 创建一个用于判断的全局变量
      let valid=true
      // 对上述的对象进行对象取键，循环操作,使用对象取键的方法，返回值是键名数组，然后遍历，在回调函数中，通过键名把值取到，进行分析
      // 由于forEach是不能被某一项中断的，所以要多次判定
      Object.keys(rules).forEach(key=>{
        // 这个判定是当其中的一个不符合条件的话，直接中断，不去执行下面的代码
        if (!valid) return
        if(!rules[key].value){
          this.$message.warning(rules[key].message)
          valid=false
          return
        }
        if(!valid)return
        this.$router.push({path:'/air/flights',query:this.flyoptions})
        // 相当于
        //  if(!valid){
        //   return
        // }else{
        //   this.$router.push({path:'/air/flights',query:this.flyoptions})
        // }
      })
    },
    handleReserve(){
      let {departCity,departCode,destCity,destCode}=this.flyoptions
      this.flyoptions.departCity=destCity
      this.flyoptions.departCode=destCode
      this.flyoptions.destCity=departCity
      this.flyoptions.destCode=departCode
    },
    // 当用户正确输入出发到达城市，并且没有点击下拉菜单时的情况,暂时放下
    defaultsdepart(){
      console.log('放一边')
    }
  }
};
</script>

<style lang='less' scoped>
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
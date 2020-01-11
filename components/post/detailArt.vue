<template>
    <div class="detailArt">
        <h1>{{data.title}}</h1>
        <el-row type="flex" justify="space-between">
            <span></span>
            <span class="read">
                <span>攻略：{{dateFormat}}</span>
                <span>阅读：{{data.watch}}</span>
            </span>
        </el-row>
        <!-- 文章详情 -->
        <div class="article" v-html="data.content">
            文章详情
        </div>
        <!-- 点赞 -->
        <el-row class="iconfont like" type="flex" justify="center">
            <span>&#xe678;<i>评论({{data.comments&&data.comments.length}})</i></span>
            <span>&#xe616;<i>收藏</i></span>
            <span>&#xe60b;<i>分享</i></span>
            <span>&#xe643;<i>{{data.like===null?'点赞':`点赞${data.like}`}}</i></span>
        </el-row>
    </div>
</template>

<script>
import moment from "moment"
export default {
    props:{
        data:{
            type:Object,
            default(){return{}}
        }
    },
    computed:{
        // 日期
        dateFormat(){
          if(!this.data)return
          return  moment(this.data.created_at).format('YYYY-MM-DD  h:mm')
        }
    }
}
</script>

<style lang="less" scoped>
.detailArt{
    h1{
        padding:20px 0;
        border-bottom: 1px solid #ddd;
    }
}
.article{
    /deep/img{
        max-width: 100%;
    }
}
.read{
    padding:20px;
    font-size:15px;
    color:#999999;
    span{
        margin-left:20px
    }
}

.like{
    padding:50px 0 30px;
    span{
        display:flex;
        flex-direction:column;
        align-items: center;
        padding-right:28px;
        font-size:35px;
        color:#ffa500;
        i{
            font-size:16px;
            color:#999999;
        }
    }
}
</style>
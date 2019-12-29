<template>
  <div class="container">
    <h3>国内机票</h3>
    <div class="listform">
      <!-- tab栏 -->
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-date"></i> 单程
          </span>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="出发城市">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="到达城市">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="出发时间">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.date1"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-date"></i> 往返
          </span>
          往返行程
        </el-tab-pane>
      </el-tabs>
      <!-- 右侧图片 -->
      <div class="adver">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" />
      </div>
    </div>
    <div class="server">
      <span>100%航协认证</span>
      <span>出行保证</span>
      <span>7×24小时服务</span>
    </div>
    <h3>特价机票</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
     form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
    };
  }
};
</script>

<style lang='less' scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
.listform {
  display: flex;
  justify-content: space-between;
}
</style>
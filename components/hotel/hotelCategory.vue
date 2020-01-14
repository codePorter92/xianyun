<template>
  <div class="category">
    <el-row>
      <el-col :span="6">
        <el-slider v-model="value1" :max="4000" :show-tooltip="true"></el-slider>
      </el-col>
      <el-col :span="4">
        <el-row></el-row>
        <el-row>
          <el-select v-model="value" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <el-radio v-model="radio" :label="item.label"></el-radio>
            </el-option>
          </el-select>
          <!-- <el-select v-model="value" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <el-radio v-model="radio" :label="item.label"></el-radio>
            </el-option>
          </el-select>-->
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 0,
      value: this.radio,
      // 单选框中的变量的值
      radio: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ]
    };
  }
};
</script>

<style>
</style>
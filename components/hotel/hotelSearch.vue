<template>
  <div class="hotel">
    <el-row type="flex" style="margin-bottom:15px">
      <!-- 选择城市 -->
      <!-- <el-col :span="5">
        <el-autocomplete
          class="inline-input"
          v-model="state2"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
        ></el-autocomplete>
      </el-col> -->
      <!-- 日期选择框 -->
      <!-- <el-col :span="9" style="margin:0 0 0 15px">
        <el-date-picker
          v-model="value7"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2"
        ></el-date-picker>
      </el-col> -->
      <!--人数框-->
      <el-col :span="6" style="margin-right:12px">
        <el-input
          v-model="input"
          placeholder="人数未定"
          :readonly="true"
          suffix-icon="el-icon-circle-plus-outline"
          @focus="isshow=true"
          @blur="isshow=false"
        ></el-input>
        <!-- 显示框 -->
        <transition name="el-fade-in">
          <div class="box" v-show="isshow">
            <el-row type="flex" align="middle" class="box-one">
              <el-col>每间</el-col>
              <el-col>
                <el-select v-model="value2" placeholder="请选择成人">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col>
                <el-select v-model="value1" placeholder="请选择儿童">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" align="center">
              <span></span>
              <el-button type="primary">确定</el-button>
            </el-row>
          </div>
        </transition>
      </el-col>
      <!-- 按钮 -->
      <el-col :span="2">
          <el-button type="primary">查看价格</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      value3: "",
      input: "",
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
      ],
      isshow: false
    };
  },
  methods: {
    selectPerson() {}
  }
};
</script>

<style lang="less" scoped>
.box {
  position: absolute;
  width: 326px;
  height: 123px;
  padding: 12px;
  margin-top: 12px;
  border-radius: 4px;
  box-shadow: 0 0 4px rgb(129, 127, 127);
  background-color: #fff;
  box-sizing: border-box;
  z-index: 999;
  &-one {
    padding-bottom: 25px;
    border-bottom: 1px solid #ededed;
    .el-select {
      width: 92px;
      height: 28px;
    }
  }
  .el-button {
    font-size: 12px;
    width: 56px;
    height: 28px;
    padding: 0;
    margin-top:16px;
  }
}
</style>
<template>
  <div class="filters">
    <el-row type="flex" justify="space-between" align="middle" class="filter-top">
      <el-col
        :span="8"
      >单程：{{data.info.departCity}} - {{data.info.destCity}} / {{data.info.departDate}}</el-col>
      <el-col :span="4">
        <!-- 给select添加change事件 -->
        <el-select v-model="airport" placeholder="起飞机场">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="departTime" placeholder="起飞时间">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00-${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="company" placeholder="航空公司">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="flySize" placeholder="机型">
          <el-option
            v-for="(item,index) in sizeOption"
            :key="index"
            :label="item.name"
            :value="item.size"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="cancleAll">撤销</el-button>
    </div>
    {{filterArr}}
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      //  当不存在值时返回默认空数组
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      airport: "",
      departTime: "",
      company: "",
      flySize: "",
      // 自定义机型的大小
      sizeOption: [
        { name: "大", size: "L" },
        { name: "中", size: "M" },
        { name: "小", size: "S" }
      ]
    };
  },
  computed: {
    filterArr() {
      if (!this.data.flights) return [];
      let arr = this.data.flights.filter(v => {
        let valid = true;
        if (this.airport && this.airport !== v.org_airport_name) {
          valid = false;
        }
        if (this.departTime) {
          const [from, to] = this.departTime.split(",");
          let start = +v.dep_time.split(":")[0];
          if (start < +from || start >= +to) {
            valid = false;
          }
        }
        if (this.company && this.company !== v.airline_name) {
          valid = false;
        }
        if (this.flySize && this.flySize !== v.plane_size) {
          valid = false;
        }
        return valid;
      });
      this.$emit("Filters", arr);
      return "";
    }
  },
  methods: {
    cancleAll() {
      (this.airport = ""),
        (this.departTime = ""),
        (this.company = ""),
        (this.flySize = "");
    }
  }
};
</script>

<style lang="less" scoped>
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>
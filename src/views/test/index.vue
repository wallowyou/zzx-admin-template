<template>
  <div class="layout-page">
    <div class="layout-page-header">
      <bread-crumb />
    </div>
    <div>
      <div class="bar-chart">
        <bar-chart :customOpt="barOpts" />
      </div>
      <div>
        <g-button type="primary" size="mini"></g-button>
      </div>
      <div class="">
        <z-table stripe />
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/Breadcrumb/index";
import { BarChart } from "@/components/Chart/index";
import GButton from "./g-button.vue";
import ZTable from "@/components/ZTable/index.vue";
export default {
  components: {
    BreadCrumb,
    BarChart,
    GButton,
    ZTable
  },
  data() {
    return {
      barOpts: {
        xAxis: {
          type: "category",
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"]
        },
        yAxis: {
          type: "value"
        },
        tooltip: {
          triggerOn: "mousemove",
          alwaysShowContent: false
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar"
          }
        ]
      }
    };
  }
};
</script>
<style lang="scss">
.layout-page-header {
  background-color: #fff;
  border-bottom: 1px solid #efe3e5;
}
</style>
<style lang="scss" scoped>
.bar-chart {
  height: 500px;
  width: 60%;
  margin: 0 auto;
}
</style>

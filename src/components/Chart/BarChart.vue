<template>
  <div class="zzx-chart" :class="chartClass" />
</template>
<script>
import echarts from "@/plugins/initEchart.js";
import resize from "./mixins/resize.js";
export default {
  mixins: [resize],
  props: {
    chartClass: {
      type: String,
      default: ""
    },
    customOpt: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el);
      this.chart.setOption(this.customOpt);
    },
    updateChart(opts) {
      this.chart.setOption(opts);
    }
  }
};
</script>
<style lang="scss">
.zzx-chart {
  width: 100%;
  height: 100%;
}
</style>

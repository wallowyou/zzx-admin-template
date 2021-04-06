<template>
  <div class="layout-page">
    <div class="layout-page-header">
      <bread-crumb />
    </div>
    <div>
      <div class="bar-chart">
        <bar-chart :customOpt="barOpts" />
      </div>
      <div class="box-test" id="movebox">
        测试节流函数
      </div>
      <div class="">
        <z-table
          stripe
          :columns="columns"
          :url="'/vue-admin-template/table/list'"
        />
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/Breadcrumb/index";
import { BarChart } from "@/components/Chart/index";
import ZTable from "@/components/ZTable/index.vue";
import { throttle } from "@/utils/index";
export default {
  components: {
    BreadCrumb,
    BarChart,
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
      },
      columns: [
        {
          key: "id",
          title: "ID"
        },
        {
          key: "title",
          title: "标题"
        },
        {
          key: "author",
          title: "作者"
        },
        {
          key: "display_time",
          title: "上架时间"
        },
        {
          key: "status",
          title: "状态",
          render: (h, { row }) => {
            const statusMap = {
              published: "success",
              draft: "info",
              deleted: "warning"
            };
            return h(
              "el-tag",
              {
                props: {
                  type: row.status ? statusMap[row.status] : "default"
                }
              },
              row.status
            );
          }
        }
      ],
      val: "",
      $_moveEl: null
    };
  },
  watch: {},
  mounted() {
    this.__mouseHandler = throttle(this.printLog, 1000);
    this.$_moveEl = document.getElementById("movebox");
    this.$_moveEl &&
      this.$_moveEl.addEventListener("mousemove", this.__mouseHandler);
  },
  beforeDestroy() {
    this.$_moveEl &&
      this.$_moveEl.removeEventListener("mousemove", this.__mouseHandler);
  },
  methods: {
    printLog(e) {
      console.log(e);
    }
  }
};
</script>
<style lang="scss">
.layout-page-header {
  background-color: #fff;
  border-bottom: 1px solid #efe3e5;
}
.box-test {
  width: 400px;
  height: 400px;
  border: 1px solid red;
}
</style>
<style lang="scss" scoped>
.bar-chart {
  height: 500px;
  width: 60%;
  margin: 0 auto;
}
</style>

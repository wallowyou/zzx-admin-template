<template>
  <div class="z-table-wrap">
    <el-table :data="tableData" v-bind="$attrs" v-on="$listeners">
      <el-table-column v-if="selection" type="selection" width="55" />
      <el-table-column
        :prop="col.key"
        :label="col.title"
        v-for="(col, index) in columns"
        :key="index"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
/* 
 封装可复用的表格,其他el-table的prop通过v-bind="$attrs"传递
 必须参数有columns，表示列数据，格式为: key对应prop,title对应label
 [
     {
         key: '',
         title: ''
     }
 ]
*/
export default {
  props: {
    columns: {
      type: Array,
      default() {
        return [
          {
            key: "date",
            title: "日期"
          },
          {
            key: "name",
            title: "姓名"
          },
          {
            key: "address",
            title: "地址"
          }
        ];
      },
      required: true,
      validator: value => {
        return Array.isArray(value);
      }
    },
    selection: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.z-table-wrap {
}
</style>

<template>
  <div class="z-table-wrap">
    <el-table
      :data="!url ? localData : tableData"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-table-column v-if="selection" type="selection" width="55" />
      <el-table-column
        :prop="col.key"
        :label="col.title"
        v-for="(col, index) in columns"
        :key="index"
        :width="col.width"
        :formatter="col.formatter"
        :align="col.align ? col.algin : 'center'"
      >
        <template slot-scope="scope">
          <template v-if="'slot' in col">
            <slot
              :row="scope.row"
              :column="col"
              :index="index"
              :name="col.slot"
            />
          </template>
          <template v-else-if="col.formatter">
            {{ col.formatter(scope.row) }}
          </template>
          <template v-else-if="col.render">
            <Render
              :row="scope.row"
              :column="col"
              :index="index"
              :render="col.render"
            />
          </template>
          <template v-else>
            {{ scope.row[col.key] }}
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="pagination" class="table-pagination">
      <slot />
      <el-pagination
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>
<script>
/* 
 封装可复用的表格,其他el-table的prop通过v-bind="$attrs"传递
 必须参数有columns，表示列数据，格式为: key对应prop,title对应label
 [
     {
         key: '',
         title: '',
         ...
     }
 ]
*/
import request from "@/fetch/index.js";
import Render from "./render.js";
export default {
  components: {
    Render
  },
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      },
      required: true,
      validator: value => {
        return Array.isArray(value);
      }
    },
    selection: {
      type: Boolean,
      default: true
    },
    localData: {
      type: Array, // 如果没有url或者fetchData那么需要本地数据
      default() {
        return [];
      }
    },
    url: {
      type: String, // 异步请求表格数据的地址
      default: ""
    },
    method: {
      type: String, // 远程请求数据的方法
      default: "get"
    },
    searchParams: {
      type: Object, // 表格查询的参数
      default() {
        return {};
      }
    },
    fetchData: {
      type: Object, // 自定义请求数据的方法并且返回一个promise对象
      default() {
        return {};
      }
    },
    // 分页属性
    pagination: {
      type: Boolean,
      default: true
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50];
      }
    },
    // 关于数据字段映射
    datamap: {
      type: Object, // 后台接口返回的数据字段映射,total和list对应的字段
      default() {
        return {
          total: "total",
          list: "list"
        };
      }
    },
    pagemap: {
      type: Object,
      default() {
        return {
          page: "page",
          size: "size"
        };
      }
    }
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      tableLoading: !!this.url
    };
  },
  watch: {
    url(newVal, oldUrl) {
      if (newVal !== oldUrl) {
        this.refreshData();
      }
    }
  },
  mounted() {
    this.url && this.loadData();
  },
  methods: {
    searchData() {
      const params = {
        [this.pagemap.page]: this.currentPage - 1,
        [this.pagemap.size]: this.pageSize
      };
      const allParams = {
        ...params,
        ...this.searchParams
      };
      if (this.method === "post") {
        return request.post(this.url, allParams);
      } else {
        return request.get(this.url, {
          params: allParams
        });
      }
    },
    loadData() {
      this.$nextTick(async () => {
        try {
          let res;
          if (!this.url) {
            res = await this.getData();
          } else {
            res = await this.searchData();
          }
          this.tableData = res.data[this.datamap["list"]];
          this.total = res.data[this.datamap["total"]];
        } catch (error) {
          console.log(error);
        } finally {
          this.tableLoading = false;
        }
      });
    },
    refreshData() {
      this.currentPage = 1;
      this.loadData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadData();
    },
    handlePageChange(val) {
      this.currentPage = val;
      this.loadData();
    }
  }
};
</script>
<style lang="scss" scoped>
.z-table-wrap {
  width: 100%;
}
.table-pagination {
  text-align: center;
  margin: 20px 20px 0;
  display: flex;
  justify-content: center;
}
</style>

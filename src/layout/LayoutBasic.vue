<template>
  <div class="layout-basic">
    <el-scrollbar class="layout-scrollbar">
      <layout-default />
    </el-scrollbar>
  </div>
</template>
<script>
import LayoutDefault from "./LayoutDefault.vue";
export default {
  components: {
    LayoutDefault
  }
};
</script>
<style lang="scss">
.layout-basic {
  height: 100%;
}
.layout-scrollbar {
  height: 100%;
  margin-top: 0;
  .el-scrollbar__wrap {
    overflow: hidden scroll;
    height: 100%;
  }
  .el-scrollbar__bar {
    z-index: 30;
  }
}
</style>

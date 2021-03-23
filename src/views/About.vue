<template>
  <div class="layout-page">
    <h1>This is an about page</h1>
    <ul>
      <li class="list-item" v-for="item in lists" :key="item">{{ item }}</li>
    </ul>
    <el-button type="primary" size="me">按钮</el-button>
    <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
    </el-switch>
    <svg-icon class-name="ai-icon" icon-class="ai" />
    <div style="height:1700px;">a</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      lists: [1, 2, 3]
    };
  },
  mounted() {},
  created() {},
  methods: {
    click() {}
  }
};
</script>
<style lang="scss">
.list-item {
  color: $menuText;
}
.ai-icon {
  color: red;
}
</style>

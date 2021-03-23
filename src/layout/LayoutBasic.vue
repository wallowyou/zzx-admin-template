<template>
  <div class="layout-basic" :class="isCollapse ? 'layout-basic__collapse' : ''">
    <layout-header />
    <layout-aside />
    <section class="layout-content">
      <el-scrollbar ref="pscroll" class="page-scroll">
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key" />
        </transition>
      </el-scrollbar>

      <el-backtop
        target=".page-scroll .el-scrollbar__wrap"
        :bottom="100"
        :visibility-height="300"
      ></el-backtop>
    </section>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ResizeMixin from "./mixin/ResizeHandler";
import LayoutHeader from "./AppHeader/index.vue";
import LayoutAside from "./Sidebar/index.vue";
export default {
  components: {
    LayoutHeader,
    LayoutAside
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters(["sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
    key() {
      return this.$route.path;
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
      if (this.$refs["pscroll"].wrap) {
        this.$refs["pscroll"].wrap.scrollTop = 0;
      }
    }
  }
};
</script>
<style lang="scss">
.page-scroll {
  height: 100%;
  .el-scrollbar__wrap {
    overflow: hidden auto;
  }
}
</style>

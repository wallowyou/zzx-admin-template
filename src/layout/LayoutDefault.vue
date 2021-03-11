<template>
  <div class="layout-default layout-default__fixed">
    <layout-header />
    <layout-aside />
    <section class="layout-default_content">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </section>
  </div>
</template>
<script>
import LayoutHeader from "./AppHeader/index.vue";
import LayoutAside from "./Sidebar/index.vue";
export default {
  components: {
    LayoutHeader,
    LayoutAside
  },
  computed: {
    key() {
      return this.$route.path;
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    }
  }
};
</script>
<style lang="scss">
.layout-default {
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  min-height: 100%;
  overflow-x: hidden;
}
.layout-default_content {
  margin-top: $headerHeight;
  margin-left: $sidebarWidth;
}
.layout-default__fixed {
  .layout-default-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
  }
  .layout-default-aside {
    position: fixed;
  }
}
</style>

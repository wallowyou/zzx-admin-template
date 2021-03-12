<template>
  <div
    class="layout-default layout-default__fixed"
    :class="isCollapse ? 'layout-default__collapse' : ''"
  >
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
import { mapGetters } from "vuex";
import LayoutHeader from "./AppHeader/index.vue";
import LayoutAside from "./Sidebar/index.vue";
export default {
  components: {
    LayoutHeader,
    LayoutAside
  },
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
.layout-default__collapse {
  .layout-default-aside {
    width: $sidebarCollapseWidth;
  }
  .layout-default_content {
    margin-top: $headerHeight;
    margin-left: $sidebarCollapseWidth;
  }
  .header-logo {
    width: $sidebarCollapseWidth;
  }
  .logo-img {
    max-width: 40px;
  }
  .user-info {
    display: none;
  }
}
</style>

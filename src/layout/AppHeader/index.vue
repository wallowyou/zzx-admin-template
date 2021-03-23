<template>
  <div class="layout-header">
    <div class="header-nav-wrap">
      <ul class="header-nav-left header-nav">
        <li>
          <div class="header-nav-item" @click="toggleSideBar">
            <svg-icon
              :icon-class="isCollapse ? 'toggle-right' : 'toggle-left'"
              class-name="toggle-icon"
            ></svg-icon>
          </div>
        </li>
      </ul>
      <ul class="header-nav-right header-nav">
        <li>
          <alarm class="header-nav-item" />
        </li>
        <li>
          <full-screen class="header-nav-item" />
        </li>
        <li>
          <user-menu class="header-nav-item" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import FullScreen from "./components/FullScreen";
import Alarm from "./components/Alarm";
import UserMenu from "./components/UserMenu";
export default {
  components: {
    FullScreen,
    Alarm,
    UserMenu
  },
  computed: {
    ...mapGetters(["sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    }
  }
};
</script>
<style lang="scss">
.layout-header {
  height: $headerHeight;
  display: flex;
  z-index: 10;
  align-items: center;
  width: 100%;
  background: $headerBg;
  color: $headerColor;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.07);
  padding-left: $sidebarWidth;
  transition: padding-left ease-in-out 0.3s;
  position: fixed;
  top: 0;
  left: 0;
}
.app-placeholder {
  width: $sidebarWidth;
  height: 100%;
}
.header-nav-wrap {
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: 0 16px;
}
.header-nav {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    padding: 0;
    display: inline-block;
    vertical-align: middle;
  }
}
.header-nav-item {
  display: block;
  min-width: 50px;
  padding: 8px 2px;
  line-height: 100%;
  text-align: center;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background: #9699e9;
    color: #ffffff;
    .el-dropdown {
      color: #ffffff;
    }
  }
}
</style>
<style lang="scss" scoped>
.header-nav-item {
  .toggle-icon {
    width: 20px;
    height: 20px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>

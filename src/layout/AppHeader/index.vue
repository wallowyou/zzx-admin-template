<template>
  <div class="layout-default-header layout-header__fixed">
    <div class="header-logo">
      <Logo />
    </div>
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
import Logo from "./components/Logo";
import FullScreen from "./components/FullScreen";
import Alarm from "./components/Alarm";
import UserMenu from "./components/UserMenu";
export default {
  components: {
    Logo,
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
.layout-default-header {
  height: $headerHeight;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  background-color: $primaryColor;
  color: #ffffff;
  box-sizing: border-box;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
}
.header-logo {
  width: $sidebarWidth;
  margin-left: -16px;
  transition: width 0.2s cubic-bezier(0.25, 0, 0.15, 1);
}
.header-nav-wrap {
  display: flex;
  flex: 1;
  justify-content: space-between;
}
.header-nav {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    padding: 0;
    margin: 0 6px;
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

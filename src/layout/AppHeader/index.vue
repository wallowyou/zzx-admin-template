<template>
  <div class="layout-default-header layout-header__fixed">
    <div class="header-logo">
      <Logo />
    </div>
    <div class="header-nav-wrap">
      <ul class="header-nav-left header-nav">
        <li>
          <div class="header-nav-item">
            <svg-icon
              icon-class="toggle-left"
              class-name="toggle-icon"
            ></svg-icon>
          </div>
        </li>
      </ul>
      <div class="header-nav-right"></div>
    </div>
  </div>
</template>
<script>
import Logo from "./Logo.vue";
export default {
  components: {
    Logo
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
.header-nav-left {
}
.header-nav {
  padding: 0;
  margin: 0;
  list-style-type: none;
  li {
    padding: 0;
    margin: 0;
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

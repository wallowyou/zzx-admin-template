<template>
  <div class="layout-aside">
    <div class="layout-aside__inner">
      <div class="aside-logo">
        <logo />
      </div>
      <div class="aside-avatar">
        <div class="avator-img">
          <img src="@/assets/images/avatar.png" alt="" />
        </div>
        <div class="user-info">
          <div class="user-info__name">张无忌</div>
          <div class="user-info__email">zwj@qq.com</div>
        </div>
      </div>
      <div class="aside-navbar">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="true"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item
            v-for="route in routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </div>
    </div>
  </div>
</template>
<script>
import Logo from "./Logo.vue";
import SidebarItem from "./SidebarItem.vue";
import { mapGetters } from "vuex";
import variables from "@/styles/variables.scss";
export default {
  components: {
    SidebarItem,
    Logo
  },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$router.options.routes.filter(route => !route.hidden);
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
<style lang="scss">
.layout-aside {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 12;
  height: 100%;
  width: $sidebarWidth;
  // margin-top: $headerHeight;
  overflow: hidden;
  background-color: $sidebarBgColor;
  color: $sidebarColor;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transition: width 0.2s;
}
.layout-aside__inner {
  height: 100%;
  border-right: 1px solid #cccccc;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none; //IE 10+
  overflow: -moz-scrollbars-none; //Firefox
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
.aside-logo {
  height: $headerHeight;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.aside-avatar {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
}
.user-info {
  padding-left: 10px;
  font-size: 12px;
}
.user-info__name {
  margin-bottom: 5px;
}
.aside-navbar {
  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
    text-decoration: none;
  }
  .svg-icon {
    padding-right: 12px;
  }
  .el-menu {
    border-right: none;
  }

  // 菜单栏折叠样式隐藏标题和箭头
  .el-menu--collapse {
    .el-submenu {
      & > .el-submenu__title {
        & > span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
        & > i {
          visibility: hidden;
        }
      }
    }
    .svg-icon {
      padding-right: 0;
    }
  }
  // 导航栏激活状态样式
  .el-menu-item.is-active.submenu-title-noDropdown {
    color: $subMenuActiveText !important;
    background: $menuActiveBg !important;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
  }
  li.is-active .submenu-title-noDropdown {
    background: $menuHover !important;
    border-radius: 5px;
    margin: 0 5px;
  }
  .is-active > .el-submenu__title > span {
    color: #fff;
  }
  .is-active > .el-submenu__title > svg {
    color: #fff;
  }
  .is-active > .el-submenu__title > .el-icon-arrow-down {
    color: #fff;
  }
  .nest-menu {
    .el-menu-item.is-active {
      color: $subMenuActiveText !important;
      background: $menuActiveBg !important;
      border-radius: 5px;
    }
  }
}
.el-menu--vertical {
  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
    text-decoration: none;
  }
}
</style>
<style lang="scss" scoped>
.avator-img {
  width: 40px;
  height: 40px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>

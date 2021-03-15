<template>
  <div class="layout-default-aside">
    <div class="layout-aside__inner">
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
import SidebarItem from "./SidebarItem.vue";
import { mapGetters } from "vuex";
import variables from "@/styles/variables.scss";
export default {
  components: {
    SidebarItem
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
.layout-default-aside {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 10;
  width: $sidebarWidth;
  margin-top: $headerHeight;
  overflow: hidden;
  background-color: #fff;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transition: width 0.2s cubic-bezier(0.25, 0, 0.15, 1) translate 0.2s
    cubic-bezier(0.25, 0, 0.15, 1);
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
  .el-menu-item.is-active.submenu-title-noDropdown {
    border-left: 2px solid $primaryColor;
  }
  .el-submenu.is-active {
    border-left: 2px solid $primaryColor;
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

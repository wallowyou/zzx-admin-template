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
        <sidebar-item />
      </div>
    </div>
  </div>
</template>
<script>
import SidebarItem from "./SidebarItem.vue";
export default {
  components: {
    SidebarItem
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

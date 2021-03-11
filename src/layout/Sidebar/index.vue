<template>
  <div class="layout-default-aside">
    <div class="layout-aside__inner">
      我是侧边栏
      <div style="height: 900px;"></div>
    </div>
  </div>
</template>
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
  transition: width 0.2s cubic-bezier(0.25, 0, 0.15, 1),
    translate 0.2s cubic-bezier(0.25, 0, 0.15, 1);
}
.layout-aside__inner {
  height: 100%;
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
</style>

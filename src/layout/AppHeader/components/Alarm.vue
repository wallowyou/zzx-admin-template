<template>
  <div>
    <el-badge :is-dot="true" class="alarm-badge">
      <svg-icon icon-class="bell" class-name="bell-svg"></svg-icon>
    </el-badge>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.alarm-badge {
  .bell-svg {
    width: 20px;
    height: 20px;
  }
}
</style>

<template>
  <div class="user-menu-wrap">
    <el-dropdown trigger="click" @command="handleCommand">
      <div class="user-menu">
        <img class="user-img" src="@/assets/images/avatar.png" alt="" />
        <span style="margin-left:6px;">
          Admin
        </span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>配置</el-dropdown-item>
        <!-- <el-divider></el-divider> -->
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  methods: {
    handleLogout() {
      console.log("aa");
      this.$store
        .dispatch("user/logout")
        .then(() => {
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        })
        .catch(() => {});
    },
    handleCommand(e) {
      if (e === "logout") {
        this.handleLogout();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.user-menu {
  color: #ffffff;
  font-size: 12px;
}
.user-img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  vertical-align: middle;
}
</style>

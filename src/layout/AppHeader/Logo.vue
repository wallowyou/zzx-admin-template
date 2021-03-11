<template>
  <div class="header-logo__inner">
    <router-link :to="{ path: '/' }" class="logo-link">
      <img src="@/assets/images/logo.png" alt="" style="max-height: 30px;" />
    </router-link>
  </div>
</template>
<style lang="scss">
.header-logo__inner {
  height: 100%;
}
.logo-link {
  display: block;
  text-align: center;
}
</style>

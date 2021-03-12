<template>
  <div class="header-logo__inner">
    <router-link :to="{ path: '/' }" class="logo-link">
      <img src="@/assets/images/logo.png" alt="" class="logo-img" />
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
.logo-img {
  max-height: 30px;
}
</style>

<template>
  <div class="login-page">
    <div class="login-container">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        auto-complete="on"
      >
        <div class="title-container">
          <h3 class="title">登录</h3>
        </div>
        <div class="login-row">
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="请输入用户名"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="off"
              prefix-icon="el-icon-search"
            />
          </el-form-item>
        </div>
        <div class="login-row">
          <el-form-item prop="username">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              prefix-icon="el-icon-key"
              @keyup.enter.native="handleLogin"
            >
              <i class="el-icon-view" slot="suffix" @click="showPwd"></i>
            </el-input>
          </el-form-item>
        </div>
        <div class="login-row login-checkout">
          <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
          <a class="forget-pass">忘记密码</a>
        </div>
        <div class="login-row">
          <el-button
            type="primary"
            class="login-btn"
            @click="handleLogin"
            :loading="loading"
            >登录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "admin",
        rememberMe: false
      },
      loginRules: {
        username: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              console.log(this.redirect);
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    }
  }
};
</script>
<style lang="scss">
.login-page {
  width: 100%;
  height: 100%;
  background: url("../../../assets/images/login-bg.jpg") no-repeat;
  background-size: cover;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.login-container {
  width: 450px;
  height: 560px;
  background: #ffffff;
  box-shadow: 0px 20px 20px 0px rgba(159, 161, 212, 0.15);
  border-radius: 20px;
}
.login-row {
  width: 310px;
  height: 44px;
  margin: 20px auto;
}
.login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.login-btn {
  width: 310px;
  height: 44px;
  background: #373974;
  border-radius: 2px;
}
.login-checkout {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  font-size: 12px;
  color: #373974;
}
.title-container {
  .title {
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #373974;
    line-height: 50px;
    text-align: center;
  }
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}
</style>

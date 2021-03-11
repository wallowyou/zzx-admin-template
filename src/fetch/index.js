/* 
    封装axios请求,增加请求失败自动重新请求，以及取消重复未完成的请求
*/

import axios from "axios";
// import { Notification, MessageBox } from "element-ui";
// import store from "@/store";
// import router from "@/router";
// import { removeToken, removeExpires } from "@/utils/auth";

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000
});
/*  设置请求失败自动重连的参数, 此处设置的是所有请求都会失败自动重连，
    考虑到不是所有的请求都需要，可能只是特定请求有此需求，所以配置的retry个retryDelay可以放到每个请求的config
*/
// service.defaults.retry = 3
// service.defaults.retryDelay = 2000

/* TODO
  是否需要增加取消重复的上一个请求未完成的请求 如果需要参照axios文档
*/

/* 定义一个全局变量防止多个请求返回401的时候多次出现弹框*/

service.defaults.authnum = 0;

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 此处除了登录请求其他一律需要在请求头加上token
    // if (store.getters.token) {
    //   // 除了登陆请求，其他请求都需要带上请求头
    //   if (config.url !== "/auth/login") {
    //     config.headers["Authorization"] = "Bearer " + getToken();
    //   }
    // }
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// 返回拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  error => {
    /* 返回拦截器,统一处理请求失败的情况*/
    console.log("err" + error);
    const status = error.response.status;
    console.log(status);
    // service.defaults.authnum++;

    /* 此处根据不同的状态码做不同的操作*/

    // switch (status) {
    //   case 401:
    //     if (service.defaults.authnum === 1) {
    //       MessageBox.confirm(
    //         "登录信息token已过期，请点击确认重新登录",
    //         "确认信息",
    //         {
    //           distinguishCancelAndClose: true,
    //           confirmButtonText: "跳转到登录页面",
    //           cancelButtonText: "取消"
    //         }
    //       )
    //         .then(() => {
    //           console.log("点击了确认");
    //           removeToken();
    //           removeExpires();
    //           service.defaults.authnum = 0;
    //           router.push({
    //             path: "/login"
    //           });
    //         })
    //         .catch(action => {
    //           console.log(action);
    //           service.defaults.authnum = 0;
    //         });
    //     }
    //     break;
    //   case 404:
    //     Notification({
    //       title: "请求失败: 404",
    //       message: error,
    //       type: "error"
    //     });
    //     break;
    //   case 500:
    //     Notification({
    //       title: "请求失败,服务器状态: 500",
    //       message: error,
    //       type: "error"
    //     });
    //     break;
    //   default:
    //     Notification({
    //       title: "请求失败",
    //       message: error,
    //       type: "error"
    //     });
    // }
    const config = error.config;
    if (!config || !config.retry) return Promise.reject(error);
    config._retryCount = config._retryCount || 0;
    if (config._retryCount >= config.retry) {
      return Promise.reject(error);
    }
    config._retryCount += 1;
    const backoff = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, config.retryDelay || 1000);
    });
    return backoff.then(() => {
      return service(config);
    });
  }
);

// 导出一个axios实例

export default service;

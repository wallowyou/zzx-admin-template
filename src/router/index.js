import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout/LayoutBasic.vue";

Vue.use(VueRouter);

/* 静态路由
   不需要任何权限就可以进入的页面
*/
const constantRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
        meta: { title: "首页", icon: "home" }
      }
    ]
  },
  {
    path: "/about",
    component: Layout,
    redirect: "/about/index",
    children: [
      {
        path: "index",
        name: "AboutIndex",
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/About.vue"),
        meta: { title: "关于", icon: "about" }
      }
    ]
  },
  {
    path: "/test",
    component: Layout,
    redirect: "/test/index",
    meta: { title: "测试", icon: "test" },
    children: [
      {
        path: "index",
        name: "TestIndex",
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "test" */ "@/views/test/index.vue"),
        meta: { title: "测试主页" }
      },
      {
        path: "table",
        name: "Table",
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "table" */ "@/views/test/table.vue"),
        meta: { title: "表格" }
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/passport/login/login.vue"
      )
  }
];

const createRouter = () =>
  new VueRouter({
    mode: "hash", // 路由模式 hash or history
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });
const router = createRouter();

// resetRouter 重置路由
export const resetRouter = () => {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
};
export default router;

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
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue")
      },
      {
        path: "about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/About.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
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

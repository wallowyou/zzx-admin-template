"use strict";
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: {},
    before: require("./mock/mock-server.js") // 开发环境下启动本地mocker数据
  },
  css: {
    loaderOptions: {
      /* 
      给 sass-loader 传递选项
    具体参考文档https://cli.vuejs.org/zh/guide/css.html#css-modules
      */
      sass: {
        prependData: `@import "~@/styles/variables.sass"`
      },
      scss: {
        prependData: `@import "~@/styles/variables.scss";`
      }
    }
  },

  configureWebpack: () => {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    let newconfig = {
      resolve: {
        alias: {
          "@": resolve("src")
        }
      }
    };
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      newconfig = {
        ...newconfig,
        plugins: [
          new CompressionPlugin({
            algorithm: "gzip",
            test: /\.(js|css)$/, // 匹配文件名
            threshold: 10240, // 对超过10k的数据压缩
            deleteOriginalAssets: false, // 不删除源文件
            minRatio: 0.8 // 压缩比
          })
        ]
      };
    }
    return newconfig;
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // only package third parties that are initially dependent
        },
        elementUI: {
          name: "chunk-elementUI", // split elementUI into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
        },
        commons: {
          name: "chunk-commons",
          test: resolve("src/components"), // can customize your rules
          minChunks: 3, //  minimum common number
          priority: 5,
          reuseExistingChunk: true
        }
      }
    });
    // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
    config.optimization.runtimeChunk("single");
  }
};

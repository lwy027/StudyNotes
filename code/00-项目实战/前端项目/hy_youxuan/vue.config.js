const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      less: {
        // 这里的选项会传递给 less-loader
        additionalData: `@import url(@/assets/css/index.less);`,
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    }
  },
   // 代理 http
   devServer: {
    proxy: {
      // '/clue': {
      //   target: 'http://172.16.121.73:8765',
      //   ws: true,
      //   changeOrigin: true
      // },


      // http://localhost:8010/youxuan /api/column/29
      // http://xiongmaoyouxuan.com /api/column/29
      '/youxuan/api': {
        target: 'http://xiongmaoyouxuan.com', // xiongmaoyouxuan 远程
        ws: true,
        changeOrigin: true,
        // pathRewrite: {'^/api' : ''}的含义是重写url地址，把url的地址里面含有 '/api' 这样的 替换成 '',相当于前端给后端一个统一的baseURL
        pathRewrite: {
          '^/youxuan/api': '/api'
        }
      }

    }
  }
})

// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })


module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    host: '47.95.219.31',
    // host:"localhost",
    port: 8087,
    https: false,
    // 以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: { // 配置跨域
      '/stu': {
        target: 'http://47.95.219.31:8089/',
        ws: true,
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/stu': ''
        }
      }
    }
  }
}

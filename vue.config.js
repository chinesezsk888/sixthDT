module.exports = {
  outputDir: process.env.outputDir,
  publicPath: '/wap/v6',
  filenameHashing: false,
  productionSourceMap: false,
  pages: {
    DtAggregate: {
      entry: './src/pages/DtAggregate/main.js',
      template: './src/pages/DtAggregate/index.html',
      filename: 'dtaggregate.html'
    },
    DtDetail: {
      entry: './src/pages/DtDetail/main.js',
      template: './src/pages/DtDetail/index.html',
      filename: 'dtdetail.html'
    }
  },
  configureWebpack: config => {
    if (process.env.VUE_APP_ENV != 'development') {
      config.optimization.splitChunks.cacheGroups.vendors.name = 'vue_vendors'
      config.optimization.splitChunks.cacheGroups.common.minSize = 100000
      config.optimization.splitChunks.cacheGroups.vendors.minSize = 100000
      config.optimization.splitChunks.minSize = 100000
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 20000 }))
  }
}

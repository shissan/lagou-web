const common = require('./webpack.common')
const { merge } = require('webpack-merge')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    open: true,
    contentBase: './public',
    hotOnly: true
  },
  devtool: 'source-map'
})

const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    open: true,
    contentBase: './public',
    hot: true
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
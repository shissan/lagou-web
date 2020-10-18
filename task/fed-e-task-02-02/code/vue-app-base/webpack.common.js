const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: ['@babel/preset-env']
        //   }
        // },
        // exclude: /node_modules/
        loader: 'babel-loader',
        include: [path.resolve('src')]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            name: '[name].[ext]',
            esModule: false  //
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Vue webpack',
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css'
    }),
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify('')
    })
  ]
}
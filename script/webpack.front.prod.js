const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.front');

const prodConfig = webpackMerge(commonConfig, {
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
})

module.exports = prodConfig;
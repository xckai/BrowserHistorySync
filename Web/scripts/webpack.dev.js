const commonConfig = require('./webpack.commom');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
commonConfig.plugins.splice(0, 0, new ReactRefreshWebpackPlugin());
commonConfig.module.rules[3].use.options.plugins.splice(0, 0, 'react-refresh/babel');
module.exports = {
  ...commonConfig,
  mode: 'development',
  devtool: 'eval',
  // plugins: commonConfig.plugins.concat([new BundleAnalyzerPlugin()]),
  devServer: {
    compress: true,
    port: 9000,
    hot: true,
    historyApiFallback: true
  }
};

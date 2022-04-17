const commonConfig = require('./webpack.commom');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

commonConfig.plugins.splice(0, 0, new CleanWebpackPlugin());

module.exports = {
  ...commonConfig,
  mode: 'production'
};

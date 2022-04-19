const commonConfig = require("./webpack.commom");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
commonConfig.plugins.splice(
  0,
  0,
  new CleanWebpackPlugin(),
  new BundleAnalyzerPlugin()
);

module.exports = {
  ...commonConfig,
  mode: "production",
};

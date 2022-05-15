/*
 * @Date: 2021-05-03 14:49:30
 * @LastEditTime: 2021-05-03 15:05:43
 * @Description:
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const buildDistFolderPath = path.resolve(
  __dirname,
  "../../SyncManagerApi/wwwroot"
);
module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.tsx",
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
    new HtmlWebpackPlugin({ template: "src/index.html" }),
    new CopyWebpackPlugin({
      patterns: [{ from: "./src/public", to: buildDistFolderPath }],
    }),
    new ForkTsCheckerWebpackPlugin(),
    new WebpackManifestPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(ts|js)x?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry",
                  corejs: {
                    version: "3",
                    proposals: true,
                  },
                },
              ],
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              [
                "import",

                {
                  libraryName: "antd",
                  libraryDirectory: "lib",
                  style: true,
                },
                "antd",
              ],
              [
                "import",
                {
                  libraryName: "lodash",
                  libraryDirectory: "",
                  camel2DashComponentName: false, // default: true
                },
                "lodash",
              ],
              ["babel-plugin-styled-components"],
            ],
          },
        },
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
                // modifyVars: {
                //   'primary-color': 'red'
                // }
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "[name].[contenthash:8].js",
    path: buildDistFolderPath,
    publicPath: "/",
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: "tsconfig.json" })],
    extensions: [".tsx", ".ts", ".js"],
  },
  stats: {
    colors: true,
    env: true,
    errors: true,
    performance: true,
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};

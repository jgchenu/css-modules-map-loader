const path = require("path");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MapLoaderPlugin = require("./plugins/map-loader-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.base");
const clientConfig = {
  entry: "./src/client/index.js",
  output: {
    filename: "main.js",
    publicPath: "./", // 打包跟devServer给静态资源自动加上的路径前缀
    path: path.resolve(__dirname, "dist")
  },
  resolveLoader: {
    modules: ["node_modules", "./loaders"]
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "map-loader",
            options: {
              prefixIndex: 2
            }
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]"
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new MapLoaderPlugin({
      filename: "map.json"
    })
  ],
  devServer: {
    contentBase: "./"
  }
};
module.exports = merge(baseConfig, clientConfig);

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-source-map",
  performance: {
    hints: false,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "./"),
    },
    historyApiFallback: true,
    hot: true,
    liveReload: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"), // to import index.html file inside index.js
      title: "Flow Builder",
      filename: "index.html",
    }),
  ],
});

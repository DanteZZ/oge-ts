const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./examples/typescript/index.ts",
  output: {
    filename: "bundle.min.js",
    path: path.resolve(__dirname, "examples/typescript/dist"),
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js"],
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader" },
      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "oge.ts example",
      template: "examples/typescript/index.html",
      inject: "body",
    }),
  ],
};

const path = require("path");
module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "oge.min.js",
    path: path.resolve(__dirname, "dist"),
    library: "OGE",
    libraryExport: "default",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js"],
  },
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }],
  },
};

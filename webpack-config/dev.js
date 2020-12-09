"use strict";
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let base = require("./base.js");

let updates = {
  mode: "development",
  devServer: {
    port: 8888
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ]
};

module.exports = Object.assign(base, updates);

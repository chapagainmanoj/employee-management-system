"use strict";
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let base = require("./base.js");

let updates = {
  mode: "development",
  devtool: "source-map",
  watchOptions: {
    ignored: ["node_modules/**"],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      DEBUG: true,
      CDN_HOST: process.env.CDN_HOST,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};

module.exports = Object.assign({}, base, updates);

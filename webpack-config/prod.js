"use strict";
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
let base = require("./base.js");

let updates = {
  mode: "production",
  devtool: "source-map",
  watchOptions: {
    ignored: ["node_modules/**"],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      DEBUG: false,
      CDN_HOST: process.env.CDN_HOST,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
  },
};

module.exports = Object.assign({}, base, updates);

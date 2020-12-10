"use strict";

const path = require("path");
const projectRoot = path.dirname(__dirname);
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const CDN_HOST = process.env.CDN_HOST;

module.exports = {
  mode: 'production',
  entry: path.join(projectRoot, "src/index.js"),
  output: {
    filename: "app.js",
    path: path.join(projectRoot, "assets/"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          // {
          //   loader: "style-loader", // creates style nodes from JS strings
          // },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: '[name].[ext]',
          publicPath: `${CDN_HOST}/assets/`,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
  },
};

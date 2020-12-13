"use strict";

const path = require("path");
const projectRoot = path.dirname(__dirname);
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const CDN_HOST = process.env.CDN_HOST;

module.exports = {
  entry: {
    app: path.join(projectRoot, "src/index.js"),
    loginjoin: path.join(projectRoot, "src/loginjoin/index.js"),
  },
  output: {
    filename: "[name].js",
    path: path.join(projectRoot, "assets/"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(less)$/,
        exclude: [/node_modules/],
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
        exclude: [/node_modules/],
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]--[hash:base64:5]",
              },
              importLoaders: 2,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
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
      filename: "./index.html",
    }),
  ],
};

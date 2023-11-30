const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ProvidePlugin } = require("webpack");
const env = require("process");
// 빌드하는 것의 용량 보기
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// performance Guide

// 자바스크립에서 타입스크립트 처럼 타입 맞춰서 쓰고 싶을때 사용
/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": __dirname + "/src",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: {
          target: "es2020",
        },
      },
      {
        test: /\.(gif|jpg|png|webp|svg|mp4)$/,
        type: "asset/resource",
      },
    ],
  },
  output: {
    filename: "js/[name]-[chunkhash].js",
    assetModuleFilename: "asset/[hash][ext][query]",
    path: __dirname + "/dist",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new ProvidePlugin({
      React: "react",
    }),

    // 번들 분석기
    !env.WEBPACK_SERVE
      ? new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
        })
      : null,
  ],
  devServer: {
    historyApiFallback: true,
    static: "./dist",
    open: true,
  },
  // 빌드 캐시 최적화
  cache: {
    type: env.WEBPACK_SERVE ? "memory" : "filesystem",
  },
  // 소스맵 최적화
  devtool: env.WEBPACK_SERVE ? "eval-cheap-module-source-map" : false,
};

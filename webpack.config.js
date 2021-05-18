require('dotenv').config()
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production'

console.log(`Environment: ${process.env.NODE_ENV}`)

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: ['./src/index.js','./src/styles.css'],
  plugins: [
    new FaviconsWebpackPlugin({
      mode: 'webapp',
      manifest: './manifest.json'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin(),
    new HTMLInlineCSSWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: !devMode,
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 5000,
  },
}

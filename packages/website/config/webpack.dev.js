/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base');

const ROOT = path.resolve(__dirname, '..');
const srcPath = 'src';
const distPath = 'dev';

module.exports = merge(baseConfig({ distPath }), {
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    // http://vue-loader.vuejs.org/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: path.join(ROOT, distPath, 'index.html'),
      template: path.join(ROOT, srcPath, 'index.html'),
      inject: true,
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
    }),
  ],
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: path.join(srcPath, 'index.html') },
      ],
    },
    noInfo: true,
  },
});

/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.base');

const ROOT = path.resolve(__dirname, '..');
const srcPath = 'src';
const distPath = 'public';
const basepath = process.env.APP_BASEPATH || `/public/${process.env.BUDDY_PARSE_APP_ID}`;
const nodeModules = path.join(ROOT, 'node_modules');

module.exports = merge(baseConfig({ distPath }), {
  output: {
    publicPath: basepath,
    filename: path.join('js', '[name].[chunkhash].js'),
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    // http://vue-loader.vuejs.org/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),

    // uglify-js settings for production build
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false,
      },
    }),

    // extract css into its own file
    new ExtractTextPlugin(path.join('css', '[name].[contenthash].css')),

    // minify output
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: path.join(ROOT, distPath, 'index.html'),
      template: path.join(ROOT, srcPath, 'index.html'),
      inject: true,
      minify: {
        removeComments: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
    }),

    // split vendor js into its own file
    // prevents hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => (resource && /\.js$/.test(resource) && resource.indexOf(nodeModules) === 0),
    }),

    // extract webpack runtime and module manifest into its own file
    // prevents hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'],
    }),
  ],
  performance: {
    hints: 'warning',
  },
});

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.base');

const ROOT = path.resolve(__dirname, '..');
const srcPath = 'src';
const distPath = 'dist';
const basepath = 'whatever';

module.exports = merge(baseConfig, {
  output: {
    filename: path.join('js', '[name].[chunkhash].js'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
          // other vue-loader options go here
        },
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


    // minify output
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    // extract css into its own file
    new ExtractTextPlugin(path.join('css', 'style.[contenthash].css')),

    // uglify-js settings for production build
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
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
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        const nodeModules = path.join(ROOT, 'node_modules');
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(nodeModules) === 0
        );
      },
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

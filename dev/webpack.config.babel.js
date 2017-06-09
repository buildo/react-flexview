import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpackBase, { paths } from './webpack.base.babel';

export default {
  ...webpackBase,

  entry: [
    'webpack/hot/dev-server',
    paths.ENTRY
  ],

  devtool: 'source-map',

  devServer: {
    host: '0.0.0.0',
    contentBase: paths.BUILD,
    port: '8080'
  },

  module: {
    ...webpackBase.module,
    loaders: webpackBase.module.loaders.concat([{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')
    }])
  },

  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    new HtmlWebpackPlugin({ inject: false, template: paths.INDEX_HTML }),
    new ExtractTextPlugin('style', 'style.[hash].min.css')
  ]
};

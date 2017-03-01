import path from 'path';

export const paths = {
  SRC: path.resolve(__dirname, '../src'),
  ENTRY: path.resolve(__dirname, 'examples.js'),
  INDEX_HTML: path.resolve(__dirname, 'index.html'),
  BUILD: path.resolve(__dirname, 'build'),
  DEV: path.resolve(__dirname)
};

export default {
  output: {
    path: paths.BUILD,
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: [paths.SRC, paths.DEV]
      }
    ],
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: [paths.SRC, paths.DEV],
        exclude: /node_modules/
      }
    ]
  }
};

const webpack = require('webpack')
const path = require('path')
const postCssMixins = require('postcss-mixins')
const postCssNext = require('postcss-cssnext')({
  browsers: ['ie > 8', 'last 2 versions'],
})

module.exports = {
  entry: ['./src/notie.js'],
  output: {
    path: path.join(__dirname, 'browser'),
    filename: 'notie.js',
    libraryTarget: 'var',
    library: 'notie',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' },
      {
        test: /\.css$/, loader: 'style!css!postcss',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline',
      },
    ],
  },
  postcss() {
    return [
      postCssMixins,
      postCssNext,
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
}

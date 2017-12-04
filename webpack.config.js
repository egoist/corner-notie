const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: ['./src/notie.js'],
  output: {
    path: path.join(__dirname, 'browser'),
    filename: 'notie.js',
    libraryTarget: 'umd',
    library: 'notie',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'postcss-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  plugins: [
    /*
     * See the note in the README about Webpack
     * It does not support OccurenceOrderPlugin (Webpack has now its own validation built-in)
     * new webpack.optimize.OccurenceOrderPlugin(),
    */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
}

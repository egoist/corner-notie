import webpack from 'webpack'
import gulp from 'gulp'
import babel from 'gulp-babel'
import webpackStream from 'webpack-stream'
import serve from 'gulp-serve'

const webpackConfig = {
  watch: true,
  output: {
    filename: 'notie.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' },
      {
        test: /\.css$/, loader: 'style!css!postcss'
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline'
      }
    ],
  },
  postcss () {
    return [
      require('postcss-mixins'),
      require('postcss-nested'),
      require('cssnext')()
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
}

gulp.task('serve', serve({
  port: 3746,
  root: '.'
}))

gulp.task('babel', () => {
  gulp.src('./src/notie.js')
    .pipe(babel())
    .pipe(gulp.dest('./'))
})

gulp.task('browser', () => {
  gulp.src('./src/browser.js')
  .pipe(webpackStream(webpackConfig))
  .pipe(gulp.dest('./browser'))
})

gulp.task('webpack', () => {
  const config = Object.assign({}, webpackConfig)
  config.output.libraryTarget = 'commonjs'
  gulp.src('./src/notie.js')
  .pipe(webpackStream(config))
  .pipe(gulp.dest('./'))
})

gulp.task('watch', () => {
  gulp.watch('./src/notie.js', ['babel'])
})

gulp.task('build', ['babel', 'webpack', 'browser'])

gulp.task('default', ['build', 'watch', 'serve'])

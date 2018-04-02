'use strict';
const gulp          = require('gulp');
const webpack       = require('webpack');
const gutil         = require('gulp-util');
const notify        = require('gulp-notify');
const config        = require('../config');
const webpackConfig = require('../../webpack.config').createConfig;




gulp.task('webpack', cb => {
  webpack(webpackConfig(config.env)).run((err, stats) => {
    handler(err, stats, cb);
  });
});

gulp.task('webpack:watch', cb => {
  webpack(webpackConfig(config.env)).watch({
    aggregateTimeout: 100,
    poll: false
  }, handler);

  cb();
});



function handler(err, stats, cb) {
  const errors = stats.compilation.errors;

  if (err) throw new gutil.PluginError('webpack', err);

  if (errors.length > 0) {
    notify.onError({
      title: 'Webpack Error',
      message: '<%= error.message %>'
    }).apply(null, errors);
  }

  gutil.log('[webpack]', stats.toString({
    colors: true,
    chunks: true // информация о распределении модулей по чанкам в консоли
  }));

  if (typeof cb === 'function') cb();
}

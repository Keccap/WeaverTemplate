'use strict';
const gulp           = require('gulp');
const plumber        = require('gulp-plumber');
const changed        = require('gulp-changed');
const imagemin       = require('gulp-imagemin');
const jpegrecompress = require('imagemin-jpeg-recompress');
const pngquant       = require('imagemin-pngquant');
const cache          = require('gulp-cache');
const config         = require('../config');




gulp.task('imagemin', () => {
  return gulp
    .src([
      config.src.img + '/**/*.{jpg,jpeg,png,gif}'
    ])
    .pipe(plumber({
      errorHandler: config.errorHandler('Imagemin')
    }))
    .pipe(changed(config.dest.img))
    .pipe(cache(imagemin([
      imagemin.gifsicle({interlaced: true}),
      pngquant(),
      jpegrecompress({quality: 'high', min: 80})
    ], {verbose: true})))
    .pipe(gulp.dest(config.dest.img));
});



gulp.task('imagemin:watch', cb => {
  const watcher = gulp.watch([
    config.src.img + '/**/*.{jpg,jpeg,png,gif}'
  ], gulp.series('imagemin'));

  watcher.on('all', config.syncChange());

  cb();
});




gulp.task('clearcache', () => cache.clearAll());


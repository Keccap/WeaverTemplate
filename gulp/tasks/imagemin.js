'use strict';
const gulp           = require('gulp');
const plumber        = require('gulp-plumber');
const changed        = require('gulp-changed');
const imagemin       = require('gulp-imagemin');
const mozjpeg        = require('imagemin-mozjpeg');
const pngquant       = require('imagemin-pngquant');
const cache          = require('gulp-cache');
const config         = require('../config');




gulp.task('imagemin', () => {
  return gulp
    .src([
      config.src.img + '/**/*.{jpg,jpeg,png,gif}',
      '!' + config.src.img + '/{imagemin-exceptions,svgo}/**/*.*'
    ])
    .pipe(plumber({
      errorHandler: config.errorHandler('Imagemin')
    }))
    .pipe(changed(config.dest.img))
    .pipe(cache(imagemin([
      pngquant(),
      mozjpeg({
        progressive: true
      })
    ])))
    .pipe(gulp.dest(config.dest.img));
});



gulp.task('imagemin:watch', cb => {
  const watcher = gulp.watch([
    config.src.img + '/**/*.{jpg,jpeg,png,gif}',
    '!' + config.src.img + '/{imagemin-exceptions,svgo}/**/*.*'
  ], gulp.series('imagemin'));

  watcher.on('all', config.syncChange());

  cb();
});




gulp.task('clearcache', () => cache.clearAll());


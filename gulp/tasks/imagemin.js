const gulp           = require('gulp');
const plumber        = require('gulp-plumber');
const imagemin       = require('gulp-imagemin');
const mozjpeg        = require('imagemin-mozjpeg');
const pngquant       = require('imagemin-pngquant');
const cache          = require('gulp-cache');
const config         = require('../config');


function imageminFunc() {
  return gulp.src(config.dest.img + '/**/*.{jpg,jpeg,png,gif}')
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(cache(imagemin([
      pngquant(),
      mozjpeg({
        progressive: true
      })
    ]))) // Cache Images
    .pipe(gulp.dest(config.dest.img));
}


gulp.task('imagemin', () => {
  return imageminFunc();
});






gulp.task('clearcache', () => { return cache.clearAll(); });


const gulp           = require('gulp');
const plumber        = require('gulp-plumber');
const changed        = require('gulp-changed');
const imagemin       = require('gulp-imagemin');
const mozjpeg        = require('imagemin-mozjpeg');
const pngquant       = require('imagemin-pngquant');
const cache          = require('gulp-cache');
const config         = require('../config');



function imageminFunc() {
  return gulp.src(config.src.img + '/**/*.{jpg,jpeg,png,gif}')
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(changed(config.dest.img))
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



gulp.task('imagemin:watch', () => {
  let watcher = gulp.watch([config.src.img + '/**/*'], ['imagemin']);
  watcher.on('change', config.syncChange())
});




gulp.task('clearcache', () => { return cache.clearAll(); });


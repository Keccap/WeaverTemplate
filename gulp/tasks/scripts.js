const gulp         = require('gulp');
const rename       = require('gulp-rename');
const plumber      = require('gulp-plumber');
const uglify       = require('gulp-uglify');
const sourcemaps   = require('gulp-sourcemaps');
const concat       = require('gulp-concat');
const fileInclude  = require('gulp-file-include');
const babel        = require('gulp-babel');
const gulpif       = require('gulp-if');
const config       = require('../config');




gulp.task('scripts', () => {
  return gulp
    .src([
      config.src.js + '/libs.js',
      config.src.js + '/common.js'
    ])
    .pipe(plumber({
      errorHandler: config.errorHandler('Scripts')
    }))
    .pipe(gulpif(!config.production, sourcemaps.init()))
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulpif(file => file.stem === 'common', babel()))
    .pipe(concat('bundle.min.js'))
    .pipe(gulpif(config.production, uglify()))
    .pipe(gulpif(!config.production, sourcemaps.write()))
    .pipe(gulp.dest(config.dest.js));
});



gulp.task('scripts:watch', cb => {
  gulp.watch([
    config.src.libs + '/**/*.js',
    config.src.js + '/**/*.js'
  ], gulp.series('scripts'));

  cb();
});

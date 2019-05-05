'use strict';
const gulp         = require('gulp');
const config       = require('../config');




gulp.task('copy:rootfiles', () => {
  return gulp
    .src([
      config.src.root + '/*.pdf'
    ])
    .pipe(gulp.dest(config.dest.root));
});


gulp.task('copy:img', () => {
  return gulp
    .src([
      config.src.img + '/**/*.{svg,webp,ico}',
      config.src.img + '/imagemin-exceptions/**/*.{jpg,jpeg,png,gif,svg,webp,ico}',
      '!' + config.src.img + '/svgo/**/*.*'
    ])
    .pipe(gulp.dest(config.dest.img));
});


gulp.task('copy:fonts', () => {
  return gulp
    .src(config.src.fonts + '/**/*.{ttf,eot,woff,woff2}')
    .pipe(gulp.dest(config.dest.fonts));
});



gulp.task('copy', gulp.parallel(
  'copy:img',
  'copy:rootfiles',
  'copy:fonts'
));




gulp.task('copyRoot:watch', cb => {
  const watcher = gulp.watch([
    config.src.root + '/*.*'
  ], gulp.series('copy:rootfiles'));

  watcher.on('all', config.syncChange());

  cb();
});


gulp.task('copyImg:watch', cb => {
  const watcher = gulp.watch([
    config.src.img + '/**/*.{svg,webp,ico}',
    config.src.img + '/imagemin-exceptions/**/*.{jpg,jpeg,png,gif,svg,webp,ico}',
    '!' + config.src.img + '/svgo/**/*.*'
  ], gulp.series('copy:img'));

  watcher.on('all', config.syncChange(path => {
    return path.replace('\\imagemin-exceptions\\', '\\');
  }));

  cb();
});


gulp.task('copyFont:watch', cb => {
  const watcher = gulp.watch([
    config.src.fonts + '/**/*.{ttf,eot,woff,woff2}',
    config.src.fonts + '/*'
  ], gulp.series('copy:fonts'));

  watcher.on('all', config.syncChange());

  cb();
});



gulp.task('copy:watch', gulp.parallel(
  'copyImg:watch',
  'copyFont:watch',
  'copyRoot:watch'
));

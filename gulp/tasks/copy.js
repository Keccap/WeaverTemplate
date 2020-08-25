'use strict';
const gulp = require('gulp');
const config = require('../config');

gulp.task('copy:static', () => {
  return gulp
    .src([
      `${ config.src.static }/**/*.*`,
    ])
    .pipe(gulp.dest(config.dest.root));
});

gulp.task('copy:img', () => {
  return gulp
    .src([
      `${ config.src.img }/**/*.{svg,webp,ico}`,
    ])
    .pipe(gulp.dest(config.dest.img));
});

gulp.task('copy', gulp.parallel(
  'copy:img',
  'copy:static',
));

gulp.task('copyStatic:watch', (cb) => {
  const watcher = gulp.watch([
    config.src.static,
  ], gulp.series('copy:static'));

  watcher.on('all', config.syncChange((path) => {
    return path.replace('\\static\\', '\\');
  }));
  cb();
});

gulp.task('copyImg:watch', (cb) => {
  const watcher = gulp.watch([
    `${ config.src.img }/**/*.{svg,webp,ico}`,
  ], gulp.series('copy:img'));

  watcher.on('all', config.syncChange());
  cb();
});

gulp.task('copy:watch', gulp.parallel(
  'copyImg:watch',
  'copyStatic:watch',
));

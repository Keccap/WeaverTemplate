'use strict';
const gulp = require('gulp');
const jsonMerge = require('gulp-merge-json');
const config = require('../config');

gulp.task('data', () => {
  return gulp
    .src(`${ config.src.sdata }/*.json`)
    .pipe(jsonMerge({
      fileName: config.src.dataFile,
    }))
    .pipe(gulp.dest(config.src.data));
});

gulp.task('data:watch', (cb) => {
  gulp.watch([`${ config.src.sdata }/*.json`], gulp.series('data'));
  cb();
});

'use strict';
const gulp           = require('gulp');




gulp.task('watch', cb => {
  gulp.parallel(
    'sprite:svg:watch',
    'sass:watch',
    'nunjucks:watch',
    'webpack:watch',
    'svgo:watch',
    'imagemin:watch',
    'copy:watch',
    'list-pages:watch'
  )(cb);
});

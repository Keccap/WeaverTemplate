const gulp           = require('gulp');
const browserSync    = require('browser-sync');
const config         = require('../config');




gulp.task('watch', [
  'copy:watch',
  'nunjucks:watch',
  'sprite:svg:watch',
  'sass:watch',
  'scripts:watch',
  'svgo:watch',
]);
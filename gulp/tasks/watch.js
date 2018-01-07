const gulp           = require('gulp');
const config         = require('../config');




gulp.task('watch', function (cb) {
  gulp.parallel(
    'copy:watch',
    'nunjucks:watch',
    'sprite:svg:watch',
    'sass:watch',
    'scripts:watch',
    'svgo:watch',
    'imagemin:watch'
  )(cb)
});

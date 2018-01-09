const gulp           = require('gulp');
const config         = require('../config');




gulp.task('watch', cb => {
  gulp.parallel(
    'sprite:svg:watch',
    'sass:watch',
    'nunjucks:watch',
    'scripts:watch',
    'svgo:watch',
    'imagemin:watch',
    'copy:watch'
  )(cb)
});

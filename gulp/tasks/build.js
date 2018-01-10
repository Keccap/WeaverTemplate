const gulp         = require('gulp');
const config       = require('../config');




function build(cb) {
  gulp.series(
    'clean',
    'sprite:svg',
    'sass',
    'scripts',
    gulp.parallel(
      'nunjucks',
      'svgo',
      'imagemin',
    ),
    'copy'
  )(cb)
}

gulp.task('build', cb => {
  config.setEnv('production');
  config.logEnv();
  build(cb);
});


gulp.task('build:dev', cb => {
  config.setEnv('development');
  config.logEnv();
  build(cb);
});



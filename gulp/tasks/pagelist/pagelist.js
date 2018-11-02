const gulp        = require('gulp');
const consolidate = require('gulp-consolidate');
const config      = require('../../config');
require('require-yaml');




gulp.task('pagelist', () => {
  delete require.cache[require.resolve('../../../' + config.src.pagelist)];

  const pages = require('../../../' + config.src.pagelist);

  return gulp
    .src(__dirname + '/index.html')
    .pipe(consolidate('lodash', {
      pages: pages
    }))
    .pipe(gulp.dest(config.dest.html));
});


gulp.task('pagelist:watch', () => {
  gulp.watch(config.src.root + '/*', gulp.series('pagelist'));
});

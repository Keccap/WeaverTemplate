const gulp        = require('gulp');
const consolidate = require('gulp-consolidate');
const config      = require('../../config');
require('require-yaml');




gulp.task('list-pages', () => {
  delete require.cache[require.resolve('../../../' + config.src.pagelist)];

  const pages = require('../../../' + config.src.pagelist);

  return gulp
    .src(__dirname + '/index.html')
    .pipe(consolidate('lodash', {
      pages: pages
    }))
    .pipe(gulp.dest(config.dest.html));
});


gulp.task('list-pages:watch', () => {
  gulp.watch(config.src.root + '/*', gulp.series('list-pages'));
});

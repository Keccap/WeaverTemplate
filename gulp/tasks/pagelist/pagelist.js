const gulp        = require('gulp');
const consolidate = require('gulp-consolidate');
const config      = require('../../config');
require('require-yaml');


function declension(n, textForms) {
  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n > 10 && n < 20) {
    return textForms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return textForms[1];
  }

  if (n1 == 1) {
    return textForms[0];
  }
  return textForms[2];
}


gulp.task('pagelist', () => {
  delete require.cache[require.resolve('../../../' + config.src.pagelist)];

  const pages = require('../../../' + config.src.pagelist);
  const pagesText = 'page' + declension(pages.PageList.length, ['', 's', 's']);

  return gulp
    .src(__dirname + '/index.html')
    .pipe(consolidate('lodash', {
      pages,
      pagesText
    }))
    .pipe(gulp.dest(config.dest.html));
});


gulp.task('pagelist:watch', () => {
  gulp.watch(config.src.root + '/*', gulp.series('pagelist'));
});

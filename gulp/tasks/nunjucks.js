'use strict';
const gulp           = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const plumber        = require('gulp-plumber');
const gulpif         = require('gulp-if');
const changed        = require('gulp-changed');
const frontMatter    = require('gulp-front-matter');
const prettify       = require('gulp-prettify');
const rev            = require('gulp-rev-append');
const config         = require('../config');




function renderHtml(onlyChanged) {
  nunjucksRender.nunjucks.configure({
    watch: false,
    trimBlocks: true,
    lstripBlocks: false
  });

  return gulp
    .src([config.src.templates + '/**/[^_]*.twig'])
    .pipe(plumber({
      errorHandler: config.errorHandler('Nunjucks')
    }))
    .pipe(gulpif(onlyChanged, changed(config.dest.root)))
    .pipe(frontMatter({ property: 'data' }))
    .pipe(nunjucksRender({
      path: [config.src.templates]
    }))
    .pipe(prettify({
      indent_size: 4,
      wrap_attributes: 'auto', // 'force'  (Wrap attributes to new lines)
      preserve_newlines: true, // preserve existing line-breaks
      max_preserve_newlines: 1,
      unformatted: ['a', 'code', 'pre'],
      end_with_newline: true
    }))
    .pipe(gulp.dest(config.dest.root))
    // rev
    .pipe(gulpif(config.production, rev()))
    .pipe(gulpif(config.production, gulp.dest(config.dest.root)));
}


gulp.task('nunjucks', () => renderHtml());

gulp.task('nunjucks:changed', () => renderHtml(true));



gulp.task('nunjucks:watch', cb => {
  const watcher = gulp.watch([
    config.src.templates + '/**/[^_]*.twig'
  ], gulp.series('nunjucks:changed'));

  watcher.on('all', config.syncChange(path => {
    return path
      .replace('.twig', '.html')
      .replace('\\templates\\', '\\');
  }));


  gulp.watch([
    config.src.templates + '/**/_*.twig'
  ], gulp.series('nunjucks'));

  cb();
});

'use strict';
const gulp           = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const plumber        = require('gulp-plumber');
const gulpif         = require('gulp-if');
const changed        = require('gulp-changed');
const frontMatter    = require('gulp-front-matter');
const fs             = require('fs');
const prettify       = require('gulp-prettify');
const rev            = require('gulp-rev-append');
const config         = require('../config');




function renderHtml(onlyChanged) {
  nunjucksRender.nunjucks.configure({
    watch: false,
    autoescape: false,
    trimBlocks: true,
    lstripBlocks: false
  });

  return gulp
    .src([config.src.templates + '/*.twig'])
    .pipe(plumber({
      errorHandler: config.errorHandler('Nunjucks')
    }))
    .pipe(gulpif(onlyChanged, changed(config.dest.root)))
    .pipe(frontMatter({ property: 'data' }))
    .on('data', file => {
      // слияние данных frontMatter и json файла
      const frontMatterData = file.data;
      const JSONdata = JSON.parse(fs.readFileSync(config.src.data + '/' + config.src.dataFile));
      const resultData = {};

      Object.assign(resultData, JSONdata, frontMatterData); // frontMatterData перезаписывает схожие поля из JSONdata
      // добавляем переменныу окружения
      resultData.NODE_ENV = config.env;
      resultData.IS_SERVER = config.isServer;

      file.data = resultData;
    })
    .pipe(nunjucksRender({
      path: [config.src.templates],
      envOptions: {
        autoescape: false
      }
    }))
    .pipe(prettify({
      indent_size: 4,
      wrap_attributes: 'auto', // 'force'  (Wrap attributes to new lines)
      preserve_newlines: true, // preserve existing line-breaks
      max_preserve_newlines: 1,
      unformatted: ['code', 'pre', 'script'],
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
    config.src.templates + '/*.twig',
    config.src.data
  ], gulp.series('nunjucks:changed'));

  watcher.on('all', config.syncChange(path => {
    return path
      .replace('.twig', '.html')
      .replace('\\templates\\', '\\');
  }));


  gulp.watch([
    config.src.templates + '/**/*.{twig,svg}',
    '!' +  config.src.templates + '/*.twig'
  ], gulp.series('nunjucks'));

  cb();
});

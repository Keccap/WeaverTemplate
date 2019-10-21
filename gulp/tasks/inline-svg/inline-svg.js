'use strict';
const gulp         = require('gulp');
const plumber      = require('gulp-plumber');
const svgStore     = require('gulp-svgstore');
const rename       = require('gulp-rename');
const cheerio      = require('gulp-cheerio');
const through2     = require('through2');
const consolidate  = require('gulp-consolidate');
const path         = require('path');
const config       = require('../../config');




gulp.task('inline-svg', () => {
  return gulp
    .src(config.src.inlineSvg + '/*.svg')
    .pipe(plumber({
      errorHandler: config.errorHandler('Inline SVG')
    }))
    .pipe(rename({ prefix: 'svg-' }))
    .pipe(svgStore({ inlineSvg: false }))
    .pipe(through2.obj(function(file, encoding, cb) {
      const $ = file.cheerio;
      const data = $('svg > symbol').map(function() {
        const $this = $(this);
        const name = $this.attr('id');
        const [width, height] = $this.attr('viewBox').split(' ').splice(2);
        const ratio = Number((width / height).toFixed(2));
        return {
          name,
          ratio,
          width,
          height
        };
      }).get();

      this.push(file);

      gulp.src(path.join(__dirname, '_inline-svg.scss'))
        .pipe(consolidate('lodash', {
          symbols: data
        }))
        .pipe(gulp.dest(config.src.sassGen));

      cb();
    }));
});



gulp.task('inline-svg:watch', cb => {
  gulp.watch(config.src.inlineSvg + '/*.svg', gulp.series('inline-svg'));
  cb();
});

'use strict';
const gulp          = require('gulp');
const sass          = require('gulp-sass');
const sassGlob      = require('gulp-sass-glob');
const plumber       = require('gulp-plumber');
const rename        = require('gulp-rename');
const sourcemaps    = require('gulp-sourcemaps');
const postcss       = require('gulp-postcss');
const autoprefixer  = require('autoprefixer'); // (postcss)
const cssnano       = require('cssnano'); // CSS minifier (postcss)
const gulpif        = require('gulp-if');
const path          = require('path');
const config        = require('../config');


// postcss plugins
const processorsDev = [
  autoprefixer({
    cascade: false
  })
];

const processorsProd = [
  cssnano
];


gulp.task('sass', () => {
  return gulp
    .src(config.src.sass + '/*.{sass,scss}')
    .pipe(plumber({
      errorHandler: config.errorHandler('Sass')
    }))
    .pipe(gulpif(!config.production, sourcemaps.init()))
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: config.production ? 'compact' : 'expanded', // nested, expanded, compact, compressed
      precision: 5, // точность значений в css (число цифр после запятой)
      includePaths: [
        config.nodeModules, // быстрое обращение к node_modules '@import "node_modules/..."'
        config.src.root // быстрое обращение к vendor '@import "vendor/..."'
      ]
    }))
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(postcss(config.production ? processorsDev.concat(processorsProd) : processorsDev))
    .pipe(gulpif(!config.production, sourcemaps.write()))
    .pipe(gulp.dest(config.dest.css));
});


gulp.task('sass:watch', cb => {
  const watcher = gulp.watch(config.src.sass + '/**/*.{sass,scss}', gulp.series('sass'));

  watcher.on('all', config.syncChange(path => {
    return path
      .replace('\\sass\\', '\\css\\')
      .replace(/\.sass|\.scss?/gi, '.min.css');
  }));

  cb();
});

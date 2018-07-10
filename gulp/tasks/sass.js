'use strict';
const gulp         = require('gulp');
const sass         = require('gulp-sass');
const plumber      = require('gulp-plumber');
const rename       = require('gulp-rename');
const sourcemaps   = require('gulp-sourcemaps');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer'); // (postcss)
const mqpacker     = require('css-mqpacker'); // Group media queries and put them into the end of the CSS document (postcss)
const csso         = require('postcss-csso'); // CSS minifier (postcss)
const gulpif       = require('gulp-if');
const config       = require('../config');




// postcss plugins
const processorsDev = [
  autoprefixer({
    browsers: ['last 4 versions'],
    cascade: false
  }),
  mqpacker({
    sort: sortMediaQueries /* функция сортировки медиа запросов в правильном порядке
                           (не поддерживает диапазоны экранов: min:480 - max:780) */
  })
];

const processorsProd = [
  csso
];


gulp.task('sass', () => {
  return gulp
    .src(config.src.sass + '/*.{sass,scss}')
    .pipe(plumber({
      errorHandler: config.errorHandler('Sass')
    }))
    .pipe(gulpif(!config.production, sourcemaps.init()))
    .pipe(sass({
      outputStyle: config.production ? 'compact' : 'expanded', // nested, expanded, compact, compressed
      precision: 5 // точность значений в css (число цифр после запятой)
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



function sortMediaQueries(a, b) {

  // width
  if (isMinMaxW(a) && (isMaxW(b) || isMinW(b))) {
    return 1;
  } else if ((isMaxW(a) || isMinW(a)) && isMinMaxW(b)) {
    return -1;
  } else if (isMaxW(a) && isMaxW(b)) {
    const A = a.replace(/\D/g, '');
    const B = b.replace(/\D/g, '');
    return B - A;
  } else if (isMinW(a) && isMinW(b)) {
    const A = a.replace(/\D/g, '');
    const B = b.replace(/\D/g, '');
    return A - B;
  } else if (isMaxW(a) && isMinW(b)) {
    return 1;
  } else if (isMinW(a) && isMaxW(b)) {
    return -1;
  }

  else if (isMaxH(a) && isMaxH(b)) {
    const A = a.replace(/\D/g, '');
    const B = b.replace(/\D/g, '');
    return B - A;
  } else if (isMinH(a) && isMinH(b)) {
    const A = a.replace(/\D/g, '');
    const B = b.replace(/\D/g, '');
    return A - B;
  } else if (isMaxH(a) && isMinH(b)) {
    return 1;
  } else if (isMinH(a) && isMaxH(b)) {
    return -1;
  }

  else if ((isMaxH(a) || isMinH(a)) && (isMaxW(b) || isMinW(b) || isMinMaxW(b))) {
    return -1;
  } else if ((isMaxW(a) || isMinW(a) || isMinMaxW(a)) && (isMaxH(b) || isMinH(b))) {
    return 1;
  }


  return 1;
}

function isMaxW(mq) {
  return /max-width/.test(mq);
}

function isMinW(mq) {
  return /min-width/.test(mq);
}

function isMinMaxW(mq) {
  return /((?=min-width).+(?=max-width))|((?=max-width).+(?=min-width))/.test(mq);
}


function isMaxH(mq) {
  return /max-height/.test(mq);
}

function isMinH(mq) {
  return /min-height/.test(mq);
}

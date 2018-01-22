const gulp         = require('gulp');
const svgmin       = require('gulp-svgmin');
const changed      = require('gulp-changed');
const plumber      = require('gulp-plumber');
const config       = require('../config');

gulp.task('svgo', () => {
  return gulp
    .src(config.src.img + '/svgo/**/*.svg')
    .pipe(plumber({
      errorHandler: config.errorHandler('SVGO')
    }))
    .pipe(changed(config.dest.img))
    .pipe(svgmin({
      js2svg: {
        pretty: true
      },
      plugins: [
        {
          removeDesc: true
        },
        {
          cleanupIDs: true
        },
        {
          mergePaths: false
        },
        {
          cleanupNumericValues: {
            floatPrecision: 2
          }
        }
      ]
    }))
    .pipe(gulp.dest(config.dest.img));
});

gulp.task('svgo:watch', cb => {
  let watcher = gulp.watch([
    config.src.img + '/svgo/**/*.svg'
  ], gulp.series('svgo'));

  watcher.on('all', config.syncChange(path => {
    return path.replace('\\svgo\\', '\\');
  }));

  cb();
});

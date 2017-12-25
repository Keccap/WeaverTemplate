const gulp         = require('gulp');
const plumber      = require('gulp-plumber');
const svgmin       = require('gulp-svgmin');
const config       = require('../config');




gulp.task('svgmin', function() {
    return gulp
        .src(config.dest.img + '/svg/**/*.svg')
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(svgmin({
            js2svg: {
                pretty: true
            },
            plugins: [{
                removeDesc: true
            }, {
                cleanupIDs: true
            }, {
                mergePaths: false
            }]
        }))
        .pipe(gulp.dest(config.dest.img + '/svg'));
});


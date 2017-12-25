const gulp         = require('gulp');
const config       = require('../config');




gulp.task('copy', () => {

    const copyFiles = gulp.src([
        config.src.root + '/.htaccess',
        config.src.root + '/*.html',
    ]).pipe(gulp.dest(config.dest.root));

    const copyCss = gulp.src([
        config.src.css + '/*.css',
    ]).pipe(gulp.dest(config.dest.css));

    const copyJs = gulp.src([
        config.src.js + '/bundle.min.js',
    ]).pipe(gulp.dest(config.dest.js));

    const copyFonts = gulp.src([
        config.src.fonts + '/**/*.{eot,ttf,woff,woff2}',
    ]).pipe(gulp.dest(config.dest.fonts));

    const copyImg = gulp.src([
        config.src.img + '/**/*.{jpg,png,jpeg,svg,gif,webp}',
    ]).pipe(gulp.dest(config.dest.img));

});
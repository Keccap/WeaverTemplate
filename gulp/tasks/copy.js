const gulp         = require('gulp');
const config       = require('../config');




gulp.task('copy:rootfiles', () => {
    return gulp
        .src(config.src.root + '/*.*')
        .pipe(gulp.dest(config.dest.root));
});


gulp.task('copy:img', function () {
    return gulp
        .src([
            config.src.img + '/**/*.{jpg,jpeg,png,gif,svg,webp,ico}',
            '!' + config.src.img + '/svgo/**/*.*'
        ])
        .pipe(gulp.dest(config.dest.img));
});


gulp.task('copy:fonts', () => {
    return gulp
        .src(config.src.fonts + '/**/*.{ttf,eot,woff,woff2}')
        .pipe(gulp.dest(config.dest.fonts));
});



gulp.task('copy', [
    'copy:img',
    'copy:rootfiles',
    'copy:fonts'
]);



gulp.task('copy:watch', () => {
    gulp.watch([
        config.src.img + '/**/*.{jpg,jpeg,png,gif,svg,webp,ico}',
        '!' + config.src.img + '/svgo/**/*.*'], ['copy:img']
    );

    gulp.watch(config.src.root + '/*.*', ['copy:rootfiles']);

    gulp.watch(config.src.fonts + '/**/*.{ttf,eot,woff,woff2}', ['copy:fonts']);

});



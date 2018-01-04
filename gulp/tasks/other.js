const gulp           = require('gulp');
const critical       = require('critical').stream;     // Генерирует критические стили для более быстрой загрузки страницы
const util           = require('gulp-util');
const ftp            = require('vinyl-ftp');
const config         = require('../config');          // все конфиги для работы тасков




gulp.task('deploy', () => {

    const conn = ftp.create({
        host:      'hostname.com',
        user:      'username',
        password:  'userpassword',
        parallel:  10,
        log: util.log
    });

    const globs = [
        config.dest.root + '/**',
        config.dest.root + '/.htaccess',
    ];
    return gulp.src(globs, {buffer: false})
    .pipe(conn.dest('/path/to/folder/on/server'));

});





gulp.task('critical', () => {
    return gulp.src(config.dest.root + '/*.html')
    .pipe(critical({                            // генерируем критический CSS для быстрой загрузки страниц
        base:    config.dest.root,              // из всех наших файлов
        minify:  true,                          // с минификацией
        inline:  true,
        width: 1920,
        height: 1280,
        css:     [config.dest.css + '/app.min.css']}))
    .on('error', config.errorHandler)
    .pipe(gulp.dest(config.dest.root));
});




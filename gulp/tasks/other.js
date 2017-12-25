const gulp           = require('gulp');
const critical       = require('critical').stream;     // Генерирует критические стили для более быстрой загрузки страницы
const imagemin       = require('gulp-imagemin');       // Пакет минификации изображений (в зависимостях также идут дополнительные пакеты)
const cache          = require('gulp-cache');          // Работа с кэшом
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


gulp.task('imagemin', () => {
	return gulp.src(config.dest.img + '/**/*.{jpg,png,jpeg,gif}')
	.pipe(cache(imagemin({progressive: true}))) // Cache Images
	.pipe(gulp.dest(config.dest.img)); 
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


gulp.task('clearcache', () => { return cache.clearAll(); });

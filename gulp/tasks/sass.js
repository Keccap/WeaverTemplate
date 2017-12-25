const gulp         = require('gulp');
const sass         = require('gulp-sass');
const plumber      = require('gulp-plumber');
const rename       = require('gulp-rename');
const sourcemaps   = require('gulp-sourcemaps');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');       // (postcss)
const mqpacker     = require('css-mqpacker');       // Группирует медиазапросы и помещает их в конец CSS документа (postcss)
const csso         = require('postcss-csso');       // минимизатор CSS (postcss)
const config       = require('../config');




//postcss plugins
const processors = [
    autoprefixer({
        browsers: ['last 7 versions'],
        cascade: false
    }),
    mqpacker({
        sort: sortMediaQueries // функция сортировки запросов в правильном порядке (не поддерживает диапазоны экранов min:480 - max:780)
    }),
    csso
];

gulp.task('sass', () => {
    return gulp
        .src(config.src.sass + '/*.{sass,scss}')
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded', // nested, expanded, compact, compressed
            precision: 5
        }))
        .on('error', config.errorHandler)
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.src.css))
});


gulp.task('sass:watch', function() {
    gulp.watch(config.src.sass + '/**/*.{sass,scss}', ['sass']);
});


function sortMediaQueries(a, b) {
    const A = a.replace(/\D/g, '');
    const B = b.replace(/\D/g, '');

    if (isMax(a) && isMax(b)) {
        return B - A;
    } else if (isMin(a) && isMin(b)) {
        return A - B;
    } else if (isMax(a) && isMin(b)) {
        return 1;
    } else if (isMin(a) && isMax(b)) {
        return -1;
    }

    return 1;
}

function isMax(mq) {
    return /max-width/.test(mq);
}

function isMin(mq) {
    return /min-width/.test(mq);
}

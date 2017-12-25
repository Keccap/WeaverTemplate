const gulp           = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const plumber        = require('gulp-plumber');
const gulpif         = require('gulp-if');
const changed        = require('gulp-changed');
const frontMatter    = require('gulp-front-matter');
const prettify       = require('gulp-prettify');
const config         = require('../config');

function renderHtml(onlyChanged) {
    nunjucksRender.nunjucks.configure({
        watch: false,
        trimBlocks: true,
        lstripBlocks: false
    });

    return gulp
        .src([config.src.templates + '/**/[^_]*.twig'])
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(gulpif(onlyChanged, changed(config.src.root)))
        .pipe(frontMatter({ property: 'data' }))
        .pipe(nunjucksRender({
            path: [config.src.templates]
        }))
        .pipe(prettify({
            indent_size: 2,
            wrap_attributes: 'auto', // 'force'  (Wrap attributes to new lines) 
            preserve_newlines: true, // preserve existing line-breaks
            max_preserve_newlines: 1,
            unformatted: ["a", "code", "pre"],
            end_with_newline: true
        }))
        .pipe(gulp.dest(config.src.root));
}

gulp.task('nunjucks', function() {
    return renderHtml();
});

gulp.task('nunjucks:changed', function() {
    return renderHtml(true);
});


gulp.task('nunjucks:watch', function() {
    gulp.watch([
        config.src.templates + '/**/[^_]*.twig'
    ], ['nunjucks:changed']);

    gulp.watch([
        config.src.templates + '/**/_*.twig'
    ], ['nunjucks']);
});

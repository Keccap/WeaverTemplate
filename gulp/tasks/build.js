const gulp         = require('gulp');
const runSequence  = require('run-sequence');
const config       = require('../config');




gulp.task('build', (cb) => {
    runSequence(
        'clean',
        'sprite:svg',
        'sass',
        'nunjucks',
        'scripts-min',
        'copy',
        cb
    );
});
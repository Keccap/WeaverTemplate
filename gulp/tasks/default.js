const gulp         = require('gulp');
const runSequence  = require('run-sequence');
const config       = require('../config');




gulp.task('default', function(cb) {
    runSequence(
        'sprite:svg',
        'nunjucks',
        'sass',
        'scripts',
        'server',
        'watch',
        cb
    );
});


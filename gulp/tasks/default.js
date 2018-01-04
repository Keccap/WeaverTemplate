const gulp         = require('gulp');
const runSequence  = require('run-sequence');
const config       = require('../config');




gulp.task('default', function(cb) {
    runSequence(
        'build:dev',
        'server',
        'watch',
        cb
    );
});


gulp.task('prod', function (cb) {
    runSequence(
        'build',
        'server',
        'watch',
        cb
    );
});

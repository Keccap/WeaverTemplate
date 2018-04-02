'use strict';
const gulp         = require('gulp');




gulp.task('default', function(cb) {
  gulp.series(
    'build:dev',
    'server',
    'watch'
  )(cb);
});



/*

АХТУНГ! АХТУНГ! АХТУНГ!


Если вызывать таски подобным образом:

gulp.task('default', gulp.series(
  'build:dev',
  'server',
  'watch'
));

Случится сбой в работе require-dir и таск "server" будет не найден,
ибо он расположен выше, чем таск "default".
Видимо, когда require-dir импортит таски в gulpfile.js, он делает это в таком же
порядке, в каком они находились в директории в виде файлов.

В gulp 3 порядок тасков не имел значения, мы могли вызвать таском,
который находится в начале файла, таск, который находится в конце.
В gulp 4 так уже нельзя, если использовать в чистом виде gulp.series и gulp.parallel.

Но вызов через

gulp.task('default', function(cb) {
  gulp.series(
    'build:dev',
    'server',
    'watch'
  )(cb)
});

Игнорирует порядок тасков.

*/

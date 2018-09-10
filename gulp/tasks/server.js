'use strict';
const gulp           = require('gulp');
const server         = require('browser-sync').create();
const util           = require('gulp-util');
const config         = require('../config');




// in CL 'gulp server --tunnel siteName' to make project available over http://siteName.localtunnel.me


gulp.task('server', cb => {
  server.init({
    server: {
      baseDir: config.dest.root,
      directory: false,
      serveStaticOptions: {
        extensions: ['html']
      }
    },
    files: [
      config.dest.root + '/*.html',
      config.dest.css + '/**/*.css',
      config.dest.img + '/**/*',
      // config.dest.js + '/**/*.js', // вместо этого сервер вручную перезагружается в webpack.js (иначе browsersync будет ловить несколько событий при изменении => неск. перезагрузок)
    ],
    notify: false,
    open: true,
    ghostMode: false,
    online: Boolean(util.env.tunnel),
    tunnel: util.env.tunnel || null
  });

  cb();
});


module.exports = server;

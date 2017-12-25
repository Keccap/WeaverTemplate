const gulp           = require('gulp');
const server         = require('browser-sync').create();
const config         = require('../config');




gulp.task('server', () => {
    server.init({
        server: {
            baseDir: config.src.root
        },
        files: [
            config.src.root + '/*.html',
            config.src.img + '/**/*.img',
            config.src.css + '/**/*.css',
            config.src.js + '/bundle.min.js'
        ],
        notify: false,
        // online: false,
        // tunnel: false,
        // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
    });
});

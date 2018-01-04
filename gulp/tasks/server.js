const gulp           = require('gulp');
const server         = require('browser-sync').create();
const util           = require('gulp-util');
const config         = require('../config');




// in CL 'gulp server --open' to open current project in browser
// in CL 'gulp server --tunnel siteName' to make project available over http://siteName.localtunnel.me


gulp.task('server', () => {
    server.init({
        server: {
            baseDir: !config.production ? [config.dest.root, config.src.root] : config.dest.root,
            directory: false,
            serveStaticOptions: {
                extensions: ["html"]
            }
        },
        files: [
            config.dest.root + '/*.html',
            config.dest.css + '/**/*.css',
            config.dest.js + '/**/*.js',
            config.dest.img + '/**/*'
        ],
        notify: false,
        open: true,
        ghostMode: false,
        online: Boolean(util.env.tunnel),
        tunnel: util.env.tunnel || null
    });
});


const srcPath = 'app';
const destPath = 'build';

const config = {

    src: {
        root         : srcPath,
        sass         : srcPath + '/sass',
        sassGen      : srcPath + '/sass/generated',
        css          : srcPath + '/css',
        js           : srcPath + '/js',
        jsTemp       : srcPath + '/js/.temp',
        libs         : srcPath + '/libs',
        img          : srcPath + '/img',
        fonts        : srcPath + '/fonts',

        svg          : srcPath + '/img/svg',

        icons        : srcPath + '/icons',
        iconsPng     : srcPath + '/icons',
        iconsSvg     : srcPath + '/icons',

        iconsFont    : srcPath + '/icons',

        templates    : srcPath + '/templates',
    },

    dest: {
        root : destPath,
        html : destPath,
        css  : destPath + '/css',
        js   : destPath + '/js',
        img  : destPath + '/img',
        fonts: destPath + '/fonts',
    },

    errorHandler: require('./util/handle-errors')
};


module.exports = config;

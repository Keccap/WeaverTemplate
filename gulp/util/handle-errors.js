'use strict';
const notify = require('gulp-notify');


module.exports = function(title) {
  return function() {
    notify.onError({
      title: title || 'Compile Error',
      message: '<%= error.message %>'
    }).apply(this, arguments);

    this.emit('end');
  };
};

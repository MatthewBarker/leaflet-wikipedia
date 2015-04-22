var config = require('../config').clean,
	del = require('del'),
    gulp = require('gulp');

gulp.task('clean', function (callback) {
    del(config, callback);
});
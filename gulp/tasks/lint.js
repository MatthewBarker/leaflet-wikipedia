var config = require('../config').scripts,
	gulp = require('gulp'),
    jslint = require('gulp-jslint');

gulp.task('lint', function () {
    return gulp.src(config.src)
        .pipe(jslint({
            node: true,
            nomen: true
        }));
});
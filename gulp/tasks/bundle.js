var browserify = require('browserify'),
	config = require('../config').bundle,
	gulp = require('gulp'),
	source = require('vinyl-source-stream');

gulp.task('bundle', ['scripts'], function () {
    return browserify(config.src)
        .bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.dest));
});
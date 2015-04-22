var config = require('../config').styles,
	gulp = require('gulp'),
    minifyCss = require('gulp-minify-css');

gulp.task('styles', function () {
    return gulp.src(config.src)
        .pipe(minifyCss())
		.pipe(gulp.dest(config.dest));
});
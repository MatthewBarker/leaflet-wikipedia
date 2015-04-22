var config = require('../config').images,
	gulp = require('gulp');

gulp.task('images', function () {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});
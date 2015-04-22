var config = require('../config').doc,
	gulp = require('gulp'),
    jsdoc = require('gulp-jsdoc');

gulp.task('doc', function () {
    return gulp.src(config.src)
        .pipe(jsdoc.parser())
        .pipe(jsdoc.generator(config.dest, {
            path: 'ink-docstrap',
            theme: 'cerulean'
        }));
});
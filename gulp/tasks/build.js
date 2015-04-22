var gulp = require('gulp');

gulp.task('build', ['lint', 'clean'], function(){
	gulp.start(['bundle', 'images', 'doc', 'styles']);
});
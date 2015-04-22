var config = require('../config').scripts,
	gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    umd = require('gulp-umd');

gulp.task('scripts', function () {
    return gulp.src(config.src)
        .pipe(umd({
            dependencies: function () {
                return [{
                    name: 'leaflet',
                    param: 'L',
                    global: 'L'
                }, {
                    name: 'browser-jsonp',
                    param: 'JSONP',
                    global: 'JSONP'
                }];
            },
            exports: function () {
                return 'L';
            },
            namespace: function () {
                return 'L';
            }
        }))
        .pipe(gulp.dest(config.dest))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(config.dest));
});
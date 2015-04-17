'use strict';

var del = require('del'),
    gulp = require('gulp'),
    jsdoc = require('gulp-jsdoc'),
    jslint = require('gulp-jslint'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    umd = require('gulp-umd');

gulp.task('default', ['scripts', 'images', 'doc']);

gulp.task('scripts', ['clean:scripts'], function () {
    return gulp.src('source/*')
        .pipe(jslint({
            node: true,
            nomen: true
        }))
        .pipe(umd({
            dependencies: function () {
                return [{
                    name: 'leaflet',
                    param: 'L',
                    global: 'L'
                }, {
                    name: 'jsonp',
                    param: 'jsonp',
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
        .pipe(gulp.dest('build'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

gulp.task('images', ['clean:images'], function () {
    return gulp.src('images/*.png')
        .pipe(gulp.dest('build/images'));
});

gulp.task('doc', ['clean:doc'], function () {
    return gulp.src(['source/*.js', 'README.md'])
        .pipe(jsdoc.parser())
        .pipe(jsdoc.generator('help', {
            path: 'ink-docstrap',
            theme: 'cerulean'
        }));
});

gulp.task('clean:scripts', function (callback) {
    del(['build/*.js'], callback);
});

gulp.task('clean:doc', function (callback) {
    del(['help'], callback);
});

gulp.task('clean:images', function (callback) {
    del(['build/images'], callback);
});

gulp.task('watch', function () {
    gulp.watch('source/*', ['default']);
});
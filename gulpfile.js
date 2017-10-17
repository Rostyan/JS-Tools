'use strict'

var gulp = require('gulp');
var clean = require('gulp-clean');
var gulpSequence = require('gulp-sequence');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var webserver = require('gulp-webserver');
var htmlmin = require('gulp-htmlmin');
var noop = require("gulp-noop");

// clear dist directory
gulp.task('clean', function () {
  return gulp.src('./dist/*', {read: false})
    .pipe(clean());
});

//create all html file
gulp.task('views', function () {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist/'));
});

//create all script files
gulp.task('scripts', function () {
  gulp.src('./src/scripts/*.js')
    .pipe(gulp.dest('./dist/scripts/'));
});

//create all css files
gulp.task('styles', function () {
  gulp.src('./src/styles/*.sass')
  .pipe(sass({
    outputStyle:'compressed'
  }).on('error', sass.logError))
  .pipe(gulp.dest('./dist/styles/'));
});

//build process
gulp.task('build', function (done) {
  gulpSequence('clean', ['views', 'scripts', 'styles'])(done)
});

//add watch process
gulp.task('watch', function () {
  gulp.watch('src/**/*', ['build']);
});

// default
gulp.task('default',['build'])

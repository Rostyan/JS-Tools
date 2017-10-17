'use strict'

var gulp = require('gulp');
var clean = require('gulp-clean');
var gulpSequence = require('gulp-sequence');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
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
    .pipe(concat('common.js'))
    .pipe(gulp.dest('./dist/scripts/'));
});

//inspect style script
gulp.task('scripts:lint', function (){
  gulp.src('./src/scripts/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

//create all css files
gulp.task('styles', function () {
  gulp.src('./src/styles/*.sass')
    .pipe(sass({
      outputStyle:  'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
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

//add server
gulp.task('server', function () {
gulp.src('dist')
  .pipe(webserver({
    port: 8800,
    livereload:  true,
    directoryListing: false,
    open: false
  }));
});

// default process
gulp.task('default', gulpSequence('scripts:lint', 'build', ['server', 'watch']));

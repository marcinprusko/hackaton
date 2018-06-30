'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var nunjacksRender = require('gulp-nunjucks-render');

gulp.task('img', function () {
  gulp.src('./assets/img/**/*')
    .pipe(gulp.dest('./web/img'))
});

gulp.task('sass', function () {
  gulp.src('./assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./web/css/'))
    .pipe(browserSync.stream())
});

gulp.task('js', function(){
   gulp.src(['assets/js/*.js'])
    .pipe(gulp.dest('./web/js/'));
});

gulp.task('media', function() {
  gulp.src('./assets/media/**/*')
  .pipe(gulp.dest('./web/media/'))
})

gulp.task('fonts', function() {
  gulp.src('./assets/fonts/**/*')
  .pipe(gulp.dest('./web/fonts/'))
})

gulp.task('nunjucks', function() {
  return gulp.src(['assets/templates/*.html'])
    .pipe(nunjacksRender({
      path: ['assets/templates']
    }))
    .pipe(gulp.dest('./web'))
});

gulp.task('build', ['img','media', 'sass', 'nunjucks', 'js', 'fonts'], function() {
    browserSync.init({
        server: "./web"
    });
    gulp.watch("assets/scss/**/*.scss", ['sass']);
    gulp.watch("assets/templates/**/*.html", ['nunjucks']);
    gulp.watch("assets/js/*.js", ['js']);
    gulp.watch("web/*.html").on('change', browserSync.reload);
    gulp.watch("web/js/*.js").on('change', browserSync.reload);
});

gulp.task('default', ['build']);
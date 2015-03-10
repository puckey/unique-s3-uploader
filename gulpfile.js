var gulp = require('gulp');
var watchify = require('gulp-watchify');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');

// Hack to enable configurable watchify watching
var watching = false

gulp.task('example', watchify(function (watchify) {
  return gulp.src('./php-example/www/index.js')
    .pipe(plumber())
    .pipe(watchify({
      debug: true,
      watch: watching,
      setup: function (bundle) {
        bundle.transform(babelify)
      }
    }))
    .pipe(gulp.dest('./php-example/www/dist/'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename(function (path) {
        path.basename += '-min';
    }))
    .pipe(gulp.dest('./php-example/www/dist/'))
    .pipe(livereload())
}));
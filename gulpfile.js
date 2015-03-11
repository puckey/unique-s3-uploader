var gulp = require('gulp');
var babel = require('gulp-babel');
var watchify = require('gulp-watchify');
var babelify = require('babelify');
var rename = require('gulp-rename');

gulp.task('browserify', watchify(function (watchify) {
  return gulp.src('src/main.js')
    .pipe(watchify({
      watch: false,
      standalone: 'UniqueS3Uploader',
      setup: function (bundle) {
        bundle.transform(babelify);
      }
    }))
    .pipe(rename('browser.js'))
    .pipe(gulp.dest('dist/'));
}));

gulp.task('babel', function () {
  return gulp.src('src/main.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('example', function () {
  return gulp.src('./dist/browser.js')
    .pipe(rename('UniqueS3Uploader.js'))
    .pipe(gulp.dest('php-example/www/lib/'));
});

gulp.task('watch', function () {
  gulp.watch('src/main.js', ['babel', 'browserify', 'example']);
});

gulp.task('default', ['babel', 'browserify', 'watch', 'example']);
const gulp = require('gulp');
const concat = require('gulp-concat');
const del = require('del');
const fsCache = require('gulp-fs-cache');
const gutil = require('gulp-util');
const imagemin = require('gulp-imagemin');
const path = require('path');
const pngquant = require('imagemin-pngquant');
const replace = require('gulp-replace-path');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const connect = require('gulp-connect');

gulp.task('default', ['watch']);

gulp.task('watch', () => {
  gulp.watch([
    'app/**/*.html',
    'app/**/*.css',
    'app/**/*.scss',
    'app/**/*.js',
  ], ['build', 'reload']);
});

gulp.task('build', ['clean-dist', 'sass', 'sass-mobile', 'js', 'images', 'fonts', 'html']);

gulp.task('reload', ['build'], () => {
  return gulp.src(['./app'])
    .pipe(connect.reload());
});

gulp.task('clean-dist', () => {
  return del.sync(['dist/**']);
});

gulp.task('fonts', ['clean-dist'], () => {
  return gulp.src(['./app/fonts/**/*'])
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('html', ['clean-dist'], () => {
  return gulp.src(['./app/html/**/*'])
    .pipe(replace('../js/script.js', 'js/app.js'))
    .pipe(replace('../css/app.css', 'css/app.css'))
    .pipe(replace('../css/mobile.css', 'css/mobile.css'))
    .pipe(replace('../images', 'images'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass-mobile', ['clean-dist'], () => {
  return gulp.src(['./app/css/mobile.css'])
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass', ['clean-dist'], () => {
  return gulp.src([
    './app/css/**/*.css',
    './app/css/**/*.scss',
    '!./app/css/mobile.css',
  ])
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: ['./resources/assets/sass'],
    }))
    .pipe(concat('app.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', ['clean-dist'], () => {
  return gulp.src([
    './app/js/jquery.min.js',
    './app/js/jquery.nanoscroller.min.js',
    './app/js/bootstrap.min.js',
    './app/js/bxslider.js',
    './app/js/script.js',
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('images', ['clean-dist'], function () {
  const imgFsCache = fsCache('.tmp/imgcache');
  const pngQuantSettings = {verbose: true};
  const imageMinSettings = {progressive: true, verbose: true};
  return gulp.src(['./app/images/**/*'], {cwd: './'})
    .pipe(imgFsCache)
    .pipe(imagemin([pngquant(pngQuantSettings)], imageMinSettings).on('error', gutil.log))
    .pipe(imgFsCache.restore)
    .pipe(gulp.dest('./dist/images', {cwd: './'}));
});

gulp.task('server', ['build', 'watch'], function () {
  connect.server({
    root: 'dist',
    livereload: true
  });
});
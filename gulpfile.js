var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var order = require('gulp-order');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var zip = require('gulp-zip');

var htmlPath = ['stage/html/*.pug'];
var cssPath = ['stage/css/**/*.scss', 'stage/css/**/*.css'];
var jsPath = ['stage/js/*.js']

//html task
gulp.task('html', function () {
  return gulp.src(htmlPath)
        .pipe(pug({pretty:true}))
        .pipe(gulp.dest('dist'))
        //.pipe(notify('HTML Task is done'))
        .pipe(livereload())
});

//compressed css task
gulp.task('css', function () {
  return gulp.src(cssPath)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(concat('master.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        //.pipe(notify('CSS Task Is Done'))
        .pipe(livereload())
});

//normal css task
gulp.task('normalcss', function () {
  return gulp.src(cssPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(concat('master.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        //.pipe(notify('CSS normal Task Is Done'))
        .pipe(livereload())
});

//js task
gulp.task('javascript', function () {
    return gulp.src(jsPath)
        .pipe(concat('master.js'))
        .pipe(minify())
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload())
});

//watch task
gulp.task('watch', function () {
    require('./server.js');
    livereload.listen();
    gulp.watch(htmlPath, ['html']);
    gulp.watch( cssPath, ['normalcss','css']);
    gulp.watch(jsPath, ['javascript']);
});

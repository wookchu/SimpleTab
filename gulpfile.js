const gulp = require('gulp');
const {watch, series, parallel} = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const minifyCss = require('gulp-minify-css');
const livereload = require('gulp-livereload');
const htmlreplace = require('gulp-html-replace');

var src = 'public/src';
var dist = 'public/dist';

var paths = {
    html: src + '/html/*.html',
    js: src + '/js/*.js',
    scss: src + '/scss/*.scss'
};

function clean(cb) {
    cb();
}
function css(cb) {
    //transpile
    //minify
    //cb();
    return gulp.src(paths.scss)
		.pipe(sass({outputStyle:'expanded'}))
		.pipe(gulp.dest(dist + '/css'))
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dist + '/css'))
}
function javascript(cb) {
    //minify
    return gulp.src(paths.js)
    .pipe(gulp.dest(dist + '/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dist + '/js'));
}
function publish(cb) {
    return gulp.src(paths.html)
    .pipe(htmlreplace({
        css: '../css/simpletab.min.css',
        js: ['../js/jquery-3.4.1.min.js', '../js/simpletab.min.js']
    }))
    .pipe(gulp.dest(dist + '/html'));
}
function watchFlow(cb) {
    watch(paths.js, javascript);
    watch(paths.scss, css);
    watch(paths.html, publish);
}
exports.css = css;
exports.publish = publish;
exports.default = function(){
    series(css, javascript, publish);
    watchFlow();
}

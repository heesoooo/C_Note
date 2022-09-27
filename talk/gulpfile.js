const gulp = require('gulp'),
	del = require('del'),
	sass = require("gulp-sass")(require('sass')),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	replace = require('gulp-replace'),
	fileinclude = require('gulp-file-include'),
	merge = require('merge-stream'),
	imagemin = require('gulp-imagemin'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;

	const DIR = {
		SRC: './src',
		DEST: './dist'
	};
	
	const SRC = {
		HTML: DIR.SRC + '/html/**/*.html',
		JS: DIR.SRC + '/js/**/*.js',
		SCSS: DIR.SRC + '/scss/**/*.scss',
		IMG : DIR.SRC + '/img/*.*',
		FONT: DIR.SRC + '/fonts/**/*.*'
	};

//////////////////////// function ↓ //////////////////////////

function clean() {
	return del([DIR.DEST]);
}

function cleanCss() {
	return del([`${DIR.DEST}/css/*.css`]);
}

function cleanJs() {
	return del([`${DIR.DEST}/js/script.js`]);
}

// html file include
function htmlInclude() {
	return gulp.src(SRC.HTML)
	.pipe(fileinclude({
		prefix: '@@',
		basepath: '@file',
	}))
	.pipe(replace(/[\u200B-\u200D\uFEFF]/g, ""))
	.pipe(gulp.dest([`${DIR.DEST}/html`]));
}

// .scss -> .css 압축 저장
function cssTask() {
	return gulp.src(SRC.SCSS)
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({remove : false}))
	.pipe(cssnano())
	.pipe(rename({
		extname: '.min.css'
	}))
	.pipe(gulp.dest(`${DIR.DEST}/css`));
}

// js uglify
function jsTask() {
	let sourceLib = [
		'src/js/jquery.js',
		'src/js/modal.js',
		'src/js/common.js',
	];
	return gulp.src(sourceLib)
	.pipe(concat('script.js'))
	.pipe(uglify())
	.pipe(gulp.dest(`${DIR.DEST}/js`));
}

// font copy
function copyFont() {
	return gulp.src([SRC.FONT])
	.pipe(gulp.dest(`${DIR.DEST}/fonts`));
}

// img copy
function copyImg() {
	return gulp.src(SRC.IMG)
	.pipe(gulp.dest(`${DIR.DEST}/img`));
}

// img size minify
function imageMin() {
	return gulp.src(SRC.IMG)
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.mozjpeg({quality: 75, progressive: true}),
		imagemin.optipng({optimizationLevel: 5}),
		imagemin.svgo({
			plugins: [
				{removeViewBox: true},
				{cleanupIDs: false}
			]
		})
	]))
	.pipe(gulp.dest([`${DIR.DEST}/img`]));
}

// .on('change', reload); -> 모든브라우저에 변경사항이 통보, Streams는 Browsersync에서 지원
function watchTask() {
	gulp.watch(SRC.HTML,  gulp.series(htmlInclude)).on('change', reload);
	gulp.watch(SRC.SCSS, gulp.series(cleanCss, cssTask)).on('change', reload);
	gulp.watch(SRC.JS, gulp.series(cleanJs, jsTask)).on('change', reload);
	gulp.watch(SRC.IMG, copyImg).on('change', reload);
	gulp.watch(SRC.FONT, copyFont).on('change', reload);
}

// serve는 index.html을 기본 파일설정으로 가진다. (변경시 설정 -> index : 파일명.html)
function serve() {
	browserSync.init({
		server: {
			baseDir: './',
			//index: "worksheet.html"
		}
	});	
	watchTask();
}

const build = gulp.series(clean, gulp.parallel(cssTask, copyFont, copyImg, jsTask, htmlInclude, imageMin));

exports.clean = clean;
exports.cssTask = cssTask;
exports.copyImg = copyImg;
exports.copyFont = copyFont;
exports.htmlInclude = htmlInclude;
exports.jsTask = jsTask;
exports.imageMin = imageMin;
exports.build = build;
exports.watchTask = watchTask;
exports.serve = serve;
exports.default = build;
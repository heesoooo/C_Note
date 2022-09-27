const gulp = require('gulp'),
	del = require('del'),
	//sass = require('gulp-sass'),
	sass = require("gulp-sass")(require('sass')),
	cssnano = require('gulp-cssnano'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	replace = require('gulp-replace'),
	spritesmith = require('gulp.spritesmith-multi'),
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
		SPRITE: DIR.SRC + '/img/sprite/*.png',
		FONT: DIR.SRC + '/fonts/**/*.*'
	};

//////////////////////// function ↓ //////////////////////////

function clean() {
	return del([DIR.DEST]);
}

function cleanCss() {
	return del([`${DIR.DEST}/css/*.css`]);
}

function cleanSprite() {
	return del([`${DIR.DEST}/img/sprite/sprite_pc.png`]);
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
	return gulp.src([SRC.SCSS, `!${DIR.SRC}/scss/component/*.*`])
	.pipe(sass().on('error', sass.logError))
	.pipe(cssnano())
	.pipe(gulp.dest(`${DIR.DEST}/css`));
}

// js uglify
function jsTask() {
	let sourceLib = [
		'src/js/jquery.js',
		'src/js/modal.js',
		'src/js/common.js',
		'src/js/bootstrap-datepicker.js',
		'src/js/swiper.min.js',
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

// PC Sprite cssTemplete
const templateFunctionPC = function (data) {
	var shared = ".sprite_comm{display:inline-block;background-image:url('I');background-repeat:no-repeat;background-size:Spx auto;}"
		.replace('I', data.sprites[0].image)
		.replace('II', data.sprites[0].image)
		.replace('S', data.sprites[0].total_width);

	var perSprite = data.sprites.map(function (sprite) {
		return '.N{width:Wpx;height:Hpx;background-position:Xpx Ypx}'
			.replace('N', sprite.name)
			.replace('W', sprite.width)
			.replace('H', sprite.height)
			.replace('X', sprite.offset_x)
			.replace('Y', sprite.offset_y);
	}).join('\n');
	return shared + '\n' + perSprite
}
// PC sprite function
function spriteTaskPC() {
	let opts = {
		spritesmith: function (options, sprite) {
			options.imgName = 'sprite_pc.png';
			options.imgPath = `../../img/sprite/${options.imgName}`;
			options.cssSpritesheetName = sprite;
			options.cssTemplate = templateFunctionPC;
			options.padding = 20;
			options.cssVarMap = function (sp) {
				sp.name = `sp_${sp.name}`;
			};
			options.cssName = `_sprite.scss`;
			return options;
		}
	};
	const spriteDataPC = gulp.src(SRC.SPRITE).pipe(spritesmith(opts)).on('error', function (err) {
		console.log(err)
	});
	const imgStreamPc = spriteDataPC.img.pipe(gulp.dest(`${DIR.DEST}/img/sprite`));
	const cssStreamPc = spriteDataPC.css.pipe(gulp.dest(`${DIR.SRC}/scss/component`));
	// const cssStreamPc = spriteDataPC.css.pipe(gulp.dest(`${DIR.SRC}/scss/sprite`));
	return merge(imgStreamPc, cssStreamPc);
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
	gulp.watch(SRC.SPRITE, gulp.series(cleanSprite, spriteTaskPC)).on('change', reload);
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

const build = gulp.series(clean, gulp.parallel(spriteTaskPC, cssTask, copyFont, copyImg, jsTask, htmlInclude, imageMin));

exports.clean = clean;
exports.cleanSprite = cleanSprite;
exports.spriteTaskPC = spriteTaskPC;
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
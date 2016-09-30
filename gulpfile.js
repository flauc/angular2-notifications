var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    runSeq = require('run-sequence'),
    symdest = require('gulp-symdest'),
    series = require('stream-series'),
    inject = require('gulp-inject'),
    uglify = require('gulp-uglify'),
    cssMinify = require('gulp-cssnano'),
    rimraf = require('gulp-rimraf'),
    concat = require('gulp-concat'),
    systemBuilder = require('systemjs-builder'),
    embedTemplates = require('gulp-angular-embed-templates'),

    config = {
        vendor: {
            js: [
                'node_modules/core-js/client/shim.min.js',
                'node_modules/zone.js/dist/zone.js',
                'node_modules/reflect-metadata/Reflect.js',
                'node_modules/systemjs/dist/system.src.js'
            ],

            css: [
                'style.css'
            ]
        },

        tsFiles: 'app/**/**.js',
        tsConfig: 'tsconfig.json',
        buildDir: './build/'

    };


/*
 PRODUCTION BUILD
 */

gulp.task('prod-build', (d) => {
    runSeq('clean-prod', 'prod-main', d);
});

gulp.task('prod-main', ['prod-base'], () => {
    var target = gulp.src('index.html'),
    cssStream = gulp.src(config.vendor.css, {read: false}),
    vendorStream = gulp.src(config.buildDir + 'main.js', {read: false});

    return target
        .pipe(inject(series(vendorStream, cssStream), {addRootSlash: false, transform: (filepath, file, i, length) => filepath.split('.')[1] === 'css' ? `<link rel="stylesheet" href="${filepath}">` : `<script src="${filepath}" defer async></script>`}))
        .pipe(gulp.dest('./'));
});

gulp.task('prod-base', ['system-build'], () => {

    var files = config.vendor.js;
    files.push(config.buildDir + 'temp/total.js');

    return gulp.src(files)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(config.buildDir))
});

gulp.task('embed-templates', () => {
    gulp.src(config.tsFiles)
    .pipe(embedTemplates({sourceType:'js', minimize: {quotes: true, empty: true}}))
    .pipe(gulp.dest('app/'));
});

gulp.task('system-build', ['embed-templates'], () => {
    var builder = new systemBuilder();

return builder.loadConfig('system.config.js')
        .then(() => builder.buildStatic('app',  config.buildDir + 'temp/total.js'))
});

gulp.task('clean-prod', () => {
    return gulp.src(config.buildDir, {read: false})
        .pipe(rimraf());
});

// Development Build
gulp.task('dev-build', () => {

    var js = config.vendor.js;

    js.push('system.config.js');
    js.push('system.js');

    var target = gulp.src('index.html'),
        cssStream = gulp.src(config.vendor.css, {read: false}),
        vendorStream = gulp.src(js, {read: false});

    return target
        .pipe(inject(series(vendorStream, cssStream), {addRootSlash: false}))
        .pipe(gulp.dest('./'));
});

// Static Server + watching scss/html files
gulp.task('serve', () => {

    browserSync.init({
    proxy: {
        target: "http://localhost:5000",
        ws: true
    }

});

    gulp.watch(config.sass, ['sass']);
    gulp.watch("app/**/**.html").on('change', browserSync.reload);
});
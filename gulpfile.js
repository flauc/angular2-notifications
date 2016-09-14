var gulp = require('gulp'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    deleteLines = require('gulp-delete-lines'),
    paths = {
        src: [
            './lib/**',
            './src/**'
        ],
        example: './example/node_modules/angular2-notifications',
        exampleClean: [
            './example/node_modules/angular2-notifications/lib',
            './example/node_modules/angular2-notifications/src'
        ],
        declarations: {
            src: './lib/**/**.d.ts',
            fileName: 'components.d.ts',
            dest: './'
        }
    };

gulp.task('clean', () => {
    return del(paths.exampleClean)
});

gulp.task('move-example', ['clean'], () => {
   return gulp.src(paths.src, { base: './' }).pipe(gulp.dest(paths.example))
});

gulp.task('concat-dts', () => {
    return gulp.src(paths.declarations.src)
        .pipe(concat(paths.declarations.fileName))
        .pipe(deleteLines({
            'filters': [/^(import)((?!@angular).)*$/i]
        }))
        .pipe(gulp.dest(paths.declarations.dest));
});

gulp.task('serve', ['move-example'], () => {

    browserSync.init({
        server: {
            baseDir: "./example/",
            index: "index.html"
        }
    });

    gulp.watch(paths.src, ['move-example']);
    gulp.watch(paths.example + '/app/**/**').on('change', browserSync.reload);
    gulp.watch(paths.example + '/node_modules/**/**').on('change', browserSync.reload);
});
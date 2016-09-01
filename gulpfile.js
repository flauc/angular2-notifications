var gulp = require('gulp'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    paths = {
        src: [
            './lib/**',
            './src/**'
        ],
        example: './example/node_modules/angular2-notifications',
        exampleClean: [
            './example/node_modules/angular2-notifications/lib',
            './example/node_modules/angular2-notifications/src'
        ]
    };

gulp.task('clean', () => {
    return del(paths.exampleClean)
});

gulp.task('move-example', ['clean'], () => {
   return gulp.src(paths.src, { base: './' }).pipe(gulp.dest(paths.example))
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
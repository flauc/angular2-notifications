var gulp = require('gulp'),
    del = require('del'),
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
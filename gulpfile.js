let gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    return gulp.src('app/scss/style.scss')
        .pipe(sass({ outputStyle: 'compressed' })) //  {outputStyle: 'compressed'} expanded сжимает css
        .pipe(rename({ suffix: '.min' })) // переписывает style.scss на style.min.scss
        .pipe(autoprefixer({ // < ---  автопрефиксер
            overrideBrowserslist: ['last 8 versions'] // < ---  автопрефиксер
        })) // < ---  автопрефиксер
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('style', function() {
    return gulp.src([
            'node_modules/normalize.css/normalize.css',
            'node_modules/slick-carousel/slick/slick.css'
        ])
        .pipe(gulp.dest('app/css'))
});
gulp.task('script', function() {
    return gulp.src([
            'node_modules/slick-carousel/slick/slick.js'
        ])
        .pipe(gulp.dest('app/js'))
});

gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function() {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('app/scss/style.scss', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync'))
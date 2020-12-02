import gulp from 'gulp';
import babel from 'gulp-babel';
import minify from 'gulp-minify';

exports.default = () => {
    return gulp.src('./src/hashparser.js')
        .pipe(babel())
        .pipe(minify())
        .pipe(gulp.dest('./dist'));
};

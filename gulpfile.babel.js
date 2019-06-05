import gulp from 'gulp';
import babel from 'gulp-babel';

exports.default = () => {
    return gulp.src('./src/hashparser.js')
        .pipe(babel())
        .pipe(gulp.dest('./dist'));
};
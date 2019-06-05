import gulp from 'gulp';
import babel from 'gulp-babel';

function build() {
    return gulp.src('./src/hashparser.js')
        .pipe(babel())
        .pipe(gulp.dest('./dist'));
}

exports.default = build;
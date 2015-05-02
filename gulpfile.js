var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});
var del = require('del');
var transform = require('vinyl-transform');
var browserify = require('browserify');

gulp.task('default', [
    'clean:build',
    'check',
    'test',
    'build',
    'test:build'
]);

gulp.task('clean:build', function (done) {
    del([
        config.build
    ], done);
});

gulp.task('check', ['clean:build'], function () {
    return gulp.src(config.allJs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('test', ['check'], function () {
    return gulp.src(config.allJs)
        .pipe($.mocha());
});

gulp.task('build', ['test'], function () {
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src(config.sourcejs)
        .pipe(browserified)
        .pipe($.uglify())
        .pipe($.concat(config.outputjs))
        .pipe(gulp.dest(config.build));
});

gulp.task('test:build', ['build'], function () {
    return gulp.src([
        config.build + config.outputjs,
        config.testjs
    ])
        .pipe($.mocha());
});

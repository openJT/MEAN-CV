var gulp = require('gulp'),
    merge = require('merge-stream'),
    inject = require("gulp-inject"),
    concat = require('gulp-concat'),
    cssmin = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    gulpFilter = require('gulp-filter'),
    templateCache = require('gulp-angular-templatecache'),
    order = require('gulp-order'),
    path = require('path'),
    ngAnnotate = require('gulp-ng-annotate'),
    angularFilesort = require('gulp-angular-filesort'),
    es = require('event-stream'),
    bowerFiles = require('main-bower-files'),
    bower = require('gulp-bower'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    wait = require('gulp-wait'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create();


gulp.task('default', ['dev']);

gulp.task('prod', function () {
    runSequence('copyPrivate', 'copyFavicon', 'copyAssets', 'serverCopy', 'templates', 'getLocal', 'ConcatBowerAllInOne', 'injectProd');
});

gulp.task('devDaemon', function (cb) {
    return nodemon({script: 'server/app.js', ext: 'js', watch: ['server/**/*.*']})
        .on('start', cb);
});

gulp.task('dev', function () {
    runSequence('browser-sync', 'devDaemon', 'watch');
});

gulp.task('browser-sync', function () {
     browserSync.init(null, {
        proxy: "localhost:9000"
    });
});

gulp.task('livereload', function () {
    gulp.src('apps/cv/index.html')
        .pipe(wait(1500))
        .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['apps/cv/**/*.*', '!apps/cv/bower.json', '!apps/cv/bower*/**/*.*'], ['livereload']);

});
gulp.task('cssPrefix', function () {
    return gulp.src('apps/cv/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});
gulp.task('injectLocal', function () {

    var target = gulp.src('apps/cv/index.html');
    var sources = gulp.src('apps/cv/js/**/*.js')
        .pipe(angularFilesort())
        .pipe(ngAnnotate());

    var sources2 = gulp.src('apps/cv/css/**/*.css');

    var sources3 = gulp.src(bowerFiles({
        paths: 'apps/cv/'
    }));

    var merged = es.merge(sources, sources2, sources3);

    return target.pipe(inject(merged, {ignorePath: '/apps/'}))
        .pipe(gulp.dest('apps/cv/'));

});

gulp.task('bower', function () {
    return bower({cwd: path.join(__dirname, 'apps/cv')})
});

gulp.task('injectProd', function () {

    return gulp.src('apps/cv/index.html')
        .pipe(inject(
            gulp.src([path.join('build/apps/cv/', '/**/*.js')]), {ignorePath: '/build/apps/'}
        ))
        .pipe(inject(
            gulp.src([path.join('build/apps/cv/', '/*.css')])
                .pipe(order([
                    "**/*local.css",
                    "**/*.css"
                ]))
            , {ignorePath: '/build/apps/'}
        ))
        .pipe(gulp.dest('build/apps/cv/'));

});

gulp.task('templates', function () {
    return gulp.src('apps/cv/**/*.html')
        .pipe(templateCache({module: 'app', root: 'cv'}))
        .pipe(gulp.dest(path.join('build/apps/cv/', '/partials/')));

});

gulp.task('getLocal', function () {
    var stream1 = gulp.src('apps/cv/js/**/*.js')
        .pipe(angularFilesort())
        .pipe(ngAnnotate())
        .pipe(concat('local' + '.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/apps/cv/'));
    var stream2 = gulp.src('apps/cv/css/*.css')
        .pipe(concat('local' + '.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('build/apps/cv'));
    return merge(stream1, stream2);

});

gulp.task('ConcatBowerAllInOne', function () {
    var jsFilter = gulpFilter('**/*.js', {restore: true}),
        cssFilter = gulpFilter('**/*.css', {restore: true});
    var stream1 = gulp.src(bowerFiles({
        paths: 'apps/cv/'
    }))
        .pipe(jsFilter)
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('./build/apps/cv/'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter);

    var stream2 = gulp.src('apps/cv/css/animate.css');

    return merge(stream1, stream2)
        .pipe(cssmin())
        .pipe(concat('libs.min.css'))
        .pipe(gulp.dest('build/apps/cv'));
});

gulp.task('serverCopy', function () {
    return gulp.src('server/**/*.*')
        .pipe(gulp.dest('build/server'));
});

gulp.task('copyAssets', function () {
    return gulp.src('assets/**/*.*')
        .pipe(gulp.dest('build/assets'));
});

gulp.task('copyFavicon', function () {
    return gulp.src('apps/favicon.ico')
        .pipe(gulp.dest('build/apps'));
});

gulp.task('copyPrivate', function () {
    return gulp.src('private/**/*.*')
        .pipe(gulp.dest('build/private'));
});
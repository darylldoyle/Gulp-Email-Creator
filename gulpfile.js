// Include gulp
var gulp = require('gulp'); 
 
// Include Our Plugins
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var inlineCss = require('gulp-inline-css');
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
 
 
// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('src/css'))
    .pipe(livereload(server));
});

// Livereload
gulp.task('listen', function(next) {
    server.listen(35729, function(err) {
        if (err) return console.log;
        next();
    });
});

// Build our templates
gulp.task('build', function() {
    return gulp.src('src/html/*.html')
        .pipe(inlineCss({
                applyStyleTags: true,
                applyLinkTags: true,
                removeStyleTags: true,
                removeLinkTags: true
        }))
        .pipe(gulp.dest('output/'));
});
 
// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch(['src/scss/*.scss','src/html/*.html'], ['build']);
    gulp.watch('output/*.html').on('change', function(file) {
        livereload(server).changed(file.path);
    });
});
 
// Default Task
gulp.task('default', ['sass', 'listen', 'build', 'watch']);
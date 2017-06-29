/**
 * Created by XuedaoYuan on 2017/6/29 下午3:43.
 */
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer'); //自动添加前缀
var uglify = require('gulp-uglify'), // js压缩
    rename = require('gulp-rename'), // 文件重命名
    sourcemaps = require('gulp-sourcemaps'); // 来源地图



gulp.task('mfcss', function() {
    return gulp.src('src/*.css') //压缩的文件
        .pipe(autoprefixer({
            browsers: ['>5%', 'Android >= 4.0', 'ios_saf >= 7.0'],
            cascade: true,
            remove: true
        }))
        .pipe(sourcemaps.init()) // 执行sourcemaps
        .pipe(rename({ suffix: '.min' })) // 重命名
        .pipe(minifycss()) //执行压缩
        .pipe(sourcemaps.write('/')) // 地图输出路径（存放位置）
        .pipe(gulp.dest('dist/css')); //输出文件夹

});


gulp.task('script', function() {
    return gulp.src(['src/*.js', '!*.min.js']) // 指明源文件路径、并进行文件匹配，排除 .min.js 后缀的文件
        .pipe(sourcemaps.init()) // 执行sourcemaps
        .pipe(rename({ suffix: '.min' })) // 重命名
        .pipe(uglify()) // 使用uglify进行压缩，并保留部分注释
        .pipe(sourcemaps.write('/')) // 地图输出路径（存放位置）
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['mfcss', 'script']);



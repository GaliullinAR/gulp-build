const {src, dest, watch, series, parallel} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;

function browser() {
    browserSync.init({
        server: {
            baseDir: './src/'
        },
        port: 9000,
        notify: false
    })
}

function scripts() {
    return src('./src/js/app.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('./src/js/'))
}

function styles() {
    return src('./src/scss/style.scss')
    .pipe(scss({
        outputStyle: 'compressed'
    })).on('error', scss.logError)
    .pipe(concat('style.min.css'))
    .pipe(dest('./src/css/'))
    .pipe(browserSync.stream());
}

function watcher() {
    watch('./src/scss/style.scss', styles);
    watch('./src/js/app.js', scripts);
    watch('./src/*.html').on('change', browserSync.reload);
}

exports.watcher = watcher;
exports.styles = styles;
exports.scripts = scripts;
exports.browser = browser;
exports.default = parallel(browser, watcher);


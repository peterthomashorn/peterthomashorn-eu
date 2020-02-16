const path = require('path');
const { src, dest, series, parallel, watch } = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const replace = require('gulp-replace');
const browserSync = require('browser-sync').create();

const SOURCE_DIRECTORY = 'src/';
const BUILD_DIRECTORY = 'dist/';
const STATIC_DIRECTORY = 'static/';

function cleanBuildDirectory() {
    return del([BUILD_DIRECTORY + '**/*']);
}

function copyStaticAssets() {
    return src(STATIC_DIRECTORY + '**/*', { dot: true })
        .pipe(dest(BUILD_DIRECTORY));
}

function compileStylesheets() {
    const options = {
        outputStyle: 'compressed',
        includePaths: [
            path.join(__dirname, 'node_modules/normalize.css/')
        ]
    };

    return src(SOURCE_DIRECTORY + 'stylesheets/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(options).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(BUILD_DIRECTORY));
}

/**
 * Replace placeholders with cache busting URL parameters.
 */
function replaceRevisionParameters() {
    const revisionTag = new Date().getTime();

    return src([SOURCE_DIRECTORY + 'pages/**/*'])
        .pipe(replace('?revision=0', `?revision=${revisionTag}`))
        .pipe(dest(BUILD_DIRECTORY));
}

function getBuildTasks() {
    return series(parallel(copyStaticAssets, compileStylesheets), replaceRevisionParameters);
}

function getCleanAndBuildTasks() {
    return series(cleanBuildDirectory, getBuildTasks());
}

function serveAutomaticallyReloadingPreview() {
    browserSync.init({
        server: {
            baseDir: BUILD_DIRECTORY
        }
    });

    const directories = [
        SOURCE_DIRECTORY + '**/*',
        STATIC_DIRECTORY + '**/*'
    ];

    return watch(directories, series(getCleanAndBuildTasks(), browserSync.reload));
}

exports.default = getCleanAndBuildTasks();
exports.develop = serveAutomaticallyReloadingPreview;
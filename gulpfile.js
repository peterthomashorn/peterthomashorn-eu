const path = require('path');
const { src, dest, series, parallel } = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

const BUILD_DIRECTORY = 'dist/';

function cleanBuildDirectory() {
    return del([BUILD_DIRECTORY + '**/*']);
}

function copyStaticAssets() {
    return src('static/**/*')
        .pipe(dest(BUILD_DIRECTORY));
}

function compileScripts() {
    return src('src/scripts/main.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [
                '@babel/env',
                'minify'
            ]
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(BUILD_DIRECTORY));
}

function compileStylesheets() {
    const options = {
        outputStyle: 'compressed',
        includePaths: [
            path.join(__dirname, 'node_modules/normalize.css/')
        ]
    };

    return src('src/stylesheets/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(options).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(BUILD_DIRECTORY));
}

exports.clean = cleanBuildDirectory;
exports.build = parallel(copyStaticAssets, compileScripts, compileStylesheets);
exports.default = series(cleanBuildDirectory, exports.build);
const gulp = require('gulp');
const sass = require('gulp-sass');
const eyeglass = require('eyeglass');

const pkgPaths = require('./paths.js');

const taskNamePrefix = 'pl-styles:';

function buildSass() {
  return gulp.src(pkgPaths.srcPlSassPath('*.scss'))
    .pipe(sass(eyeglass(sass.sync().on('error', sass.logError))))
    .pipe(gulp.dest(pkgPaths.distPlStylesPath()));
}
buildSass.displayName = `${taskNamePrefix}sass:build`;
buildSass.description = 'Compiles pattern library CSS files from source SASS.';

function watchSass(done) {
  gulp.watch(
    pkgPaths.srcPlSassPath('**', '*.scss'),
    buildSass,
  );
  done();
}
watchSass.displayName = `${taskNamePrefix}sass:watch`;
watchSass.description = 'Watches for changes to styleguide SASS and compiles to CSS.';

module.exports = {
  buildSass,
  watchSass,
};

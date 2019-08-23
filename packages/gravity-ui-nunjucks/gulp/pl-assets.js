const gulp = require('gulp');

const pkgPaths = require('./paths.js');

const taskNamePrefix = 'pl-assets:';

function copyAssets() {
  return gulp.src(pkgPaths.srcAssetsPath('**', '*'))
    .pipe(gulp.dest(pkgPaths.distAssetsPath()));
}
copyAssets.displayName = `${taskNamePrefix}copy`;
copyAssets.description = 'Copies pattern library src assets to Fractal\'s assets dir.';

function watchAssets(done) {
  gulp.watch(
    pkgPaths.srcAssetsPath('**', '*.scss'),
    copyAssets,
  );
  done();
}
watchAssets.displayName = `${taskNamePrefix}watch`;
watchAssets.description = 'Watches for changes to pattern library assets.';

module.exports = {
  copyAssets,
  watchAssets,
};

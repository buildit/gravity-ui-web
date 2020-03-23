const gulp = require('gulp');
const nujucksRender = require('gulp-nunjucks-render');
const rename = require('gulp-rename');

const envs = require('../envs');
const pkgPaths = require('../paths');

const taskNamePrefix = 'pl-assets:';

function generateAssets() {
  return gulp.src(pkgPaths.fractalExtrasPath('robots.txt.njk'))
    .pipe(nujucksRender({
      data: { envs },
    }))
    .pipe(rename({
      extname: '',
    }))
    .pipe(gulp.dest(pkgPaths.distAssetsPath()));
}

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
  generateAssets,
  copyAssets,
  watchAssets,
};

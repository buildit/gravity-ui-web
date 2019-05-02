// Copies Gravity files to build output
const gulp = require('gulp');
const filter = require('gulp-filter');
const uiLibPaths = require('@buildit/gravity-ui-web/build-api.js');
const pkgPaths = require('./paths.js');
const { plServerReload, plServerRefreshCss } = require('./patternlab.js');

function makeCopyCss( allowEmpty = false ) {
  function copyCss() {
    return gulp.src(uiLibPaths.distPath('**', '*.css'), { allowEmpty })
      .pipe(gulp.dest(pkgPaths.distGravityPath()));
  }
  return copyCss;
}

function makeCopyOther( allowEmpty = false ) {
  function copyOther() {
    return gulp.src(uiLibPaths.distPath('**', '*'), { allowEmpty })
      .pipe(filter(['**', '!**/*.css']))
      .pipe(gulp.dest(pkgPaths.distGravityPath()));
  }
  return copyOther;
}


function watchCss() {
  gulp.watch(
    uiLibPaths.distPath('**', '*.css'),
    gulp.series(makeCopyCss(true), plServerRefreshCss)
  );
}

function watchOther() {
  gulp.watch(
    [
      uiLibPaths.distPath('**', '*'),
      `!${uiLibPaths.distPath('**', '*.css')}`
    ],
    gulp.series(makeCopyOther(true), plServerReload)
  );
}

module.exports = {
  copy: gulp.parallel(makeCopyCss(), makeCopyOther()),

  // Watch task should be able to launch with no errors, even if `gravity-ui-web`
  // has not yet been built. This is to support Lerna running `npm start`
  // for `gravity-ui-web` and `gravity-ui-nunjucks` concurrently.
  watch: gulp.series(
    gulp.parallel(makeCopyCss(true), makeCopyOther(true)),
    gulp.parallel(watchCss, watchOther)
  )
};

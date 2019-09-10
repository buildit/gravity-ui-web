// Copies Gravity files to build output
const gulp = require('gulp');
const filter = require('gulp-filter');
const uiLibPaths = require('@buildit/gravity-ui-web/build-api.js');
const pkgPaths = require('../paths.js');

const taskNamePrefix = 'gravity:';

function makeCopyCssTask(allowEmpty = false) {
  function copyCss() {
    return gulp.src(uiLibPaths.distPath('**', '*.css'), { allowEmpty })
      .pipe(gulp.dest(pkgPaths.distGravityPath()));
  }
  copyCss.displayName = `${taskNamePrefix}css`;
  copyCss.description = 'Copies Gravity\'s CSS files to the build output.';

  return copyCss;
}

function makeCopyOtherTask(allowEmpty = false) {
  function copyOther() {
    return gulp.src(uiLibPaths.distPath('**', '*'), { allowEmpty })
      .pipe(filter(['**', '!**/*.css']))
      .pipe(gulp.dest(pkgPaths.distGravityPath()));
  }
  copyOther.displayName = `${taskNamePrefix}other`;
  copyOther.description = 'Copies Gravity\'s other assets to the build output.';

  return copyOther;
}

function watchCss() {
  gulp.watch(
    uiLibPaths.distPath('**', '*.css'),
    makeCopyCssTask(true),
  );
}
watchCss.displayName = `${taskNamePrefix}css:watch`;
watchCss.description = 'Watches for changes to Gravity\'s CSS files.';

function watchOther() {
  gulp.watch(
    [
      uiLibPaths.distPath('**', '*'),
      `!${uiLibPaths.distPath('**', '*.css')}`,
    ],
    makeCopyOtherTask(true),
  );
}
watchOther.displayName = `${taskNamePrefix}other:watch`;
watchOther.description = 'Watches for changes to Gravity\'s other assets.';

module.exports = {
  makeCopyTask: (allowEmpty = false) => gulp.parallel(
    makeCopyCssTask(allowEmpty),
    makeCopyOtherTask(allowEmpty),
  ),

  // Watch task should be able to launch with no errors, even if `gravity-ui-web`
  // has not yet been built. This is to support Lerna running `npm start`
  // for `gravity-ui-web` and `gravity-ui-nunjucks` concurrently.
  watch: gulp.series(
    gulp.parallel(makeCopyCssTask(true), makeCopyOtherTask(true)),
    gulp.parallel(watchCss, watchOther),
  ),
};

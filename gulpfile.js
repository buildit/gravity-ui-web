/******************************************************
 * GRAVITY UI LIB + LIVING STYLE GUIDE
 *
 * Contains tasks to:
 *
 * - Build the UI lib
 * - Build the living style guide
 *
******************************************************/


const gulp = require('gulp');
const del = require('del');
const pkgPaths = require('./index.js');
const plTasks = require('./gulp/patternlab.js');
const uiLibTasks = require('./gulp/ui-lib.js');

// Define composite tasks:

gulp.task('clean', function(){
  return del([
    pkgPaths.normalizePath(pkgPaths.bldRootDir, '*'),
    ...plTasks.generatedFileGlobs
  ]);
});

gulp.task('styleguide', gulp.series(uiLibTasks.buildTasks, plTasks.plBuildTask));

gulp.task('serve', gulp.series(
  uiLibTasks.buildTasks,
  gulp.parallel(plTasks.plServeTask, uiLibTasks.watchTask),
));

gulp.task('default', uiLibTasks.buildTasks);

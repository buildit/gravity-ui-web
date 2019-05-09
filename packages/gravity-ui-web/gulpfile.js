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
const pkgPaths = require('./gulp/paths.js');
const uiLibTasks = require('./gulp/ui-lib.js');

// Define composite tasks:

gulp.task('clean', function(){
  return del([
    pkgPaths.pkgRootPath('dist', '**', '*')
  ]);
});

gulp.task('watch', gulp.series(
  uiLibTasks.buildTasks,
  uiLibTasks.watchTask
));

gulp.task('default', uiLibTasks.buildTasks);

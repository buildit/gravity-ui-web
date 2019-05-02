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
const plTasks = require('./gulp/patternlab.js');
const gravityTasks = require('./gulp/gravity.js');

// Define composite tasks:

gulp.task('clean', function(){
  return del([
    pkgPaths.pkgRootPath('dist', '**', '*'),
    ...plTasks.generatedFileGlobs
  ]);
});


module.exports = {
  default: gulp.parallel(plTasks.plBuildTask, gravityTasks.copy),
  serve: gulp.parallel(plTasks.plServeTask, gravityTasks.watch)
};

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
const plTasks = require('./gulp/patternlab.js');
const bsTasks = require('./gulp/browsersync.js');
const uiLibTasks = require('./gulp/ui-lib.js');

// Define composite tasks:

gulp.task('styleguide', gulp.parallel(plTasks.plBuildTask, uiLibTasks.sassBuildTask));

// gulp.task('serve', gulp.series(
//   'styleguide',
//   bsTasks.initTask,
//   gulp.parallel(
//     plTasks.plWatchOnlyTask,
//     uiLibTasks.watchTask
//   )
// ));

gulp.task('serve', gulp.parallel(
  gulp.series(uiLibTasks.sassBuildTask, uiLibTasks.watchTask),
  plTasks.plServeTask
));

gulp.task('default', uiLibTasks.sassBuildTask);

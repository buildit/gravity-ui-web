/******************************************************
 * GRAVITY UI LIB + LIVING STYLE GUIDE
 *
 * Contains tasks to:
 *
 * - Build the UI lib
 * - Build the living style guide
 *
******************************************************/

// const sass = require('gulp-sass');
// const eyeglass = require('eyeglass');

// gulp.task('pl-sass', function () {
//   const sassOptions = {
//     // TODO: Eyeglass integration
//   };

//   return gulp.src(path.resolve(paths().source.sass, 'gravity.scss'))
//     .pipe(sass(eyeglass(sassOptions)).on('error', sass.logError))
//     .pipe(gulp.dest(path.resolve(paths().public.css)))
//     .pipe(browserSync.stream());
// })

// gulp.task('default', gulp.series('patternlab:build'));

const gulp = require('gulp');
const plTasks = require('./gulp/patternlab.js');
const bsTasks = require('./gulp/browsersync.js');
const uiLibTasks = require('./gulp/ui-lib.js');

// const plServeTask = gulp.series(plBuildTask, plConnectTask, watch);
// plServeTask.displayName = taskNamePrefix + 'serve';
// plServeTask.description = 'Builds styleguide, starts BrowserSync and starts watching styleguide source files.';



gulp.task('styleguide', gulp.parallel(plTasks.plBuildTask, uiLibTasks.sassBuildTask));

gulp.task('serve', gulp.series(
  'styleguide',
  bsTasks.initTask,
  gulp.parallel(
    plTasks.plWatchOnlyTask,
    uiLibTasks.watchTask
  )
));

gulp.task('default', uiLibTasks.sassBuildTask);

const gulp = require('gulp');
const sass = require('gulp-sass');
const svgo = require('gulp-svgo');
const eyeglass = require('eyeglass');
const chalk = require('chalk');

const gravityUiSass = require('../index.js');
const browserSync = require('./browsersync.js');

const taskNamePrefix = 'ui-lib:';


function sassBuildTask () {
  const sassOptions = {
    // TODO: Eyeglass integration
  };

  return gulp.src(gravityUiSass.srcSassFilePath)
    .pipe(sass(eyeglass(sassOptions)).on('error', sass.logError))
    .pipe(gulp.dest(gravityUiSass.bldUiLibDir))
    .pipe(browserSync.stream());
}
sassBuildTask.displayName = taskNamePrefix + 'sass';
sassBuildTask.description = 'Compiles SASS.';


function svgBuildTask () {
  const svgoOptions = {

  };

  return gulp.src(gravityUiSass.normalizePath(gravityUiSass.srcImgDir, '**', '*.svg'))
    .pipe(svgo(svgoOptions))
    .pipe(gulp.dest(gravityUiSass.bldImgDir))
    .pipe(browserSync.stream());
}
svgBuildTask.displayName = taskNamePrefix + 'svg';
svgBuildTask.description = 'Optimises SVG images.';


// Composite task to do complete UI lib build
const buildTasks = gulp.parallel(sassBuildTask, svgBuildTask);
buildTasks.displayName = taskNamePrefix + 'build';
buildTasks.description = 'Builds the Gravity UI library.';


function watchTask() {
  const watchers = [
    {
      name: 'SASS',
      paths: [gravityUiSass.normalizePath(gravityUiSass.srcSassDir, '**', '*.scss')],
      config: { awaitWriteFinish: true },
      tasks: gulp.series(sassBuildTask, browserSync.reloadCSS)
    },
    {
      name: 'SVG',
      paths: [gravityUiSass.normalizePath(gravityUiSass.srcImgDir, '**', '*.svg')],
      config: { awaitWriteFinish: true },
      tasks: svgBuildTask
    }
  ];

  watchers.forEach(watcher => {
    console.log('\n' + chalk.bold('Watching ' + watcher.name + ':'));
    watcher.paths.forEach(p => console.log('  ' + p));
    gulp.watch(watcher.paths, watcher.config, watcher.tasks);
  });
  console.log();
}
watchTask.displayName = taskNamePrefix + 'watch';
watchTask.description = 'Watches UI library files';



module.exports = {
  sassBuildTask,
  svgBuildTask,
  buildTasks,
  watchTask
};


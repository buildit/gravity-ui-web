const gulp = require('gulp');
const sass = require('gulp-sass');
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



function watchTask() {
  const watchers = [
    {
      name: 'SASS',
      paths: [gravityUiSass.normalizePath(gravityUiSass.srcSassDir, '**', '*.scss')],
      config: { awaitWriteFinish: true },
      tasks: gulp.series(sassBuildTask, browserSync.reloadCSS)
    }
  ];

  watchers.forEach(watcher => {
    console.log('\n' + chalk.bold('Watching ' + watcher.name + ':'));
    watcher.paths.forEach(p => console.log('  ' + p));
    gulp.watch(watcher.paths, watcher.config, watcher.tasks);
  });
  console.log();
}
watchTask.watchTask = taskNamePrefix + 'watch';
watchTask.watchTask = 'Watches UI library files';



module.exports = {
  sassBuildTask,
  watchTask
};


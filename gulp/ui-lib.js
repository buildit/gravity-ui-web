const gulp = require('gulp');
const sass = require('gulp-sass');
const eyeglass = require('eyeglass');
const path = require('path');
const chalk = require('chalk');
const helpers = require('./helpers.js');
const browserSync = require('./browsersync.js');

const paths = require('../patternlab-config.json').paths;

const taskNamePrefix = 'ui-lib:';

//"sass": "./src/ui-lib/sass/",

function sassBuildTask () {
  const sassOptions = {
    // TODO: Eyeglass integration
  };

  return gulp.src(path.resolve(paths.source.sass, 'gravity.scss'))
    .pipe(sass(eyeglass(sassOptions)).on('error', sass.logError))
    .pipe(gulp.dest(path.resolve(paths.public.css)))
    .pipe(browserSync.stream());
}
sassBuildTask.displayName = taskNamePrefix + 'sass';
sassBuildTask.description = 'Compiles SASS.';



function watchTask() {
  const watchers = [
    {
      name: 'SASS',
      paths: [helpers.normalizePath(paths.source.sass, '**', '*.scss')],
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


const gulp = require('gulp');
const sass = require('gulp-sass');
const svgo = require('gulp-svgo');
const svgSymbols = require('gulp-svg-symbols');
const rename = require("gulp-rename");

const eyeglass = require('eyeglass');
const chalk = require('chalk');

const paths = require('./paths.js');
const browserSync = require('./browsersync.js');

const taskNamePrefix = 'ui-lib:';


function sassBuildTask () {
  const sassOptions = {
    // TODO: Eyeglass integration
  };

  return gulp.src(paths.srcSassFilePath)
    .pipe(sass(eyeglass(sassOptions)).on('error', sass.logError))
    .pipe(gulp.dest(paths.bldUiLibDir))
    .pipe(browserSync.stream());
}
sassBuildTask.displayName = taskNamePrefix + 'sass';
sassBuildTask.description = 'Compiles SASS.';



function svgSymbolsTask () {
  return gulp.src(paths.normalizePath(paths.srcSymbolsDir, '**', '*.svg'))
    .pipe(svgo({
      plugins: [
        {
          removeTitle: false
        },
        {
          removeViewBox: false
        },
        {
          removeDimensions: true
        }
      ]
    }))
    .pipe(svgSymbols({
      svgAttrs: {
        'style': 'display: none;',
        'aria-hidden': 'true'
      },
      templates: [
        'default-svg',
        paths.normalizePath(__dirname, 'templates', 'symbols.json')
      ]
    }))
    .pipe(rename({
      basename: paths.symbolsBasename
    }))
    .pipe(gulp.dest(paths.bldUiLibDir))
    .pipe(browserSync.stream());
}
svgSymbolsTask.displayName = taskNamePrefix + 'svg-symbols';
svgSymbolsTask.description = 'Compiles symbols.svg file.';


function copyJsTask() {
  return gulp.src(paths.normalizePath(paths.srcJsDir, '**', '*.js'))
    .pipe(gulp.dest(paths.bldUiLibDir));
}
copyJsTask.displayName = taskNamePrefix + 'js';
copyJsTask.description = 'Copies JS files.';


// Composite task to do complete UI lib build
const buildTasks = gulp.parallel(sassBuildTask, svgSymbolsTask, copyJsTask);
buildTasks.displayName = taskNamePrefix + 'build';
buildTasks.description = 'Builds the Gravity UI library.';


function watchTask() {
  const watchers = [
    {
      name: 'SASS',
      paths: [paths.normalizePath(paths.srcSassDir, '**', '*.scss')],
      config: { awaitWriteFinish: true },
      tasks: gulp.series(sassBuildTask, browserSync.reloadCSS)
    },
    {
      name: 'SVG Sprites',
      paths: [paths.normalizePath(paths.srcSymbolsDir, '**', '*.svg')],
      config: { awaitWriteFinish: true },
      tasks: svgSymbolsTask
    },
    {
      name: 'JS',
      paths: [paths.normalizePath(paths.srcJsDir, '**', '*.js')],
      config: { awaitWriteFinish: true },
      tasks: gulp.series(copyJsTask, browserSync.reload)
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
  svgSymbolsTask,
  buildTasks,
  watchTask
};


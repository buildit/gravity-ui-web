/******************************************************
 * EXPORTS PATTERN LAB TASKS
 *
 * Note that substantial chunks of this file were
 * originally copied from Pattern Lab's Node Gulp
 * Edition gulpfile:
 * https://github.com/pattern-lab/edition-node-gulp/blob/master/gulpfile.js
 *
******************************************************/
const gulp = require('gulp');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const helpers = require('./helpers.js');
const browserSync = require('./browsersync.js');

const taskNamePrefix = 'patternlab:';



/******************************************************
 * COPY TASKS - stream assets from source to destination
******************************************************/
// JS copy
function copyJsTask () {
  return gulp.src('**/*.js', {cwd: helpers.normalizePath(paths().source.js)} )
    .pipe(gulp.dest(helpers.normalizePath(paths().public.js)));
};
copyJsTask.displayName = taskNamePrefix + 'copy:js';
copyJsTask.description = 'Copies *.js files from source to dist folder.';

// Images copy
function copyImagesTask () {
  return gulp.src('**/*.*',{cwd: helpers.normalizePath(paths().source.images)} )
    .pipe(gulp.dest(helpers.normalizePath(paths().public.images)));
};
copyImagesTask.displayName = taskNamePrefix + 'copy:img';
copyImagesTask.description = 'Copies image files from source to dist folder.';

// Favicon copy
function copyFaviconTask () {
  return gulp.src('favicon.ico', {cwd: helpers.normalizePath(paths().source.root)} )
    .pipe(gulp.dest(helpers.normalizePath(paths().public.root)));
};
copyFaviconTask.displayName = taskNamePrefix + 'copy:favicon';
copyFaviconTask.description = 'Copies favicon.ico from source to dist folder.';

// Fonts copy
function copyFontsTask () {
  return gulp.src('*', {cwd: helpers.normalizePath(paths().source.fonts)})
    .pipe(gulp.dest(helpers.normalizePath(paths().public.fonts)));
};
copyFontsTask.displayName = taskNamePrefix + 'copy:fonts';
copyFontsTask.description = 'Copies fonts dir from source to dist folder.';

// Static assets copy
function copyAssetsTask () {
  return gulp.src('*', {cwd: helpers.normalizePath(paths().source.assets)})
    .pipe(gulp.dest(helpers.normalizePath(paths().public.assets)));
};
copyAssetsTask.displayName = taskNamePrefix + 'copy:assets';
copyAssetsTask.description = 'Copies assets dir from source to dist folder.';

// CSS files
function copyCssTask () {
  return gulp.src(helpers.normalizePath(paths().source.css) + '/**/*.css')
    .pipe(gulp.dest(helpers.normalizePath(paths().public.css)))
    .pipe(browserSync.stream());
};
copyCssTask.displayName = taskNamePrefix + 'copy:css';
copyCssTask.description = 'Copies CSS files from source to dist folder.';


// =======================

// Styleguide Copy everything but css
function sgFilesTask () {
  return gulp.src(helpers.normalizePath(paths().source.styleguide) + '/**/!(*.css)')
    .pipe(gulp.dest(helpers.normalizePath(paths().public.root)))
    .pipe(browserSync.stream());
};
sgFilesTask.displayName = taskNamePrefix + 'sg:files';
sgFilesTask.description = 'Copies files required by Pattern Lab\'s UI.';


// Styleguide Copy and flatten css
function sgCssTask () {
  return gulp.src(helpers.normalizePath(paths().source.styleguide) + '/**/*.css')
    .pipe(gulp.dest(function (file) {
      //flatten anything inside the styleguide into a single output dir per http://stackoverflow.com/a/34317320/1790362
      file.path = path.join(file.base, path.basename(file.path));
      return helpers.normalizePath(path.join(paths().public.styleguide, '/css'));
    }))
    .pipe(browserSync.stream());
};
sgCssTask.displayName = taskNamePrefix + 'sg:css';
sgCssTask.description = 'Copies CSS required by Pattern Lab\'s UI.';

/******************************************************
 * PATTERN LAB CONFIGURATION - API with core library
******************************************************/
//read all paths from our namespaced config file
const config = require('../patternlab-config.json'),
  patternlab = require('patternlab-node')(config);

function paths() {
  return config.paths;
}

function getConfiguredCleanOption() {
  return config.cleanPublic;
}

/**
 * Performs the actual build step. Accomodates both async and sync
 * versions of Pattern Lab.
 * @param {function} done - Gulp done callback
 */
function build(done) {
  const buildResult = patternlab.build(() => {}, getConfiguredCleanOption());

  // handle async version of Pattern Lab
  if (buildResult instanceof Promise) {
    return buildResult.then(done);
  }

  // handle sync version of Pattern Lab
  done();
  return null;
}


const plAssetsTask = gulp.parallel(
    copyAssetsTask,
    copyJsTask,
    copyImagesTask,
    copyFaviconTask,
    copyFontsTask,
    copyCssTask,
    sgFilesTask,
    sgCssTask
);
plAssetsTask.displayName = taskNamePrefix + 'assets';
plAssetsTask.description = `Runs all the ${taskNamePrefix}:copy:* and ${taskNamePrefix}:sg:* tasks in parallel.`;


function plVersionTask (done) {
  patternlab.version();
  done();
};
plVersionTask.displayName = taskNamePrefix + 'version';
plVersionTask.description = 'Outputs the Pattern Lab version';


function plHelpTask (done) {
  patternlab.help();
  done();
};
plHelpTask.displayName = taskNamePrefix + 'help';
plHelpTask.description = 'Outputs Pattern Lab help';


function plPatternsOnlyTask (done) {
  patternlab.patternsonly(done, getConfiguredCleanOption());
};
plPatternsOnlyTask.displayName = taskNamePrefix + 'patternsonly';


function plListStarterKitsTask (done) {
  patternlab.liststarterkits();
  done();
};
plListStarterKitsTask.displayName = taskNamePrefix + 'liststarterkits';


function plLoadStarterKitsTask (done) {
  patternlab.loadstarterkit(argv.kit, argv.clean);
  done();
};
plLoadStarterKitsTask.displayName = taskNamePrefix + 'loadstarterkit';


const plBuildTask = gulp.series(plAssetsTask, build);
plBuildTask.displayName = taskNamePrefix + 'build';
plBuildTask.description = 'Builds styleguide (including first running all necessary asset copy tasks)';


function plInstallPluginTask (done) {
  patternlab.installplugin(argv.plugin);
  done();
};
plInstallPluginTask.displayName = taskNamePrefix + 'installplugin';


/******************************************************
 * WATCH TASKS
******************************************************/
// watch task utility functions
function getSupportedTemplateExtensions() {
  var engines = require('../node_modules/patternlab-node/core/lib/pattern_engines');
  return engines.getSupportedFileExtensions();
}
function getTemplateWatches() {
  return getSupportedTemplateExtensions().map(function (dotExtension) {
    return helpers.normalizePath(paths().source.patterns, '**', '*' + dotExtension);
  });
}

function plWatchOnlyTask() {
  const watchers = [
    {
      name: 'CSS',
      paths: [helpers.normalizePath(paths().source.css, '**', '*.css')],
      config: { awaitWriteFinish: true },
      tasks: gulp.series(copyCssTask, browserSync.reloadCSS)
    },
    {
      name: 'Styleguide Files',
      paths: [helpers.normalizePath(paths().source.styleguide, '**', '*')],
      config: { awaitWriteFinish: true },
      tasks: gulp.series(sgFilesTask, sgCssTask, browserSync.reloadCSS)
    },
    {
      name: 'Source Files',
      paths: [
        helpers.normalizePath(paths().source.patterns, '**', '*.json'),
        helpers.normalizePath(paths().source.patterns, '**', '*.md'),
        helpers.normalizePath(paths().source.data, '**', '*.json'),
        helpers.normalizePath(paths().source.fonts, '**', '*'),
        helpers.normalizePath(paths().source.images, '**', '*'),
        helpers.normalizePath(paths().source.js, '**', '*'),
        helpers.normalizePath(paths().source.meta, '**', '*'),
        helpers.normalizePath(paths().source.annotations, '**', '*')
      ].concat(getTemplateWatches()),
      config: { awaitWriteFinish: true },
      tasks: gulp.series(build, browserSync.reload)
    }
  ];

  watchers.forEach(watcher => {
    console.log('\n' + chalk.bold('Watching ' + watcher.name + ':'));
    watcher.paths.forEach(p => console.log('  ' + p));
    gulp.watch(watcher.paths, watcher.config, watcher.tasks);
  });
  console.log();
}
plWatchOnlyTask.displayName = taskNamePrefix + 'watch-only';
plWatchOnlyTask.description = 'Starts watching styleguide source files.';




/******************************************************
 * COMPOUND TASKS
******************************************************/

const plWatchTask = gulp.series(plBuildTask, plWatchOnlyTask);
plWatchTask.displayName = taskNamePrefix + 'watch';
plWatchTask.description = 'Builds styleguide and starts watching styleguide source files.';

module.exports = {
  copyJsTask,
  copyImagesTask,
  copyFaviconTask,
  copyFontsTask,
  copyAssetsTask,
  copyCssTask,
  sgFilesTask,
  sgCssTask,
  plAssetsTask,
  plVersionTask,
  plHelpTask,
  plPatternsOnlyTask,
  plListStarterKitsTask,
  plLoadStarterKitsTask,
  plBuildTask,
  plInstallPluginTask,
  plWatchOnlyTask,
  plWatchTask
}

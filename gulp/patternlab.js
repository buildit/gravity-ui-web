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
const normalizePath = require('../index.js').normalizePath;
const browserSync = require('./browsersync.js');

const taskNamePrefix = 'patternlab:';

//read all paths from our namespaced config file
const config = require('../patternlab-config.json'),
  patternlab = require('patternlab-node')(config);

function paths() {
  return config.paths;
}

function getConfiguredCleanOption() {
  return config.cleanPublic;
}


/******************************************************
 * COPY TASKS
******************************************************/

function copyJsTask () {
  return gulp.src('**/*.js', {cwd: normalizePath(paths().source.js)} )
    .pipe(gulp.dest(normalizePath(paths().public.js)));
};
copyJsTask.displayName = taskNamePrefix + 'cp:js';
copyJsTask.description = 'Copies *.js files from source to dist folder.';


function copyImagesTask () {
  return gulp.src('**/*.*',{cwd: normalizePath(paths().source.images)} )
    .pipe(gulp.dest(normalizePath(paths().public.images)));
};
copyImagesTask.displayName = taskNamePrefix + 'cp:img';
copyImagesTask.description = 'Copies image files from source to dist folder.';


function copyFaviconTask () {
  return gulp.src('favicon.ico', {cwd: normalizePath(paths().source.root)} )
    .pipe(gulp.dest(normalizePath(paths().public.root)));
};
copyFaviconTask.displayName = taskNamePrefix + 'cp:favicon';
copyFaviconTask.description = 'Copies favicon.ico from source to dist folder.';


function copyFontsTask () {
  return gulp.src('*', {cwd: normalizePath(paths().source.fonts)})
    .pipe(gulp.dest(normalizePath(paths().public.fonts)));
};
copyFontsTask.displayName = taskNamePrefix + 'cp:fonts';
copyFontsTask.description = 'Copies fonts dir from source to dist folder.';


function copyAssetsTask () {
  return gulp.src('*', {cwd: normalizePath(paths().source.assets)})
    .pipe(gulp.dest(normalizePath(paths().public.assets)));
};
copyAssetsTask.displayName = taskNamePrefix + 'cp:assets';
copyAssetsTask.description = 'Copies assets dir from source to dist folder.';


function copyCssTask () {
  return gulp.src(normalizePath(paths().source.css) + '/**/*.css')
    .pipe(gulp.dest(normalizePath(paths().public.css)))
    .pipe(browserSync.stream());
};
copyCssTask.displayName = taskNamePrefix + 'cp:css';
copyCssTask.description = 'Copies CSS files from source to dist folder.';


// Tasks to copy Styleguide Kit assets and CSS
function skFilesTask () {
  return gulp.src(normalizePath(paths().source.styleguide) + '/**/!(*.css)')
    .pipe(gulp.dest(normalizePath(paths().public.root)))
    .pipe(browserSync.stream());
};
skFilesTask.displayName = taskNamePrefix + 'sk:files';
skFilesTask.description = 'Copies files required by Pattern Lab\'s Styleguide Kit.';


function skCssTask () {
  return gulp.src(normalizePath(paths().source.styleguide) + '/**/*.css')
    .pipe(gulp.dest(function (file) {
      //flatten anything inside the styleguide into a single output dir per http://stackoverflow.com/a/34317320/1790362
      file.path = path.join(file.base, path.basename(file.path));
      return normalizePath(path.join(paths().public.styleguide, '/css'));
    }))
    .pipe(browserSync.stream());
};
skCssTask.displayName = taskNamePrefix + 'sk:css';
skCssTask.description = 'Copies CSS required by Pattern Lab\'s UI Styleguide Kit.';


// Composite to run all copy tasks in parallel
const plAssetsTask = gulp.parallel(
    copyAssetsTask,
    copyJsTask,
    copyImagesTask,
    copyFaviconTask,
    copyFontsTask,
    copyCssTask,
    skFilesTask,
    skCssTask
);
plAssetsTask.displayName = taskNamePrefix + 'assets';
plAssetsTask.description = `Runs all the ${taskNamePrefix}:cp:* and ${taskNamePrefix}:sk:* tasks in parallel.`;


/******************************************************
 * CLI TASKS
******************************************************/

function plVersionTask (done) {
  patternlab.version();
  done();
};
plVersionTask.displayName = taskNamePrefix + 'version';
plVersionTask.description = 'eturn the version of patternlab-node you have installed';


function plHelpTask (done) {
  patternlab.help();
  done();
};
plHelpTask.displayName = taskNamePrefix + 'help';
plHelpTask.description = 'Get more information about patternlab-node, pattern lab in general, and where to report issues.';


function plPatternsOnlyTask (done) {
  patternlab.patternsonly(done, getConfiguredCleanOption());
};
plPatternsOnlyTask.displayName = taskNamePrefix + 'patternsonly';
plPatternsOnlyTask.description = 'Compiles the patterns only, outputting to config.paths.public';


function plListStarterKitsTask (done) {
  patternlab.liststarterkits();
  done();
};
plListStarterKitsTask.displayName = taskNamePrefix + 'liststarterkits';
plListStarterKitsTask.description = 'Returns a url with the list of available starterkits hosted on the Pattern Lab organization Github account';


function plLoadStarterKitsTask (done) {
  patternlab.loadstarterkit(argv.kit, argv.clean);
  done();
};
plLoadStarterKitsTask.displayName = taskNamePrefix + 'loadstarterkit';
plLoadStarterKitsTask.description = 'Load a starterkit into config.paths.source/*';


function plInstallPluginTask (done) {
  patternlab.installplugin(argv.plugin);
  done();
};
plInstallPluginTask.displayName = taskNamePrefix + 'installplugin';


/******************************************************
 * BUILD TASK
******************************************************/

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


const plBuildTask = gulp.series(plAssetsTask, build);
plBuildTask.displayName = taskNamePrefix + 'build';
plBuildTask.description = 'Compiles the patterns and frontend, outputting to config.paths.public';


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
    return normalizePath(paths().source.patterns, '**', '*' + dotExtension);
  });
}

function plWatchOnlyTask() {
  const watchers = [
    {
      name: 'CSS',
      paths: [normalizePath(paths().source.css, '**', '*.css')],
      config: { awaitWriteFinish: true },
      tasks: gulp.series(copyCssTask, browserSync.reloadCSS)
    },
    {
      name: 'Styleguide Files',
      paths: [normalizePath(paths().source.styleguide, '**', '*')],
      config: { awaitWriteFinish: true },
      tasks: gulp.series(skFilesTask, skCssTask, browserSync.reloadCSS)
    },
    {
      name: 'Source Files',
      paths: [
        normalizePath(paths().source.patterns, '**', '*.json'),
        normalizePath(paths().source.patterns, '**', '*.md'),
        normalizePath(paths().source.data, '**', '*.json'),
        normalizePath(paths().source.fonts, '**', '*'),
        normalizePath(paths().source.images, '**', '*'),
        normalizePath(paths().source.js, '**', '*'),
        normalizePath(paths().source.meta, '**', '*'),
        normalizePath(paths().source.annotations, '**', '*')
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
  // Copy tasks
  copyJsTask,
  copyImagesTask,
  copyFaviconTask,
  copyFontsTask,
  copyAssetsTask,
  copyCssTask,
  skFilesTask,
  skCssTask,
  plAssetsTask,

  // CLI
  plVersionTask,
  plHelpTask,
  plPatternsOnlyTask,
  plListStarterKitsTask,
  plLoadStarterKitsTask,
  plInstallPluginTask,

  // Build
  plBuildTask,

  // Watch tasks
  plWatchOnlyTask,
  plWatchTask
}

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
const sass = require('gulp-sass');
const eyeglass = require('eyeglass');
const argv = require('minimist')(process.argv.slice(2));

const pkgPaths = require('./paths.js');
const taskNamePrefix = 'pattern-library:';

//read all paths from our namespaced config file
const config = require('../patternlab-config.json');
const patternlab = require('@pattern-lab/core')(config);

const plPaths = config.paths;

// Exported array of glob patterns that clean tasks can use to
// delete any files generated at build-time
const generatedFileGlobs = [
  pkgPaths.pkgRootPath('dependencyGraph.json'),
  pkgPaths.pkgRootPath(plPaths.source.meta, '*.mustache')
];




/******************************************************
 * STYLEGUIDE CSS TASKS
******************************************************/

function buildSass() {
  return gulp.src(pkgPaths.pkgRootPath(plPaths.source.root, 'sass', 'pattern-scaffolding.scss'))
    .pipe(sass(eyeglass(sass.sync().on('error', sass.logError))))
    .pipe(gulp.dest(pkgPaths.pkgRootPath(plPaths.public.css)))
};
buildSass.displayName = taskNamePrefix + 'sass:build';
buildSass.description = 'Compiles pattern library CSS files from source SASS.';


/******************************************************
 * CLI TASKS
******************************************************/

function plVersionTask (done) {
  patternlab.version();
  done();
};
plVersionTask.displayName = `${taskNamePrefix}version`;
plVersionTask.description = 'eturn the version of patternlab-node you have installed';


function plHelpTask (done) {
  patternlab.help();
  done();
};
plHelpTask.displayName = `${taskNamePrefix}help`;
plHelpTask.description = 'Get more information about patternlab-node, pattern lab in general, and where to report issues.';


function plPatternsOnlyTask (done) {
  patternlab.patternsonly(done, getConfiguredCleanOption());
};
plPatternsOnlyTask.displayName = `${taskNamePrefix}patternsonly`;
plPatternsOnlyTask.description = 'Compiles the patterns only, outputting to config.paths.public';


function plListStarterKitsTask (done) {
  patternlab.liststarterkits();
  done();
};
plListStarterKitsTask.displayName = `${taskNamePrefix}liststarterkits`;
plListStarterKitsTask.description = 'Returns a url with the list of available starterkits hosted on the Pattern Lab organization Github account';


function plLoadStarterKitsTask (done) {
  patternlab.loadstarterkit(argv.kit, argv.clean);
  done();
};
plLoadStarterKitsTask.displayName = `${taskNamePrefix}loadstarterkit`;
plLoadStarterKitsTask.description = 'Load a starterkit into config.paths.source/*';


function plInstallPluginTask (done) {
  patternlab.installplugin(argv.plugin);
  done();
};
plInstallPluginTask.displayName = `${taskNamePrefix}installplugin`;


/******************************************************
 * BUILD TASK
******************************************************/

function buildPatternLibrary() {
  return patternlab.build({
    watch: argv.watch,
    cleanPublic: config.cleanPublic
  });
}
buildPatternLibrary.displayName = `${taskNamePrefix}build`;
buildPatternLibrary.description = 'Builds the styleguide';


/******************************************************
 * Server reload functions
******************************************************/

// NOTE: If multiple packages' watch/serve tasks are being run
// in parallel via Lerna, there can be a situation where these
// reload tasks are triggered before the Pattern Lab server
// is up and running.
let serverReady = false;

function serverReload() {
  if (serverReady) {
    return patternlab.server.reload();
  }
  else {
    console.warn('Server not ready. Skipping reload.');
    return Promise.resolve();
  }
}
serverReload.displayName = taskNamePrefix + 'server:reload';
serverReload.description = 'Makes the local dev server trigger a full-page reload in any connected browsers.';

function serverRefreshCss() {
  if (serverReady) {
    return patternlab.server.refreshCSS();
  }
  else {
    console.warn('Server not ready. Skipping refreshCSS.');
    return Promise.resolve();
  }
}
serverRefreshCss.displayName = taskNamePrefix + 'server:refresh-css';
serverRefreshCss.description = 'Makes the local dev server trigger a CSS reload in any connected browsers.';


/******************************************************
 * WATCH TASKS
******************************************************/

function watchSass(done) {
  gulp.watch(
    pkgPaths.pkgRootPath(plPaths.source.root, 'sass', '**', '*.scss'),
    gulp.series(buildSass, serverRefreshCss)
  );
  done()
}
watchSass.displayName = taskNamePrefix + 'sass:watch';
watchSass.description = 'Watches for changes to styleguide SASS and compiles to CSS.';


function watchPatternLibrary() {
  return patternlab.build({
    watch: true,
    cleanPublic: config.cleanPublic
  });
}
watchPatternLibrary.displayName = `${taskNamePrefix}watch`;
watchPatternLibrary.description = 'Watches for changes to styleguide source files.';


/******************************************************
 * SERVE TASK
******************************************************/

function startServer() {
  return patternlab.server.serve({
    watch: true,
    cleanPublic: config.cleanPublic
  }).then(() => {
    serverReady = true;
  });
}
startServer.displayName = taskNamePrefix + 'server:start';
startServer.description = 'Builds styleguide HTML only and launches Pattern Lab\'s built-in server.';



module.exports = {
  // CLI
  plVersionTask,
  plHelpTask,
  plPatternsOnlyTask,
  plListStarterKitsTask,
  plLoadStarterKitsTask,
  plInstallPluginTask,

  // Build
  buildSass,
  buildPatternLibrary,

  // Watch tasks
  watchSass,
  watchPatternLibrary,

  // Serve
  startServer,

  // Generated file paths
  generatedFileGlobs,

  // Export Pattern Lab server reload functions, so
  // other tasks can trigger reloads.
  serverReload,
  serverRefreshCss,
}

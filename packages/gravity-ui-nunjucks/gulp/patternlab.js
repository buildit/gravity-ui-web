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
const rename = require("gulp-rename");
const file = require('gulp-file');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const { colors } = require('@buildit/gravity-particles');

const uiLibPaths = require('@buildit/gravity-ui-web/build-api.js');
const pkgPaths = require('./paths.js');
const colorSchemeTables = require('./color-scheme-tables.js');

const taskNamePrefix = 'patternlab:';

//read all paths from our namespaced config file
const config = require('../patternlab-config.json');
const patternlab = require('@pattern-lab/core')(config);

const plPaths = config.paths;


/******************************************************
 * PRE-BUILD TASKS
 * Copies / creates any generated data or patterns that
 * are then processed by Pattern Lab in the usual way
******************************************************/

// Exported array of glob patterns that clean tasks can use to
// delete any files generated at build-time
const generatedFileGlobs = [
  pkgPaths.pkgRootPath('dependencyGraph.json'),
  pkgPaths.pkgRootPath(plPaths.source.meta, '*.mustache')
];

const generatedPatternsDirname = '_generated';
generatedFileGlobs.push(pkgPaths.srcPatternsPath(generatedPatternsDirname, '*'));
generatedFileGlobs.push(`!${pkgPaths.srcPatternsPath(generatedPatternsDirname, 'README.md')}`); // Prevent README.md from being deleted

function makePreSvgSymbolsTask (allowEmpty = false) {
  const preSvgSymbolsTask = function () {
    return gulp.src(uiLibPaths.distPath(uiLibPaths.distSvgSymbolsFilename), { allowEmpty })
      .pipe(rename('symbols.njk'))
      .pipe(gulp.dest(pkgPaths.srcPatternsPath(generatedPatternsDirname)));
  }
  preSvgSymbolsTask.displayName = taskNamePrefix + 'pre:symbols';
  preSvgSymbolsTask.description = 'Copies Gravity\'s symbols.svg file to the patterns folder.';

  return preSvgSymbolsTask;
};

function placeholderSvgSymbolsTask() {
  return file('symbols.njk', ' ', { src: true })
    .pipe(gulp.dest(pkgPaths.srcPatternsPath(generatedPatternsDirname)));
}
placeholderSvgSymbolsTask.displayName = taskNamePrefix + 'placeholder:symbols';
placeholderSvgSymbolsTask.description = 'Creates an empty symbols.svg file in the patterns folder.';


const generatedSymbolInfoFilename = '00-svg-symbols.json';
const generatedSymbolInfoDir = pkgPaths.srcPatternsPath('00-particles', '05-logos-and-icons');
generatedFileGlobs.push(path.join(generatedSymbolInfoDir, generatedSymbolInfoFilename));

function makePreSvgSymbolsInfoTask (allowEmpty = false) {
  const preSvgSymbolsInfoTask = function () {
    return gulp.src(uiLibPaths.distPath(uiLibPaths.distSvgSymbolsInfoFilename), { allowEmpty })
      .pipe(rename(generatedSymbolInfoFilename))
      .pipe(gulp.dest(generatedSymbolInfoDir));
  }
  preSvgSymbolsInfoTask.displayName = taskNamePrefix + 'pre:symbols-info';
  preSvgSymbolsInfoTask.description = 'Copies Gravity\'s symbols.json file to the patterns folder.';

  return preSvgSymbolsInfoTask;
};

function placeholderSvgSymbolsInfoTask() {
  return file(generatedSymbolInfoFilename, '{}', { src: true })
    .pipe(gulp.dest(generatedSymbolInfoDir));
}
placeholderSvgSymbolsInfoTask.displayName = taskNamePrefix + 'placeholder:symbols-info';
placeholderSvgSymbolsInfoTask.description = 'Creates an empty symbols.json file in the patterns folder.';


const generatedColorPalettesDataFilename = '01-color-palettes.json';
const generatedColorPalettesDataDir = pkgPaths.srcPatternsPath('00-particles', '00-color');
generatedFileGlobs.push(path.join(generatedColorPalettesDataDir, generatedColorPalettesDataFilename));

function preColorPaletteDataTask () {
  const colorPalettesData = {};
  colorPalettesData.colors = colors;

  return file(generatedColorPalettesDataFilename, JSON.stringify(colorPalettesData, null, 2), { src: true })
    .pipe(gulp.dest(generatedColorPalettesDataDir));
}


const generatedColorSchemeDataFilename = '02-color-schemes.json';
const generatedColorSchemeDataDir = pkgPaths.srcPatternsPath('00-particles', '00-color');
generatedFileGlobs.push(path.join(generatedColorSchemeDataDir, generatedColorSchemeDataFilename));

function preColorSchemeTableDataTask () {
  const colorSchemeTableData = {};
  colorSchemeTableData.colorSchemes = colorSchemeTables;

  return file(generatedColorSchemeDataFilename, JSON.stringify(colorSchemeTableData, null, 2), { src: true })
    .pipe(gulp.dest(generatedColorSchemeDataDir));
}



const preBuildTask = gulp.parallel(makePreSvgSymbolsTask(), makePreSvgSymbolsInfoTask(), preColorSchemeTableDataTask, preColorPaletteDataTask);
const placeholderTask = gulp.parallel(placeholderSvgSymbolsTask, placeholderSvgSymbolsInfoTask);

/******************************************************
 * STYLEGUIDE CSS TASKS
******************************************************/

function plSassTask() {
  return gulp.src(pkgPaths.pkgRootPath(plPaths.source.root, 'sass', 'pattern-scaffolding.scss'))
    .pipe(sass(eyeglass(sass.sync().on('error', sass.logError))))
    .pipe(gulp.dest(pkgPaths.pkgRootPath(plPaths.public.css)))
};
plSassTask.displayName = taskNamePrefix + 'sass';
plSassTask.description = 'Compiles pattern library CSS files from source SASS.';


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

function plBuildSgTask() {
  return patternlab.build({
    watch: argv.watch,
    cleanPublic: config.cleanPublic
  });
}
plBuildSgTask.displayName = taskNamePrefix + 'sg:build';
plBuildSgTask.description = 'Builds the styleguide';


const plBuildTask = gulp.series(
  gulp.parallel(plSassTask, preBuildTask),
  plBuildSgTask
);
plBuildTask.displayName = taskNamePrefix + 'build';
plBuildTask.description = 'Compiles the patterns and frontend, outputting to config.paths.public';


/******************************************************
 * Server reload functions
******************************************************/

// NOTE: If multiple packages' watch/serve tasks are being run
// in parallel via Lerna, there can be a situation where these
// reload tasks are triggered before the Pattern Lab server
// is up and running.
let serverReady = false;

function plServerReload() {
  if (serverReady) {
    return patternlab.server.reload();
  }
  else {
    console.warn('Server not ready. Skipping reload.');
    return Promise.resolve();
  }
}

function plServerRefreshCss() {
  if (serverReady) {
    return patternlab.server.refreshCSS();
  }
  else {
    console.warn('Server not ready. Skipping refreshCSS.');
    return Promise.resolve();
  }
}


/******************************************************
 * WATCH TASKS
******************************************************/

function plWatchSvgSymbols(done) {
  gulp.watch(
    uiLibPaths.distPath(uiLibPaths.distSvgSymbolsFilename),
    gulp.series(makePreSvgSymbolsInfoTask(true), plServerReload)
  );
  done()
}
plWatchSvgSymbols.displayName = taskNamePrefix + 'symbols-info:watch';
plWatchSvgSymbols.description = 'Watches for changes to Gravity SVG symbols';

function plWatchSvgSymbolsInfo(done) {
  gulp.watch(
    uiLibPaths.distPath(uiLibPaths.distSvgSymbolsInfoFilename),
    gulp.series(makePreSvgSymbolsTask(true), plServerReload)
  );
  done()
}
plWatchSvgSymbolsInfo.displayName = taskNamePrefix + 'symbols:watch';
plWatchSvgSymbolsInfo.description = 'Watches for changes to Gravity SVG symbols info file';


function plWatchSassTask(done) {
  gulp.watch(
    pkgPaths.pkgRootPath(plPaths.source.root, 'sass', '**', '*.scss'),
    gulp.series(plSassTask, plServerRefreshCss)
  );
  done()
}
plWatchSassTask.displayName = taskNamePrefix + 'css:watch';
plWatchSassTask.description = 'Watches for changes to styleguide SASS and compiles to CSS.';


function plWatchSgTask() {
  return patternlab.build({
    watch: true,
    cleanPublic: config.cleanPublic
  });
}
plWatchSgTask.displayName = taskNamePrefix + 'sg:watch';
plWatchSgTask.description = 'Watches for changes to styleguide source files.';


const plWatchTask = gulp.series(
  placeholderTask,
  gulp.parallel(plSassTask, makePreSvgSymbolsTask(true), makePreSvgSymbolsInfoTask(true)),
  gulp.parallel(plWatchSassTask, plWatchSgTask, plWatchSvgSymbols, plWatchSvgSymbolsInfo)
);
plWatchTask.displayName = taskNamePrefix + 'watch';
plWatchTask.description = 'Builds the styleguide and starts watching styleguide source files.';


/******************************************************
 * SERVE TASK
******************************************************/

function plServeSgTask() {
  return patternlab.server.serve({
    watch: true,
    cleanPublic: config.cleanPublic
  }).then(() => {
    serverReady = true;
  });
}
plServeSgTask.displayName = taskNamePrefix + 'sg:serve';
plServeSgTask.description = 'Builds styleguide HTML only and launches Pattern Lab\'s built-in server.';


const plServeTask = gulp.series(
  placeholderTask,
  gulp.parallel(plSassTask, makePreSvgSymbolsTask(true), makePreSvgSymbolsInfoTask(true)),
  gulp.parallel(plWatchSassTask, plServeSgTask, plWatchSvgSymbols, plWatchSvgSymbolsInfo)
);
plServeTask.displayName = taskNamePrefix + 'serve';
plServeTask.description = 'Builds styleguide and launches Pattern Lab\'s built-in server.';



module.exports = {
  // Pre-build tasks
  preBuildTask,

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
  plWatchTask,

  // Serve
  plServeTask,

  // Generated file paths
  generatedFileGlobs,

  // Export Pattern Lab server reload functions, so
  // other tasks can trigger reloads.
  plServerReload,
  plServerRefreshCss,
}

/** ****************************************************
 * GRAVITY UI LIB + LIVING STYLE GUIDE
 *
 * Contains tasks to:
 *
 * - Build the UI lib
 * - Build the living style guide
 * - Run tests
 *
***************************************************** */

const gulp = require('gulp');
const del = require('del');

const pkgPaths = require('./build/paths.js');
const patternLibraryTasks = require('./build/gulp/fractal-tasks.js');
const preBuildTasks = require('./build/gulp/pre-build.js');
const gravityTasks = require('./build/gulp/gravity.js');
const plStyleTasks = require('./build/gulp/pl-styles.js');
const plAssetTasks = require('./build/gulp/pl-assets.js');
const tests = require('./build/gulp/tests');

// Define composite tasks:

const build = gulp.series(
  gulp.parallel(
    preBuildTasks.makeCopySvgSymbolsTask(),
    preBuildTasks.makeCopySvgSymbolsInfoTask(),
    preBuildTasks.createColorSchemeData,
    preBuildTasks.createColorPaletteData,
    gravityTasks.makeCopyTask(),
    plStyleTasks.buildSass,
    plAssetTasks.generateAssets,
    plAssetTasks.copyAssets,
  ),
  patternLibraryTasks.buildPatternLibrary,
);
build.description = 'Builds the complete pattern library.';

const serve = gulp.series(
  preBuildTasks.placeholderTask,
  gulp.parallel(
    preBuildTasks.makeCopySvgSymbolsTask(true),
    preBuildTasks.makeCopySvgSymbolsInfoTask(true),
    preBuildTasks.createColorSchemeData,
    preBuildTasks.createColorPaletteData,
    gravityTasks.makeCopyTask(true),
    plStyleTasks.buildSass,
    plAssetTasks.generateAssets,
    plAssetTasks.copyAssets,
  ),
  gulp.parallel(
    preBuildTasks.watchSvgSymbols,
    preBuildTasks.watchSvgSymbolsInfo,
    gravityTasks.watch,
    plStyleTasks.watchSass,
    plAssetTasks.watchAssets,
    patternLibraryTasks.startServer,
  ),
);
serve.description = 'Launches the pattern library\'s local dev server, and watches all relevant source files for changes.';

function clean() {
  return del([
    pkgPaths.pkgRootPath('dist', '**', '*'),
    ...preBuildTasks.generatedFileGlobs,
  ]);
}
clean.description = 'Deletes all intermediated and final build output files.';

const test = gulp.series(
  tests.runA11yTests,
);

module.exports = {
  default: build,
  serve,
  clean,
  test,
};

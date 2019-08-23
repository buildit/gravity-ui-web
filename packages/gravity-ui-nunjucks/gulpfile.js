/** ****************************************************
 * GRAVITY UI LIB + LIVING STYLE GUIDE
 *
 * Contains tasks to:
 *
 * - Build the UI lib
 * - Build the living style guide
 *
***************************************************** */

const gulp = require('gulp');
const del = require('del');

const pkgPaths = require('./gulp/paths.js');
const patternLibraryTasks = require('./gulp/fractal-tasks.js');
const preBuildTasks = require('./gulp/pre-build.js');
const gravityTasks = require('./gulp/gravity.js');
const plStyleTasks = require('./gulp/pl-styles.js');
const plAssetTasks = require('./gulp/pl-assets.js');

// Define composite tasks:

const build = gulp.series(
  gulp.parallel(
    preBuildTasks.makeCopySvgSymbolsTask(),
    preBuildTasks.makeCopySvgSymbolsInfoTask(),
    preBuildTasks.createColorSchemeData,
    preBuildTasks.createColorPaletteData,
    gravityTasks.makeCopyTask(),
    plStyleTasks.buildSass,
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

module.exports = {
  default: build,
  serve,
  clean,
};

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
const patternLibraryTasks = require('./gulp/patternlab.js');
const preBuildTasks = require('./gulp/pre-build.js');
const gravityTasks = require('./gulp/gravity.js');

// Define composite tasks:

const build = gulp.series(
  gulp.parallel(
    preBuildTasks.makeCopySvgSymbolsTask(),
    preBuildTasks.makeCopySvgSymbolsInfoTask(),
    preBuildTasks.createColorSchemeData,
    preBuildTasks.createColorPaletteData,
    gravityTasks.makeCopyTask(),
    patternLibraryTasks.buildSass,
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
    patternLibraryTasks.buildSass,
  ),
  gulp.parallel(
    preBuildTasks.watchSvgSymbols,
    preBuildTasks.watchSvgSymbolsInfo,
    gravityTasks.watch,
    patternLibraryTasks.watchSass,
    patternLibraryTasks.startServer,
  ),
);
serve.description = 'Launches the pattern library\'s local dev server, and watches all relevant source files for changes.';

function clean() {
  return del([
    pkgPaths.pkgRootPath('dist', '**', '*'),
    ...patternLibraryTasks.generatedFileGlobs,
    ...preBuildTasks.generatedFileGlobs,
  ]);
}
clean.description = 'Deletes all intermediated and final build output files.';

module.exports = {
  default: build,
  serve,
  clean,
};

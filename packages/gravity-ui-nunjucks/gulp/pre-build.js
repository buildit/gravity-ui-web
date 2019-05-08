/**
 * Tasks that need to run before the pattern library
 * is (re-)built.
 */

const gulp = require('gulp');
const rename = require("gulp-rename");
const file = require('gulp-file');
const { colors } = require('@buildit/gravity-particles');
const uiLibPaths = require('@buildit/gravity-ui-web/build-api.js');
const pkgPaths = require('./paths.js');
const colorSchemeTables = require('./color-scheme-tables.js');
const { serverReload } = require('./patternlab.js');

const taskNamePrefix = 'pre-build:';


/******************************************************
 * PRE-BUILD TASKS
 * Copies / creates any generated data or patterns that
 * are then processed by Pattern Lab in the usual way
******************************************************/

// Exported array of glob patterns that clean tasks can use to
// delete any files generated at build-time
const generatedFileGlobs = [];


// ==== Tasks for: Gravity SVG symbols file ====

const generatedPatternsDirname = '_generated';
generatedFileGlobs.push(pkgPaths.srcPatternsPath(generatedPatternsDirname, '*'));
generatedFileGlobs.push(`!${pkgPaths.srcPatternsPath(generatedPatternsDirname, 'README.md')}`); // Prevent README.md from being deleted


function makeCopySvgSymbolsTask (allowEmpty = false) {
  const copySvgSymbols = function () {
    return gulp.src(uiLibPaths.distPath(uiLibPaths.distSvgSymbolsFilename), { allowEmpty })
      .pipe(rename('symbols.njk'))
      .pipe(gulp.dest(pkgPaths.srcPatternsPath(generatedPatternsDirname)));
  }
  copySvgSymbols.displayName = `${taskNamePrefix}symbols`;
  copySvgSymbols.description = 'Copies Gravity\'s symbols.svg file to the patterns folder.';

  return copySvgSymbols;
};


function createSvgSymbolsPlaceholder() {
  return file('symbols.njk', ' ', { src: true })
    .pipe(gulp.dest(pkgPaths.srcPatternsPath(generatedPatternsDirname)));
}
createSvgSymbolsPlaceholder.displayName = taskNamePrefix + 'symbols:placeholder';
createSvgSymbolsPlaceholder.description = 'Creates an empty symbols.svg file in the patterns folder.';


function watchSvgSymbols(done) {
  gulp.watch(
    uiLibPaths.distPath(uiLibPaths.distSvgSymbolsFilename),
    gulp.series(makeCopySvgSymbolsInfoTask(true), serverReload)
  );
  done()
}
watchSvgSymbols.displayName = taskNamePrefix + 'symbols:watch';
watchSvgSymbols.description = 'Watches for changes to Gravity SVG symbols';


// ==== Tasks for: Gravity SVG symbols info ====

const generatedSymbolInfoFilename = '00-svg-symbols.json';
function generatedSymbolInfoPath(...segments) {
  return pkgPaths.srcPatternsPath('00-particles', '05-logos-and-icons', ...segments);
}
generatedFileGlobs.push(generatedSymbolInfoPath(generatedSymbolInfoFilename));


function makeCopySvgSymbolsInfoTask (allowEmpty = false) {
  const copySvgSymbolsInfo = function () {
    return gulp.src(uiLibPaths.distPath(uiLibPaths.distSvgSymbolsInfoFilename), { allowEmpty })
      .pipe(rename(generatedSymbolInfoFilename))
      .pipe(gulp.dest(generatedSymbolInfoPath()));
  }
  copySvgSymbolsInfo.displayName = `${taskNamePrefix}symbols-info`;
  copySvgSymbolsInfo.description = 'Copies Gravity\'s symbols.json file to the patterns folder.';

  return copySvgSymbolsInfo;
};


function createSvgSymbolsInfoPlaceholder() {
  return file(generatedSymbolInfoFilename, '{}', { src: true })
    .pipe(gulp.dest(generatedSymbolInfoPath()));
}
createSvgSymbolsInfoPlaceholder.displayName = taskNamePrefix + 'symbols-info:placeholder';
createSvgSymbolsInfoPlaceholder.description = 'Creates an empty symbols.json file in the patterns folder.';


function watchSvgSymbolsInfo(done) {
  gulp.watch(
    uiLibPaths.distPath(uiLibPaths.distSvgSymbolsInfoFilename),
    gulp.series(makeCopySvgSymbolsTask(true), serverReload)
  );
  done()
}
watchSvgSymbolsInfo.displayName = taskNamePrefix + 'symbols-info:watch';
watchSvgSymbolsInfo.description = 'Watches for changes to Gravity SVG symbols info file';


// ==== Tasks for: Gravity color palette data ====

const generatedColorPalettesDataFilename = '01-color-palettes.json';
function generatedColorPalettesDataPath(...segments) {
  return pkgPaths.srcPatternsPath('00-particles', '00-color', ...segments);
}

generatedFileGlobs.push(generatedColorPalettesDataPath(generatedColorPalettesDataFilename));

function createColorPaletteData () {
  const colorPalettesData = {};
  colorPalettesData.colors = colors;

  return file(generatedColorPalettesDataFilename, JSON.stringify(colorPalettesData, null, 2), { src: true })
    .pipe(gulp.dest(generatedColorPalettesDataPath()
    ));
}
createColorPaletteData.displayName = `${taskNamePrefix}color-palette-data`;
createColorPaletteData.description = 'Creates a color palette JSON file in the patterns folder.';


// ==== Tasks for: Gravity color schemes data ====

const generatedColorSchemeDataFilename = '02-color-schemes.json';
function generatedColorSchemeDataPath(...segments) {
  return pkgPaths.srcPatternsPath('00-particles', '00-color', ...segments);
}

generatedFileGlobs.push(generatedColorSchemeDataPath(generatedColorSchemeDataFilename));

function createColorSchemeData () {
  const colorSchemeTableData = {};
  colorSchemeTableData.colorSchemes = colorSchemeTables;

  return file(generatedColorSchemeDataFilename, JSON.stringify(colorSchemeTableData, null, 2), { src: true })
    .pipe(gulp.dest(generatedColorSchemeDataPath()));
}
createColorSchemeData.displayName = `${taskNamePrefix}color-schemes-data`;
createColorSchemeData.description = 'Creates a color schemes JSON file in the patterns folder.';


// ==== Exports ====

module.exports = {
  makeCopySvgSymbolsTask,
  createSvgSymbolsPlaceholder,
  watchSvgSymbols,

  makeCopySvgSymbolsInfoTask,
  createSvgSymbolsInfoPlaceholder,
  watchSvgSymbolsInfo,

  createColorPaletteData,
  createColorSchemeData,

  placeholderTask: gulp.parallel(
    createSvgSymbolsPlaceholder,
    createSvgSymbolsInfoPlaceholder
  ),

  generatedFileGlobs,
};

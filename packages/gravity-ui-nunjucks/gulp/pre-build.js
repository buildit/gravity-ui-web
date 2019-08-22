/**
 * Tasks that need to run before the pattern library
 * is (re-)built.
 */

const gulp = require('gulp');
const rename = require('gulp-rename');
const file = require('gulp-file');
const jsonEditor = require('gulp-json-editor');
const { colors } = require('@buildit/gravity-particles');
const uiLibPaths = require('@buildit/gravity-ui-web/build-api.js');
const pkgPaths = require('./paths.js');
const colorSchemeTables = require('./color-scheme-tables.js');

const taskNamePrefix = 'pre-build:';

/** ****************************************************
 * PRE-BUILD TASKS
 * Copies / creates any generated data or patterns that
 * are then processed by Pattern Lab in the usual way
***************************************************** */

// Exported array of glob patterns that clean tasks can use to
// delete any files generated at build-time
const generatedFileGlobs = [];

// ==== Tasks for: Gravity SVG symbols file ====
const generatedPatternsDirname = '_generated';
generatedFileGlobs.push(pkgPaths.srcComponentsPath(generatedPatternsDirname, '*'));
generatedFileGlobs.push(`!${pkgPaths.srcComponentsPath(generatedPatternsDirname, 'README.md')}`); // Prevent README.md from being deleted

function makeCopySvgSymbolsTask(allowEmpty = false) {
  // eslint-disable-next-line max-len
  const copySvgSymbols = () => gulp.src(uiLibPaths.distPath(uiLibPaths.distSvgSymbolsFilename), { allowEmpty })
    .pipe(rename('symbols.njk'))
    .pipe(gulp.dest(pkgPaths.srcComponentsPath(generatedPatternsDirname)));

  copySvgSymbols.displayName = `${taskNamePrefix}symbols`;
  copySvgSymbols.description = 'Copies Gravity\'s symbols.svg file to the patterns folder.';

  return copySvgSymbols;
}

function createSvgSymbolsPlaceholder() {
  return file('symbols.njk', ' ', { src: true })
    .pipe(gulp.dest(pkgPaths.srcComponentsPath(generatedPatternsDirname)));
}
createSvgSymbolsPlaceholder.displayName = `${taskNamePrefix}symbols:placeholder`;
createSvgSymbolsPlaceholder.description = 'Creates an empty symbols.svg file in the patterns folder.';

function watchSvgSymbols(done) {
  gulp.watch(
    uiLibPaths.distPath(uiLibPaths.distSvgSymbolsFilename),
    makeCopySvgSymbolsTask(true),
  );
  done();
}
watchSvgSymbols.displayName = `${taskNamePrefix}symbols:watch`;
watchSvgSymbols.description = 'Watches for changes to Gravity SVG symbols';

// ==== Tasks for: Gravity SVG symbols info ====
const generatedSymbolInfoFilename = 'svg-symbols.config.json';
function generatedSymbolInfoPath(...segments) {
  return pkgPaths.srcComponentsPath('00-particles', '05-logos-and-icons', '00-svg-symbols', ...segments);
}
generatedFileGlobs.push(generatedSymbolInfoPath(generatedSymbolInfoFilename));

function makeCopySvgSymbolsInfoTask(allowEmpty = false) {
  // eslint-disable-next-line max-len
  const copySvgSymbolsInfo = () => gulp.src(uiLibPaths.distPath(uiLibPaths.distSvgSymbolsInfoFilename), { allowEmpty })
    .pipe(rename(generatedSymbolInfoFilename))
    .pipe(jsonEditor((json) => {
      const fractalJson = {};
      fractalJson.context = json;
      return fractalJson;
    }))
    .pipe(gulp.dest(generatedSymbolInfoPath()));

  copySvgSymbolsInfo.displayName = `${taskNamePrefix}symbols-info`;
  copySvgSymbolsInfo.description = 'Copies Gravity\'s symbols.json file to the patterns folder.';

  return copySvgSymbolsInfo;
}

function createSvgSymbolsInfoPlaceholder() {
  return file(generatedSymbolInfoFilename, '{}', { src: true })
    .pipe(gulp.dest(generatedSymbolInfoPath()));
}
createSvgSymbolsInfoPlaceholder.displayName = `${taskNamePrefix}symbols-info:placeholder`;
createSvgSymbolsInfoPlaceholder.description = 'Creates an empty symbols.json file in the patterns folder.';

function watchSvgSymbolsInfo(done) {
  gulp.watch(
    uiLibPaths.distPath(uiLibPaths.distSvgSymbolsInfoFilename),
    makeCopySvgSymbolsTask(true),
  );
  done();
}
watchSvgSymbolsInfo.displayName = `${taskNamePrefix}symbols-info:watch`;
watchSvgSymbolsInfo.description = 'Watches for changes to Gravity SVG symbols info file';

// ==== Tasks for: Gravity color palette data ====

const generatedColorPalettesDataFilename = 'color-palettes.config.json';
function generatedColorPalettesDataPath(...segments) {
  return pkgPaths.srcComponentsPath('00-particles', '00-color', '01-color-palettes', ...segments);
}

generatedFileGlobs.push(generatedColorPalettesDataPath(generatedColorPalettesDataFilename));

function createColorPaletteData() {
  const colorPalettesData = {};
  colorPalettesData.context = {};
  colorPalettesData.context.colors = colors;

  return file(
    generatedColorPalettesDataFilename,
    JSON.stringify(colorPalettesData, null, 2),
    { src: true },
  )
    .pipe(gulp.dest(generatedColorPalettesDataPath()));
}
createColorPaletteData.displayName = `${taskNamePrefix}color-palette-data`;
createColorPaletteData.description = 'Creates a color palette JSON file in the patterns folder.';

// ==== Tasks for: Gravity color schemes data ====

const generatedColorSchemeDataFilename = 'color-schemes.config.json';
function generatedColorSchemeDataPath(...segments) {
  return pkgPaths.srcComponentsPath('00-particles', '00-color', '02-color-schemes', ...segments);
}

generatedFileGlobs.push(generatedColorSchemeDataPath(generatedColorSchemeDataFilename));

function createColorSchemeData() {
  const colorSchemeTableData = {};
  colorSchemeTableData.context = {};
  colorSchemeTableData.context.colorSchemes = colorSchemeTables;

  return file(
    generatedColorSchemeDataFilename,
    JSON.stringify(colorSchemeTableData, null, 2),
    { src: true },
  )
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
    createSvgSymbolsInfoPlaceholder,
  ),

  generatedFileGlobs,
};

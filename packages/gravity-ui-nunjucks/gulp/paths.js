/**
 * Export full set of file paths used by the build.
 *
 * Exports everything from build-api.js, which only exposes paths and files
 * that are included in the published NPM package, and adds additional
 * paths and files that are only in the source repo but required for
 * builds.
 */
const path = require('path');
const bldConsts = require('../build-consts.js');

const gulpDir = __dirname;

// Resolves the given path segments relative to the package root dir
function pkgRootPath(...pathSegements) {
  return path.resolve(gulpDir, '..', ...pathSegements);
}

// Resolves the given path segments relative to the source dir
function srcPath(...pathSegements) {
  return pkgRootPath('src', ...pathSegements);
}

// ==== Pattern library ====

// Resolves the given path segments relative to the temporary assets dir
function distAssetsPath(...pathSegements) {
  return pkgRootPath(bldConsts.distDirname, 'pattern-library-assets', ...pathSegements);
}

module.exports = {
  /**
   * Takes a sequence of path segments relative to the package's
   * root directory and returns the absolute path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the package's root directory.
   *
   * @return {string} Absolute file path to the specified package
   *        directory or file.
   */
  pkgRootPath,

  /**
   * Takes a sequence of path segments relative to the pattern
   * library's source components directory and returns the absolute path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the pattern library's source components directory.
   *
   * @return {string} Absolute file path to the specified source
   *        directory or file.
   */
  srcComponentsPath: (...pathSegments) => srcPath('components', ...pathSegments),

  /**
   * Takes a sequence of path segments relative to the pattern
   * library's source docs directory and returns the absolute path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the pattern library's source docs directory.
   *
   * @return {string} Absolute file path to the specified source
   *        directory or file.
   */
  srcDocsPath: (...pathSegments) => srcPath('docs', ...pathSegments),

  /**
   * Takes a sequence of path segments relative to the pattern
   * library's theme overrides directory and returns the absolute path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the pattern library's source docs directory.
   *
   * @return {string} Absolute file path to the specified source
   *        directory or file.
   */
  srcThemeOverridesPath: (...pathSegments) => srcPath('theme-overrides', ...pathSegments),

  /**
   * Takes a sequence of path segments relative to the pattern
   * library's source SASS directory and returns the absolute path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the pattern library's source SASS directory.
   *
   * @return {string} Absolute file path to the specified source
   *        directory or file.
   */
  srcPlSassPath: (...pathSegments) => srcPath('sass', ...pathSegments),

  /**
   * Takes a sequence of path segments relative to the pattern
   * library's source assets directory and returns the absolute path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the pattern library's source assets directory.
   *
   * @return {string} Absolute file path to the specified source
   *        directory or file.
   */
  srcAssetsPath: (...pathSegments) => srcPath('assets', ...pathSegments),

  /**
   * Takes a sequence of path segments relative to Fractal's temporary
   * static assets directory and returns the absolute path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the temporary assets directory.
   *
   * @return {string} Absolute file path to the specified distributable
   *        directory or file.
   */
  distAssetsPath,

  /**
   * Takes a sequence of path segments relative to the temporary Gravity
   * distributables directory and returns the absolute path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the temporary Gravity distributables directory.
   *
   * @return {string} Absolute file path to the specified temporary
   *        directory or file.
   */
  distGravityPath: (...pathSegements) => distAssetsPath('gravity', ...pathSegements),

  /**
   * Takes a sequence of path segments relative to the temporary pattern
   * library styles distributables directory and returns the absolute path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the temporary pattern library styles directory.
   *
   * @return {string} Absolute file path to the specified temporary
   *        directory or file.
   */
  distPlStylesPath: (...pathSegements) => distAssetsPath('pl-styles', ...pathSegements),
};

/**
 * Shared constants used by public build-api and private build scripts.
 *
 * Although this is shipped as part of the NPM package, it is considered an
 * internal ("private") API and is therefore not monitored for breaking changes.
 *
 * External consumers MUST NOT include this module.
 *
 * @private
 */

module.exports = {
  /**
   * Name of root source directory.
   */
  srcDirname: 'src',

  /**
   * Name of root distributables directory.
   */
  distDirname: 'dist',

  /**
   * Name of sub-directories containing UI library assets.
   */
  uiLibDirname: 'ui-lib',

  /**
   * Name of sub-directories containing pattern library assets.
   */
  patternLibDirname: 'styleguide',


  /**
   * Base filename used by various SVG symbols files.
   */
  svgSymbolsBasename: 'symbols',
};

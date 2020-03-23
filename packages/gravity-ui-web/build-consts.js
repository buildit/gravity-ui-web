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
   * Base filename used by various SVG symbols files.
   */
  svgSymbolsBasename: 'symbols',

  /**
   * Name of source dir for SASS source code.
   */
  srcSassDirname: 'sass',

  /**
   * Name of source dir for copies of external SASS libraries.
   */
  srcLibCopyDirname: '_external',

  /**
   * Name of source dir for copy of modularscale lib.
   */
  modularscaleDirname: 'modularscale-sass',

  /**
   * Name of source dir for copy of Gravity Particles lib.
   */
  gravityParticlesDirname: 'gravity-particles',

  /**
   * External library version filename.
   */
  versionFilename: 'version.json',
};

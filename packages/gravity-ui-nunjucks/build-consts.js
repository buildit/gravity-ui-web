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
   * Name of root distributables directory.
   */
  distDirname: 'dist',
};

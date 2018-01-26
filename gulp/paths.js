/**
 * Export full set of file paths used by the build.
 *
 * Exports everything from index.js, which exposes paths and files
 * that are included in the published NPM package, and adds additional
 * paths and files that are included in the source and required for
 * builds.
 */
const path = require('path');
const pkgPaths = require('../index.js');

const srcImgDir = path.join(pkgPaths.srcUiLibDir, 'images');
const srcSymbolsDir = path.join(pkgPaths.srcUiLibDir, 'svg-symbols');

module.exports = {
  srcImgDir,
  srcSymbolsDir,

  ...pkgPaths
}

/**
 * Export full set of file paths used by the build.
 *
 * Exports everything from index.js, which only exposes paths and files
 * that are included in the published NPM package, and adds additional
 * paths and files that are only in the source repo but required for
 * builds.
 */
const path = require('path');
const pkgPaths = require('../index.js');

const srcImgDir = path.join(pkgPaths.srcUiLibDir, 'images');
const srcSymbolsDir = path.join(pkgPaths.srcUiLibDir, 'svg-symbols');
const srcJsDir = path.join(pkgPaths.srcUiLibDir, 'js');

module.exports = {
  srcImgDir,
  srcSymbolsDir,
  srcJsDir,

  ...pkgPaths
}

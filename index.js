/**
 * Provides programatic access to CSS, asset and SASS file paths
 * that are published by the gravity-ui-sass NPM package.
 *
 * This is so that consumers of this package can access those files
 * in their own build processes (e.g. to copy them to their build dir)
 * without needing to know the internal directory structure of this
 * package or having to hard-code file paths in their own build
 * scripts.
 *
 * Note, since this file is included in the published NPM package, it
 * must not export paths or filenames that are excluded from the published
 * package. Refer to the 'files' section in package.json to see exactly
 * what gets published and what does not.
 *
 * Any path or file data that is required for development and builds but
 * is excluded from the published NPM package should be added to
 * gulp/paths.js instead of this file.
 */

const path = require('path');

const rootDir = __dirname;

const bldRootDir = path.join(rootDir, 'dist');
const srcRootDir = path.join(rootDir, 'src');

const uiLibDirName = 'ui-lib';
const srcUiLibDir = path.join(srcRootDir, uiLibDirName);
const bldUiLibDir = path.join(bldRootDir, uiLibDirName);

const srcSassDir = path.join(srcUiLibDir, 'sass');
const mainSassFilename = 'gravity.scss';
const srcSassFilePath = path.join(srcSassDir, mainSassFilename);

const cssFilename = 'gravity.css';
const bldCssFilePath = path.join(bldUiLibDir, cssFilename);

const svgSymbolsFilename = 'symbols.svg';
const bldSvgSymbolsFilePath = path.join(bldUiLibDir, svgSymbolsFilename);


module.exports = {
  /**
   * Normalize all paths to be plain, paths with no leading './',
   * relative to the process root, and with backslashes converted to
   * forward slashes. Should work regardless of how the path was
   * written. Accepts any number of parameters, and passes them along to
   * path.resolve().
   *
   * This is intended to avoid all known limitations of gulp.watch().
   *
   * @param {...string} pathFragment - A directory, filename, or glob.
  */
  normalizePath: function() {
    return path
      .relative(
        process.cwd(),
        path.resolve.apply(this, arguments)
      )
      .replace(/\\/g, "/");
  },

  // Expose SASS-related stuff
  srcUiLibDir,
  srcSassDir,
  mainSassFilename,
  srcSassFilePath,

  // SVG symbols (used for icons & logo)
  svgSymbolsFilename,
  bldSvgSymbolsFilePath,

  // Expose root build output dir
  bldRootDir,
  bldUiLibDir,

  // Expose compiled CSS stuff
  cssFilename,
  bldCssFilePath,
};

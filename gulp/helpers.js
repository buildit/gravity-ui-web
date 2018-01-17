/**
 * Helper functions used by the various Gulp tasks.
 *
 */
const path = require('path');

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
  }
};

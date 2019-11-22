/**
 * Checks for the presence of a Gravity source SASS file in an array
 * of filepaths.
 *
 * @param {string[]} files                  Array of filepaths.
 * @param {string} gravitySassAbsFilePath   Absolute path to one of Gravity's
 *                                          source SASS files.
 */
function isGravitySassFileIncluded(files, gravitySassAbsFilePath) {
  // Get the final part of the path to a SASS file within gravity-ui-web
  const gravitySassRelFilePath = gravitySassAbsFilePath.replace(
    /^.*gravity-ui-web/,
    'gravity-ui-web',
  );

  return files.find((path) => path.endsWith(gravitySassRelFilePath)) !== undefined;
}

/**
 * Checks for the presence of one of Gravity's internal partials in an
 * array of filepaths.
 *
 * @param {string[]} files        Array of filepaths.
 * @param {string} gravityBldApi  The Gravity UI Web library's build API object.
 */
function isGravitySassPartialIncluded(files, gravityBldApi) {
  return isGravitySassFileIncluded(files, gravityBldApi.srcSassPath('00-settings/_color-schemes.scss'));
}


/**
 * A few shared functions for the test projects in this directory.
 */
module.exports = {
  /**
   * Logs the test name and version info to the console.
   *
   * Also performs a sanity check to ensure the `@buildit/gravity-ui-web` library
   * has been built. If not, a warning is printed and the test is exited with a
   * status of 1 (so that a CI build will fail in this situation).
   *
   * @param {object} gravityBldApi The Gravity UI Web library's build API object.
   */
  doIntro(description, gravityBldApi) {
    console.log(`TEST: ${description}`);
    console.log(`  📦 @buildit/gravity-ui-web:               v${gravityBldApi.version}`);

    if (gravityBldApi.gravityParticlesCopyVersion() === null || gravityBldApi.modularscaleCopyVersion() === null) {
      console.warn('  ⚠️ Gravity library has not yet been built, so unable to run this test. Skipping.');
      console.warn('  👉 Run "npm run build" in the root of this monorepo first and then try again.');
      process.exit(1);
    }
    console.log(`    📦 Embedded @buildit/gravity-particles: v${gravityBldApi.gravityParticlesCopyVersion()}`);
    console.log(`    📦 Embedded modularscale-sass:          v${gravityBldApi.modularscaleCopyVersion()}`);
  },

  /**
   * Returns a callback function to pass to `node-sass`'s `render()` method, which logs
   * an error or success message and exits the process with an appropriate status.
   *
   * On success, the process with exit with a status of 0, on failure with 1.
   * In a CI context this should fail or pass the build.
   *
   * @param {object|null} err   `null` on success, an object containing error details
   *                            otherwise.
   * @param {string} filename   The name of the SASS file being compiled.
   * @param {function} done     Callback to signal async completion.
   */
  getSassTestCompletionCallback(gravityBldApi, filename, done = undefined){
    return (err, result) => {
      if (err) {
        console.error(`  ❌ SASS compilation of ${filename} failed: `, err);
        process.exit(1);
      }

      if (!isGravitySassPartialIncluded(result.stats.includedFiles, gravityBldApi)) {
        console.error(`  ❌ SASS compilation of ${filename} did not actually include expected Gravity\'s SASS partial.`);
        // This can happen if the dist/gravity.css file is mistakenly imported instead.
        process.exit(1);
      }

      console.log(`  ✅ SASS compilation of ${filename} succeeded.`);

      if (done) {
        done();
      }
    };
  },

  /**
   * Returns a callback function to pass to `webpack()`, which logs
   * an error or success message and exits the process with an appropriate status.
   *
   * On success, the process with exit with a status of 0, on failure with 1.
   * In a CI context this should fail or pass the build.
   *
   * @param {object|null} err   `null` on success, an object containing error details
   *                            otherwise.
   * @param {string} filename   The name of the SASS file being compiled.
   * @param {function} done     Callback to signal async completion.
   */
  getWebpackSassTestCompletionCallback(gravityBldApi, filename, done = undefined){
    return (err, stats) => {
      if (err) {
        console.warn('  ⚠️ Fatal Webpack error. Did not get as far as attempting to compile SASS.');
        process.exit(1);
      }

      // Log webpack stats summary
      console.log(stats.toString());

      if (stats.hasErrors()) {
        console.error(`  ❌ Webpack SASS compilation of ${filename} errored.`);
        process.exit(1);
      }

      if (!isGravitySassPartialIncluded(Array.from(stats.compilation.fileDependencies), gravityBldApi)) {
        console.error(`  ❌ SASS compilation of ${filename} did not actually include expected Gravity\'s SASS partial.`);
        // This can happen if the dist/gravity.css file is mistakenly imported instead.
        process.exit(1);
      }

      console.log(`  ✅ Webpack SASS compilation of ${filename} succeeded.`);

      if (done) {
        done();
      }
    };
  },

};

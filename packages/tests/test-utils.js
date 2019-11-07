function isGravitySassFileIncluded(files, gravitySassAbsFilePath) {
  // Get the final part of the path to a SASS file within gravity-ui-web
  const gravitySassRelFilePath = gravitySassAbsFilePath.replace(
    /^.*gravity-ui-web/,
    'gravity-ui-web',
  );

  return files.find((path) => path.endsWith(gravitySassRelFilePath)) !== undefined;
}

function isGravityMainSassFileInclude(files, gravityBldApi) {
  return isGravitySassFileIncluded(files, gravityBldApi.srcSassPath(gravityBldApi.srcSassMainFilename));
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
   * @param {*} result     Ignored.
   */
  getSassTestCompletionCallback(gravityBldApi){
    return (err, result) => {
      if (err) {
        console.error('  ❌ SASS compilation failed: ', err);
        process.exit(1);
      }

      if (!isGravityMainSassFileInclude(result.stats.includedFiles, gravityBldApi)) {
        console.error('  ❌ SASS compilation did not actually include Gravity\'s main SASS file.');
        // This can happen if the dist/gravity.css file is mistakenly imported instead.
        process.exit(1);
      }

      console.log('  ✅ SASS compilation succeeded.');
      process.exit(0);
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
   * @param {*} stats     Ignored.
   */
  getWebpackSassTestCompletionCallback(gravityBldApi){
    return (err, stats) => {
      if (err) {
        console.warn('  ⚠️ Fatal Webpack error. Did not get as far as attempting to compile SASS.');
        process.exit(1);
      }

      // Log webpack stats summary
      console.log(stats.toString());

      if (stats.hasErrors()) {
        console.error('  ❌ Webpack SASS compilation errored.');
        process.exit(1);
      }

      if (!isGravityMainSassFileInclude(Array.from(stats.compilation.fileDependencies), gravityBldApi)) {
        console.error('  ❌ SASS compilation did not actually include Gravity\'s main SASS file.');
        // This can happen if the dist/gravity.css file is mistakenly imported instead.
        process.exit(1);
      }

      console.log('  ✅ Webpack SASS compilation succeeded.');
      process.exit(0);
    };
  },

};

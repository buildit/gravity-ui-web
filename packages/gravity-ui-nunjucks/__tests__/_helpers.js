const fractal = require('../fractal');

/**
   * Takes an absolute path and returns an array
   * of file names in a recursive way.
   *
   * @param  {string} startPath absolute path.
   *
   * @param {array} excludedFiles array with the name of the files
   * to be excluded from the search
   *
   * @param {string} extension file extension type
   *
   * @return {array} List of files that match the extension given.
   */
const getComponentsNames = (excludedFiles) => (
  fractal.components
    .flattenDeep()
    .toArray()
    .reduce((accumulator, currentValue) => {
      if (currentValue.alias !== null) {
        accumulator.push(currentValue.alias);
      }
      return accumulator;
    }, [])
    .filter((name) => !excludedFiles.includes(name))
);

/**
   * Takes a set of objects and returns an array of formatted error messages.
   *
   * @param  {array} violations Set of violation objects.
   *
   * @return {array} Array of formatted messages.
   */
const getViolations = (violations) => violations
  .map((violation) => (
    { message: `${violation.description}\n ${violation.help}\n Help: ${violation.helpUrl}\n`, nodes: violation.nodes }));

module.exports = {
  getViolations,
  getComponentsNames,
};

const fs = require('fs');
const path = require('path');

/**
   * Takes an absolute path and an extesion file type to returns an array
   * of file names in a recursive way.
   *
   * @param  {string} startPath Absolute path.
   *
   * @param {string} extension Extension file type
   *
   * @param {array} result Array that will contain the final result
   *
   * @return {array} List of files that match the extension given.
   */
const getFilesFromDirectory = (startPath, extension, result) => {
  const files = fs.readdirSync(startPath);
  // eslint-disable-next-line no-param-reassign
  result = result || [];
  for (let i = 0; i < files.length; i += 1) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      getFilesFromDirectory(filename, extension, result);
    } else if (filename.indexOf(extension) >= 0) {
      result.push(path.basename(filename, extension));
    }
  }
  return result;
};

/**
   * Takes an absolute path and returns an array
   * of file names in a recursive way.
   *
   * @param  {string} startPath Absolute path.
   *
   * @param {array} result array that will contain the final result
   *
   * @return {array} List of files that match the extension given.
   */
const getComponentsNames = (startPath) => getFilesFromDirectory(startPath, '.njk');

/**
   * Takes a set of objects and returns an array of formatted error messages.
   *
   * @param  {array} violations Set of violation objects.
   *
   * @return {array} Array of formatted messages.
   */
const getViolations = (violations) => {
  const messages = violations.map(
    (violation) => `${violation.description}\n ${violation.help}\n Help: ${violation.helpUrl}\n`,
  );
  return messages;
};

module.exports = {
  getViolations,
  getComponentsNames,
  getFilesFromDirectory,
};

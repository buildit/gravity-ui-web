const { srcSassPath } = require('./build-api.js');

module.exports = function(eyeglass, sass) {
  return {
    sassDir: srcSassPath(),
  };
};

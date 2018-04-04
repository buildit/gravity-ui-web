const { srcSassDir } = require('./index');

module.exports = function(eyeglass, sass) {
  return {
    sassDir: srcSassDir,
  };
};

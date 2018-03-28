const path = require('path');
const { srcSassDir } = require('./index');

module.exports = function(eyeglass, sass) {
  return {
    sassDir: path.join(__dirname, srcSassDir),
  };
};

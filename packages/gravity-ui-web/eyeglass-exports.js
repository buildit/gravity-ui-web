const { srcSassPath } = require('./build-api.js');

module.exports = () => ({
  sassDir: srcSassPath(),
});

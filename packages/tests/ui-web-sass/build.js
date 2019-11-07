const sass = require('node-sass');
const gravityBldApi = require('@buildit/gravity-ui-web/build-api');

const testUtils = require('../test-utils');

testUtils.doIntro('Compile @buildit/gravity-ui-web SASS using Node SASS directly', gravityBldApi);

sass.render(
  {
    file: './test.scss',
    includePaths: [`${gravityBldApi.srcSassPath()}`]
  },
  testUtils.getSassTestCompletionCallback(gravityBldApi),
);


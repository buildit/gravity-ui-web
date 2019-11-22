const sass = require('node-sass');
const nodeSassImporter = require('node-sass-import');
const gravityBldApi = require('@buildit/gravity-ui-web/build-api');

const testUtils = require('../test-utils');

testUtils.doIntro('Compile @buildit/gravity-ui-web SASS using node-sass-import', gravityBldApi);

// Test main
sass.render(
  {
    file: './test.scss',
    importer: nodeSassImporter
  },
  testUtils.getSassTestCompletionCallback(gravityBldApi, 'test.scss', () => {

    // Test partial imports
    sass.render(
      {
        file: './test-partials.scss',
        importer: nodeSassImporter
      },
      testUtils.getSassTestCompletionCallback(gravityBldApi, 'test-partials.scss'),
    );

  }),
);

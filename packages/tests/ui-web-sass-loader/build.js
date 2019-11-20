const path = require('path');
const webpack = require('webpack');
const gravityBldApi = require('@buildit/gravity-ui-web/build-api');

const webpackConfig = require('./webpack.config');
const testUtils = require('../test-utils');

// Make 2nd webpack config for partials test file
const webpackPartialConfig = Object.assign({}, webpackConfig);
webpackPartialConfig.entry = path.resolve(__dirname, 'test-partials.scss');

testUtils.doIntro('Compile @buildit/gravity-ui-web SASS using webpack\'s sass-loader', gravityBldApi);

// Test main
webpack(
  webpackConfig,
  testUtils.getWebpackSassTestCompletionCallback(gravityBldApi, 'test.scss', () => {

    // Test partial imports
    webpack(
      webpackPartialConfig,
      testUtils.getWebpackSassTestCompletionCallback(gravityBldApi, 'test-partials.scss')
    );

  }),
);

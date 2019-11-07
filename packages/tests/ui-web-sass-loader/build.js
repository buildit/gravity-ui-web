const webpack = require('webpack');
const gravityBldApi = require('@buildit/gravity-ui-web/build-api');

const webpackConfig = require('./webpack.config');
const testUtils = require('../test-utils');

testUtils.doIntro('Compile @buildit/gravity-ui-web SASS using webpack\'s sass-loader', gravityBldApi);

webpack(
  webpackConfig,
  testUtils.getWebpackSassTestCompletionCallback(gravityBldApi),
);

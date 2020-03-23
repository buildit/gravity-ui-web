# Tests

This folder contains internal test packages. They are for testing our published NPM packages from the perspective of a consumer.

## Gravity UI Web tests
* Tests compiling `@buildit/gravity-ui-web`'s distributed SASS code:
  * [`ui-web-eyeglass`](./ui-web-eyeglass): When `@import`ed using Eyeglass.
  * [`ui-web-node-sass-import`](./ui-web-node-sass-import): When `@import`ed using `node-sass-import`.
  * [`ui-web-sass`](./ui-web-sass): When `@import`ed with a manually configured `includePaths`.
  * [`ui-web-sass-loader`](./ui-web-sass-loader): When `@import`ed using webpack's `sass-loader`.

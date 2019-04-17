# Gravity UI

This project is a [Lerna](https://lernajs.io/) monorepo composed of several sub-packages. Everything is binded
together with a custom [Semantic Release](https://github.com/semantic-release/semantic-release) pipeline configuration.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Making commits

This project uses [Commitizen](https://github.com/commitizen/cz-cli) for commit formatting.
Please use the following command after `git add` to properly check in files. Commits not checked
in this way may cause your PR to be rejected.

`npm run commit`

## Current Packages

Below is a list of the current packages maintained by this monorepo.

* [Gravity UI](https://github.com/buildit/gravity-ui-web/tree/develop/packages/gravity-ui)
* Semantic Release
  * [Lerna Config](https://github.com/buildit/gravity-ui-web/tree/develop/packages/semantic-release/config)
  * [Lerna Analyzer](https://github.com/buildit/gravity-ui-web/tree/develop/packages/semantic-release/lerna-analyzer)
  * [Lerna Release Notes Generator](https://github.com/buildit/gravity-ui-web/tree/develop/packages/semantic-release/release-notes-generator)
 

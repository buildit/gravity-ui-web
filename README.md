# Gravity Web UI packages monorepo
<img src="https://repository-images.githubusercontent.com/94554467/a6c75480-66ac-11e9-985d-1978138937a1?sanitize=true">

[![Greenkeeper badge](https://badges.greenkeeper.io/buildit/gravity-ui-web.svg)](https://greenkeeper.io/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[Lerna](https://lernajs.io/) monorepo containing **Gravity design system** NPM packages relating to Web UIs:

* [Gravity UI Web](https://github.com/buildit/gravity-ui-web/tree/develop/packages/gravity-ui-web): The core SASS/CSS library used by all Gravity-powered web projects.
* [Gravity UI Nunjucks](https://github.com/buildit/gravity-ui-web/tree/develop/packages/gravity-ui-web): Nunjucks HTML templates for Gravity UI components. Also used to generate our [living pattern library](http://style.buildit.digital/).
* Custom Semantic Release helpers:
  * [Lerna Config](https://github.com/buildit/gravity-ui-web/tree/develop/packages/semantic-release/config)
  * [Lerna Analyzer](https://github.com/buildit/gravity-ui-web/tree/develop/packages/semantic-release/lerna-analyzer)
  * [Lerna Release Notes Generator](https://github.com/buildit/gravity-ui-web/tree/develop/packages/semantic-release/release-notes-generator)


## Development

### Initial setup
After an initial clone, or if any of the packages' dependencies have changed you should run the following **in the repo's root directory**:

```
npm install
npm lerna:bootstrap
```

This will install dependencies for all packages in the repo and configure any local cross-references between them.


### Local dev
Typically, updating Gravity involves changing multiple packages - e.g. adding or modifiying Nunjucks templates in `gravity-ui-nunjucks` while also editing the corresponding SASS code in `gravity-ui-web`. The most convenient way to work is therefore to run the following **in the repo's root directory**:

```
npm start
```

This will:
* Build the `gravity-ui-web` UI library and begin watching its source files for changes (triggering a rebuild whenever they do)
* Build and launches the `gravity-ui-nunjucks` pattern library locally (opens in your default browser automatically) and begins watching its source files for changes. Updates to the UI library will also trigger an automatic refresh of the pattern library.


### Making commits
This project uses [Commitizen](https://github.com/commitizen/cz-cli) for commit formatting.
Please use the following command after `git add` to properly check in files. **Commits not checked
in this way may cause your PR to be rejected.**

```
npm run commit
```

(alternatively you can run: `npx git-cz` which does the exact same thing)


## Releases
This project is a [Lerna](https://lernajs.io/) monorepo composed of several sub-packages. Everything is binded
together with a custom [Semantic Release](https://github.com/semantic-release/semantic-release) pipeline configuration, which enables our CI to automatically make releases whenever changes are merged into the `master` branch.


## Further reading
* [Branching strategy](./docs/branching-strategy.md)
* [Travis CI pipeline](./docs/travis-ci.md)

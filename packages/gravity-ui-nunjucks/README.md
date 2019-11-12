# Gravity UI Nunjucks

Nunjucks HTML templates for Gravity web UI components. Also contains the docs and sources used to generate [Gravity's pattern library](http://style.buildit.digital/). Part of Buildit's Gravity design system.

<!--
  Tip: If using VSCode, get the "Auto Markdown TOC" extension by
  Hunter Tran to automatically update this table of contents.
  https://github.com/huntertran/markdown-toc
-->
<!-- TOC depthfrom:2 -->

- [Development](#development)
    - [Setup and local dev](#setup-and-local-dev)
    - [Build tasks](#build-tasks)
        - [Build the pattern library](#build-the-pattern-library)
        - [Clean build output](#clean-build-output)
        - [Launch local dev server](#launch-local-dev-server)
        - [Environment options](#environment-options)
    - [Further information](#further-information)
- [Deployment & releasing](#deployment--releasing)

<!-- /TOC -->

## Development

### Setup and local dev

This package's code resides in a monorepo. Please follow the [instructions in the root `README.md`](../../README.md#development) for inital setup and local development.

### Build tasks

You can also run the following commands from within this package's directory.

**Note:** You will need to have built the [`@buildit/gravity-ui-web`](../gravity-ui-web/) package first, otherwise the Gravity styles will be missing!

#### Build the pattern library 
Outputs to the `dist/` directory.
```
npm run build
```

#### Clean build output
Deletes everything in `dist/`.
```
npm run clean
```

#### Launch local dev server
Runs the pattern library on a local dev server and watches the sources for changes.
```
npm start
```
This should also open the pattern library in your default web browser. In any case, the URL will be listed in the console output. By default it is: http://localhost:3000/

#### Run accessibility tests
Outputs to the `dist/` directory.
```
npm run test:a11y
```

#### Environment options
Both `npm run build` and `npm run start` can build different variations of the pattern library, based on environment configs defined in `gulp/envs.js`. These options are primrily intended to tailor the pattern library's overview page so that users are aware which version they are currently viewing.

By default, the builds will assume you are doing a local development build and apply the `local-dev` config. If the `TRAVIS_BRANCH` environment variable is set, it will be used to automatically determine whether it is a production (from `master` branch or release tag), staging (from `develop` branch) or next (from `next` branch) build. This is so that automated builds on Travis CI generate the desired output.

For local testing, you can force a particular environment by using:

```
npm run build -- --env=[environment name]
```

or

```
npm start -- --env=[environment name]
```

Note that this `--env` switch only works when you run the build commands from within the `packages/gravity-ui-nunjucks/` directory. They will _not_ work when run from the root of the monorepo.


### Further information

* [Fractal for people used to Pattern Lab](./docs/fractal-for-pattern-labbers.md)
* [Contribution guidelines](../../CONTRIBUTING.md)
* [`git` branching strategy](../../docs/branching-strategy.md)


## Deployment & releasing
See [Travis CI pipeline doc](../../travis-ci.md)

# Gravity UI Nunjucks

Nunjucks HTML templates for Gravity web UI components. Also contains the docs and sources used to generate [Gravity's pattern library](http://style.buildit.digital/). Part of Buildit's Gravity design system.

## Development

### Setup and local dev

This package's code resides in a monorepo. Please follow the [instructions in the root `README.md`](../../README.md#development) for inital setup and local development.

### Other build tasks

You can also run the following commands from within this package's directory.

**Note:** You will need to have built the [`@buildit/gravity-ui-web`](../gravity-ui-web/) package first, otherwise the Gravity styles will be missing!

**Build the pattern library** to the `dist/` directory.
```
npm run build
```

**Clean build output** - deletes everything in `dist/`
```
npm run clean
```

**Build pattern library, run it on local dev server and watch sources**
```
npm start
```
This should also open the pattern library in your default web browser. In any case, the URL will be listed in the console output. By default it is: http://localhost:3000/


### Further information

* [Coding standards](./docs/coding-standards.md)
* [Contribution guidelines](../../CONTRIBUTING.md)
* [`git` branching strategy](../../docs/branching-strategy.md)

## Deployment & releasing
See [Travis CI pipeline doc](../../travis-ci.md)

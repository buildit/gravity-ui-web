# gravity-ui-sass
A SASS UI library from the Buildit's Gravity design system.

---

⚠️ This library is still under heavy development and does not yet have a stable API.

---


## Using this library

### Pre-requisites

* [SASS](http://sass-lang.com/) compilation setup in your project
* `npm` (>= v5.6.0)
* [Eyeglass](https://github.com/sass-eyeglass/eyeglass) (>= 1.3.0)

### Installation

```bash
$ npm install --save-dev @buildit/gravity-ui-sass
```

### Usage

In your own SASS you can then include Gravity like so:

```sass
@import 'gravity-ui-sass';
```

You can view all the available UI components in the [Buildit Living Style Guide](http://style.buildit.digital/).


## Development

### One-time setup

1. Clone this repo: https://github.com/buildit/gravity-ui-sass
1. Run `npm install` to install all the dev dependencies

### Building and running the style guide locally

We use Pattern Lab to generate our [Buildit Living Style Guide](http://style.buildit.digital/). During development, it's useful to build and run the style guide locally via:

```bash
$ npm start
```

This should also open the style guide in your default web browser. In any case, the URL will be listed in the console output. By default it is: http://localhost:3000/

The local server will then also watch source files under `src/` for changes and automatically trigger rebuilds & browser refreshes as necessary.


### Building the style guide

To only build the style guide (which is, in effect, a static HTML website) but _not_ run a local server, do:

```bash
$ npm run styleguide
```

note that this will _also_ build the UI library. The build output will go into `dist/`. You can view the style guide locally by opening `dist/index.html`.

This is mainly intended for automated build and deployments to our hosted [Buildit Living Style Guide](http://style.buildit.digital/).


### Building the UI library only

To only build the UI library (without the style guide), use:

```bash
$ npm run build
```

The build output will go into `dist/` and, in this instance, only contains the artefacts that are needed when publishing the [`@buildit/gravity-ui-sass` NPM package](https://www.npmjs.com/package/@buildit/gravity-ui-sass).


### Further information

* Coding standards (TBC)
* Contribution guidelines (TBC)
* Release process
* Travis CI setup (for automated build & deplpoyments)


# gravity-ui-web

[![Greenkeeper badge](https://badges.greenkeeper.io/buildit/gravity-ui-web.svg)](https://greenkeeper.io/)

Library of styles, components and associated assets to build UIs for the web. Part of Buildit's Gravity design system.

## Table of contents
* [Using this library](#using-this-library)
    * [Pre-requisites](#pre-requisites)
    * [Installation](#installation)
    * [Build integration](#build-integration)
    * [Usage](#usage)
* [Development](#development)
    * [One-time setup](#one-time-setup)
    * [Building and running the pattern library locally](#building-and-running-the-pattern-library-locally)
    * [Building the UI library only](#building-the-ui-library-only)
    * [Making commits](#making-commits)
    * [Further information](#further-information)
* [Deployment](#deployment)
    * [Travis CI notes](#travis-ci-notes)
    * [Further information](#further-information-1)


## Using this library

### Pre-requisites

* [SASS](http://sass-lang.com/) compilation setup in your project
* `npm` (>= v5.8.0)

If you intend to compile Gravity's SASS yourself, we strong recommend:

* [Eyeglass](https://github.com/sass-eyeglass/eyeglass) (>= 1.4.1)


### Installation

```bash
$ npm install --save-dev @buildit/gravity-ui-web
```

### Build integration

Once installed as a dependency, you need to integrate Gravity into your project's build. The [Gravity UI library NPM package](https://www.npmjs.com/package/@buildit/gravity-ui-web) ships with the following files:

* **Pre-compiled CSS file**
    * The SASS source from which the CSS was compiled
* **An SVG file** containing symbol definitions for all Gravity SVG icons
    * A JSON file containing metadata about the individual SVG icons
* **Pre-compiled client-side JS file**

You must integrate these into your own project builds as follows:

#### CSS styles
You need to get Gravity's CSS into your website or app somehow. Possible strategies include:

* Copying Gravity's pre-compiled CSS file to your build output and linking to it from your HTML.
* Combining Gravity's pre-compiled CSS with your own CSS code.
    * You can keep them in separate CSS files and link to them individually from your HTML, or you can concatenate the CSS.
    * Whichever way you choose, **Gravity's CSS must come first** since it includes normalisation rules and sets global default styles.
* Compiling Gravity's SASS source to CSS yourself.
    * It's possible to import each ITCSS layer into your index SCSS file. This gives you the ability to add your own local tools, objects, components etc in the same specificty order as Gravity. This has the benefit of potentially making your SASS cleaner and easier to integrate back into Gravity, should it be something that other projects can benefit from.

    For example:
    ```
    // === Settings layer ===
    @import 'gravity-ui-web/00-settings/settings.all';

    // === Tools layer ===
    @import 'gravity-ui-web/01-tools/tools.all';
    @import 'components/<YOUR_TOOL_NAME>.scss';

    // === Generic layer ===
    @import 'normalize';
    @import 'gravity-ui-web/02-generic/generic.all';

    // === Elements layer ===
    @import 'gravity-ui-web/03-elements/elements.all';

    // === Objects layer ===
    @import 'gravity-ui-web/04-objects/objects.all';

    // === Components layer ===
    @import 'gravity-ui-web/05-components/components.all';
    @import 'components/<YOUR_COMPONENT_NAME>.scss';

    // === Utilities layer ===
    @import 'gravity-ui-web/06-utilities/utilities.all';
    ```

    If this is not a requirement then you can simply include all of Gravty's SASS using:
    `@import 'gravity-ui-web';

* Embedding Gravity's CSS in a bundle
    * `import`ing Gravity's CSS or SASS into a JS bundle (with the appropriate loaders setup) is a perfectly valid approach
    * However, you should **avoid using tools that mangle the CSS class names** (e.g. [CSS Modules](https://github.com/css-modules/css-modules)). Gravity's CSS is designed to be global. Attempting to scope it is not supported and may well break things. If you do this, you're on your own.
    * That being said, for any _additional_ CSS rules you add _after_ the Gravity ones, you are of course free to use whatever tool or approach you like.

If your chosen approach uses Gravity's pre-compiled CSS, you **must use the [build API](./docs/build-api.md)** to grab the file's path and/or filename.

If your chosen approach uses Gravity's SASS sources, you are encouraged to use [Eyeglass](https://github.com/linkedin/eyeglass) to avoid needing to manually configure `includePaths`. If Eyeglass is not an option, then you **must use the [build API](./docs/build-api.md)** to grab the path and/or filenames for Gravity's SASS files.


#### SVG symbols
Currently, Gravity's SVG symbol definitions need to be inlined into your HTML. Then, whereever you want to _use_ one of the available icons or logos, you should use an inline SVG that references the required symbol's `id` like so:

```html
<svg
  role="img"
  aria-labelledby="buildit-logotype__title"
  width="300"
  height="33"
>
  <use xlink:href="#buildit-logotype"></use>
</svg>
```

The `height` and `width` properties should be set to ensure that your inline SVG's intrinsic size matches the aspect ratio of the referenced symbol. If you omit them, browsers will [default to a width of `150px` and a height of `100px`](https://www.sitepoint.com/replaced-elements-html-myths-realities/) and the chosen symbol will appear centered within that area.

The `aria-lebblledby` should be set to provide a text alternative for the SVG (equivalent to `alt` in `<img>` elements). All of Gravity's SVG symbol definitions contain alternative texts in their `<title>` elements and these have unique `id`s, so that they can be referenced from elsewhere via `aria-lebblledby`.

You can look up these values manually in [Gravity's pattern library](http://style.buildit.digital/?p=particles-svg-symbols). For convenience and possible automation, Gravity also ships with a JSON file that contains the symbol and title IDs and the intrinsic width and height values for every available symbol. The format of this file is as follows:

```js
{
  "symbols": [
      {
        "symbolId": "buildit-logo-hollow",
        "titleId": "buildit-logo-hollow__title",
        "width": "700px",
        "height": "700px"
      },
      // ...
  ]
}
```

As with the CSS, you **must use the [build API](./docs/build-api.md)** to grab the path and/or filename(s) to Gravity's symbols SVG file and symbol info JSON file.

#### JS

_TBD_ (Currently, Gravity is first and foremost a CSS library. It is however likely that future releases will add some kind of JS for interactive UI components. When that happens, this section will be updated accordingly)


### Usage
Once the Gravity library has been integrated into your build, all you need to do is **produce the appropriate DOM elements**. You can view all the available styles and UI components in the [Buildit Living Pattern Library](http://style.buildit.digital/). Use the "Show pattern info" option to view the Nunjucks template and rendered HTML for the component you are viewing.

![Short video of Gravity's pattern library, showing how to navigate to a pattern, open its pattern info panel and select the "HTML" tab to see the corresponding markup](./docs/gravity-pattern-library.gif)

You need to recreate the same HTML DOM structure in your project (via static HTML, dynamically via JS or a combination of both - it doesn't matter), and you will get the same appearance.

This is pretty much the same process as using other UI libraries like [Bootstrap CSS](https://getbootstrap.com/) or [Semantic UI](https://semantic-ui.com/). There is one very important difference though: Those libraries tend to use class names exclusively to bind the CSS styles to your markup, meaning that the actual HTML element used rarely matters. For example, in Bootstrap `<button class="btn btn-primary">` and `<span class="btn btn-primary">` will both produce the same _visual_ result.

**Gravity on the other hand often mandates that certain HTML elements or attributes are used**, and sometimes doesn't use classes at all (the equivalent to the Bootstrap primary button example in Gravity would simply be `<button>`). The intention is to promote semantically correct, accessible HTML. An additional benefit is that this often makes markup code is more terse as well.

As a general rule you must therefore ensure that you match:
* The HTML element used
* The attributes used (if any) - not only `class`, but others like `type`, `aria-*`, etc. as well
* For composite "molecule" or "organism" components you must also match the way they have been nested - i.e. don't introduce additional wrappers within the component

Each component also has notes (shown in the pattern info panel) which describe what it should be used for and other noteworthy information.


## Development

### One-time setup

1. Clone this repo: https://github.com/buildit/gravity-ui-web
1. Run `npm install` to install all the dev dependencies

### Building and running the pattern library locally

We use [Pattern Lab](https://patternlab.io/) to generate our [Buildit Living Pattern Library](http://style.buildit.digital/). During development, it's useful to build and run the pattern library locally via:

```bash
$ npm start
```

This should also open the pattern library in your default web browser. In any case, the URL will be listed in the console output. By default it is: http://localhost:3000/

The local server will then also watch source files under `src/` for changes and automatically trigger rebuilds & browser refreshes as necessary.


### Building the pattern library

To only build the pattern library (which is, in effect, a static HTML website) but _not_ run a local server, do:

```bash
$ npm run styleguide
```

Note that this will _also_ build the UI library. The build output will go into `dist/`. You can view the pattern library locally by opening `dist/index.html` in your browser.

This is mainly intended for automated build and deployments to our hosted [Buildit Living Style Guide](http://style.buildit.digital/).


### Building the UI library only

To only build the UI library (without the pattern library), use:

```bash
$ npm run build
```

The build output will go into `dist/` and, in this instance, only contains the artefacts that are needed when publishing the [`@buildit/gravity-ui-web` NPM package](https://www.npmjs.com/package/@buildit/gravity-ui-web).

### Further information

* Coding standards (TBC)
  * [Naming conventions](./docs/naming-conventions.md)
* [Contribution guidelines](/CONTRIBUTING.md)
* [`git` branching strategy](./docs/branching-strategy.md)

## Deployment

### Travis CI notes
The current Travis CI configuration utilises `npm ci` to ensure reproducibility for every build.

`.travis.yml` takes care of installing the correct npm version before running `npm ci`.

To be able to run `npm ci` on your machine, and to be sure to create a `package-lock.json` file compatible with it, make sure to update to npm version 5.8.0.

`.nvmrc` only allows us to specify Node.js version, but that alone is not enough at the moment, since Node.js 8 comes out of the box with npm version 5.6.0.

### Further information
* [Release process](./docs/releasing.md)
* [Travis CI setup](./docs/travis-ci.md) (for automated build & deplpoyments)
* [npm ci docs](https://docs.npmjs.com/cli/ci)

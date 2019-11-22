# Gravity Web UI library
<img src="https://repository-images.githubusercontent.com/94554467/a6c75480-66ac-11e9-985d-1978138937a1?sanitize=true">

Library of styles, components and associated assets to build UIs for the web. Part of Buildit's Gravity design system.

Published as the NPM package [`@buildit/gravity-ui-web`](https://www.npmjs.com/package/@buildit/gravity-ui-web).

## Table of contents
* [Using this library](#using-this-library)
    * [Pre-requisites](#pre-requisites)
    * [Installation](#installation)
    * [Build integration](#build-integration)
    * [Usage](#usage)
* [Development](#development)
    * [Setup and local dev](#setup-and-local-dev)
    * [Other build tasks](#other-build-tasks)
    * [Further information](#further-information)
* [Deployment](#deployment--releasing)


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

### Setup and local dev

This package's code resides in a monorepo. Please follow the [instructions in the root `README.md`](../../README.md#development) for inital setup and local development.

### Other build tasks

You can also run the following commands from within this package's directory:

**Build the UI library** to the `dist/` directory.
```
npm run build
```

**Clean build output** - deletes everything in `dist/`
```
npm run clean
```

**Build & watch UI library**
```
npm start
```

**Build SASS API docs**
```
npm run docs
```
(The generated docs go into: `dist/docs/sass/`)

The above command only includes _public_ SASS APIs that are also available to consumers of the `@buildit/gravity-ui-web` package. Developers working on the library itself can also use `npm run docs:dev` to generate SASS API docs that also include the _private_ APIs. These get output to `dist/docs/sass-dev/`.


### Further information

* [Documentation section in pattern library](http://style.buildit.digital/docs/)
* [Coding standards](./docs/coding-standards.md)
* [Contribution guidelines](../../CONTRIBUTING.md)
* [`git` branching strategy](../../docs/branching-strategy.md)

## Deployment & releasing
See [Travis CI pipeline doc](../../travis-ci.md)

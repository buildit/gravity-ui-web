# Build API

The `@buildit/gravity-ui-web` NPM package provides a Node.js API for build scripts to use. It provides file names and paths to the relevant assets contained in the NPM package, as well as useful metadata about the package.

Projects that use Gravity's UI library are **strongly encouraged** to use this API within their build scripts (e.g. [Gulp](https://gulpjs.com/) files or [Webpack](https://webpack.js.org/) configs), instead of hard-coding paths like `../node_modules/@buildit/gravity-ui-web/some/file.ext`. The build API is part of this package's public API surface, but the actual assets file names and locations are not. So, if `gravity.css` was renamed to `foo.css` in a future release, that would _not_ be considered a breaking change. However, renaming or remoing the `distCssFilename` property of the build API _would_ be a breaking change.

⚠️ **Note:** The build API is strictly intended for build-time scripts and tools. It should never be embedded into your actual build artefacts.

## Using the API
Simply `require()` (or `import`) `@buildit/gravity-ui-web/build-api` and then use the properties and functions of the object you receive:

```js
const gravityPaths = require('@buildit/gravity-ui-web/build-api');

// === Metadata ===
console.log(gravityPaths.version); // The Gravity version you have installed. E.g. '0.12.0'

// === Pre-built distributables ===
console.log( gravityPaths.distCssFilename ); // Filename of the main CSS file. E.g. 'gravity.css'
console.log( gravityPaths.distCssDebugFilename ); // Filename of the debug CSS file. E.g. 'debug.css'
console.log( gravityPaths.distSvgSymbolsFilename ); // Filename of the SVG containing symbol definitions. E.g. 'symbols.svg'
console.log( gravityPaths.distSvgSymbolsInfoFilename ); // Filename of JSON containing SVG symbol metadata. E.g. 'symbols.json'
console.log( gravityPaths.distJsFilename ); // Filename of main JS file. E.g. 'gravity.js'

// Additionally, the distPath() function is provided to construct the absolute path
// to any file in the distributables directory.

// For example:
console.log( gravityPaths.distPath(gravityPaths.distCssFilename) );
// Will output something like: '/Users/xy123456/code/gravity-ui-web/dist/ui-lib/gravity.css'

// If invoked with no arguments, it returns the path to the distributables directory:
console.log( gravityPaths.distPath() );
// Will output something like: '/Users/xy123456/code/gravity-ui-web/dist/ui-lib'

// If invoked with multiple arguments, they are treated as path segments relative to the
// distributables directory. This can be useful for constructing globs that have the
// correct path separators for your OS:
console.log( gravityPaths.distPath('**', '*.css') );
// Will output something like: '/Users/xy123456/code/gravity-ui-web/dist/ui-lib/**/*.css'


// === SASS source code ===
console.log( gravityPaths.srcSassMainFilename ); // Filename of main SASS file. E.g. 'index.scss'
console.log( gravityPaths.srcSassDebugFilename ); // Filename of debug SASS file. E.g. 'debug.scss'

// Additionally, the srcSassPath() function is provided to construct the absolute path
// to any file in SASS source directory. It behaves exactly like the distPath() counterpart
// described above:

console.log( gravityPaths.srcSassPath() ); // '/Users/xy123456/code/gravity-ui-web/src/ui-lib/sass
console.log( gravityPaths.srcSassPath(gravityPaths.srcSassMainFilename) ); // '/Users/xy123456/code/gravity-ui-web/src/ui-lib/sass/index.scss'
console.log( gravityPaths.srcSassPath('**', '*.scss') ); // '/Users/xy123456/code/gravity-ui-web/src/ui-lib/sass/**/*.scss'
```

## Gulp example
Here's a simple example of how you might use this API within a Gulp build script:

```js
// gulpfile.js

const path = require('path');
const gulp = require('gulp');
const gravityPaths = require('@buildit/gravity-ui-web/build-api');

// This project's build output dir
const buildDir = path.resolve(__dirname, 'public');

// Task to copy Gravity SVG symbols file to build output
function copyGravitySvgSymbols() {
  return gulp.src( gravityPaths.distPath(gravityPaths.distSvgSymbolsFilename) )
    .pipe(gulp.dest( buildDir ));
}

// Task to copy Gravity's pre-compiled CSS file in the build output
function copyGravityCss() {
  return gulp.src( gravityPaths.distPath(gravityPaths.distCssFilename) )
    .pipe(gulp.dest( buildDir ));
}

module.exports = {
  // Default Gulp task to copy SVGs and compile SASS in parallel
  default: gulp.parallel(copyGravitySvgSymbols, copyGravityCss)
};
```

⚠️ **Note on SASS compilation:** When compiling your own SASS, it may be tempting to simply point the SASS compiler at `gravityPaths.srcSassMainFilename` (or to add `gravityPaths.srcSassPath()` to Node SASS's `inludePaths` and then `@import "gravity-ui-web";` in one of your own SASS files). However, this alone will not work. Gravity's SASS depends on a few external SASS libraries (`@buildit/gravy`, `modularscale-sass` & `normalize-scss`). You must therefore ensure that each library's SASS directory is also added to the Node SASS's `includePaths` option.

Note that Gravity itself and all of those SASS libraries support [Eyeglass](https://github.com/linkedin/eyeglass) which avoids the need to manually set the `includePaths` like that. We therefore recommend using Eyeglass to simplify your SASS build configuration.

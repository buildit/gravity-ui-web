const fractal = require('@frctl/fractal').create();
const nunj = require('@frctl/nunjucks');
const gravityUiWebBldApi = require('@buildit/gravity-ui-web/build-api');
const gravityParticlesBldApi = require('@buildit/gravity-particles/build-api');

const theme = require('./build/fractal/theme');
const bldApi = require('./build-api');
const bldPaths = require('./build/paths');
const envs = require('./build/envs');

const currentEnv = envs.getCurrentEnvInfo();

/* Set the title of the project */
fractal.set('project.title', `Buildit Gravity pattern library${currentEnv.showNameInTitle ? ` (${currentEnv.name})` : ''}`);
fractal.set('project.version', bldApi.version);

/* Tell Fractal where the components will live */
fractal.components.set('path', bldPaths.srcComponentsPath());

// register the Nunjucks adapter for your components
fractal.components.engine(nunj());

// look for files with a .nunj file extension
fractal.components.set('ext', '.njk');

/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', bldPaths.srcDocsPath());

// Set engine to Nunjucks
fractal.docs.engine(nunj);
fractal.docs.set('ext', '.md');

// Add some global context data for docs to use
fractal.docs.set('default.context', {
  gravity: {
    uiWeb: {
      version: gravityUiWebBldApi.version,
    },
    particles: {
      version: gravityParticlesBldApi.version,
    },
  },

  envs,
});

// Use our customised version of the Mandelbrot theme
fractal.web.theme(theme);

/* Tell Fractal which directory to serve up for static assets */
fractal.web.set('static.path', bldPaths.distAssetsPath());

/* Tell Fractal which directory to build static HTML output to */
fractal.web.set('builder.dest', bldApi.distPatternLibraryPath());

/* Tweak BrowserSync config */
fractal.web.set('server.syncOptions', {
  // Automatically open localhost URL in default brwoser
  open: 'local',

  snippetOptions: {
    // Make BrowerSync JS snippet get appended
    // to <head> instead of <body>, so that it doesn't
    // interfere with our * + * CSS rules.
    rule: {
      fn(snippet, match) {
        return snippet + match;
      },
      match: /<\/head>/i,
    },
  },
});

module.exports = fractal;

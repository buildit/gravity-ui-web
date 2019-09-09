/*
  Customises Fractal's default Mandelbrot theme.

  Refer to Fractal docs for more details:
  https://fractal.build/guide/web/default-theme.html#configuration
*/
const mandelbrot = require('@frctl/mandelbrot');
const paths = require('../paths');

// create a new instance with custom config options
const customisedTheme = mandelbrot({
  skin: 'teal',
  favicon: '/favicon.ico',
  styles: [
    'default',
    '/pl-styles/fractal-theme.css',
  ],
  nav: ['docs', 'components'],
});

customisedTheme.addLoadPath(paths.fractalThemeOverridesPath());

module.exports = customisedTheme;

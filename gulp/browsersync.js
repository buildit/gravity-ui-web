/**
 * Gulp tasks and helper functions for launching and reloading
 * in BrowserSync.
 */

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const gravityUiSass = require('../index.js');

const taskNamePrefix = 'browsersync:';

/**
 * Reloads BrowserSync.
 * Note: Exits more reliably when used with a done callback.
 */
function reload(done) {
  browserSync.reload();
  done();
}

/**
 * Reloads BrowserSync, with CSS injection.
 * Note: Exits more reliably when used with a done callback.
 */
function reloadCSS(done) {
  browserSync.reload('*.css');
  done();
}


/**
 * Starts BrowserSync.
 */
function initTask(done) {
  browserSync.init({
    server: {
      baseDir: gravityUiSass.bldRootDir
    },
    snippetOptions: {
      // Ignore all HTML files within the templates folder
      blacklist: ['/index.html', '/', '/?*']
    },
    notify: {
      styles: [
        'display: none',
        'padding: 15px',
        'font-family: sans-serif',
        'position: fixed',
        'font-size: 1em',
        'z-index: 9999',
        'bottom: 0px',
        'right: 0px',
        'border-top-left-radius: 5px',
        'background-color: #1B2032',
        'opacity: 0.4',
        'margin: 0',
        'color: white',
        'text-align: center'
      ]
    }
  },
  done);
};
initTask.displayName = taskNamePrefix + 'init';
initTask.description = 'Launches BrowserSync dev server.';


module.exports = {
  stream: browserSync.stream,
  reload,
  reloadCSS,
  initTask
}

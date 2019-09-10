const fractal = require('../../fractal');
const envs = require('../envs');

const taskNamePrefix = 'fractal:';

// keep a reference to the fractal CLI console utility
const logger = fractal.cli.console;

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */
async function startServer() {
  const server = fractal.web.server({
    sync: true,
  });

  server.on('error', (err) => logger.error(err.message));

  await server.start();
  logger.success(`Fractal server is now running at ${server.url}`);
  logger.success(`Network URL: ${server.urls.sync.external}`);
}
startServer.displayName = `${taskNamePrefix}start`;

/*
 * Run a static export of the project web UI.
 *
 * This task will report on progress using the 'progress' event emitted by the
 * builder instance, and log any errors to the terminal.
 *
 * The build destination will be the directory specified in the 'builder.dest'
 * configuration option set above.
 */
async function buildPatternLibrary() {
  logger.success(`Fractal build for environment: ${envs.getCurrentEnvInfo().name}`);
  const builder = fractal.web.builder();

  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', (err) => logger.error(err.message));

  await builder.build();
  logger.success('Fractal build completed!');
}
buildPatternLibrary.displayName = `${taskNamePrefix}build`;

module.exports = {
  startServer,
  buildPatternLibrary,
};

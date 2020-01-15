const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const svgSymbols = require('gulp-svg-symbols');
const rename = require('gulp-rename');
const cheerio = require('gulp-cheerio');
const filter = require('gulp-filter');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const file = require('gulp-file');

const cssnano = require('cssnano');
const cssMqPacker = require('css-mqpacker');
const eyeglass = require('eyeglass');
const chalk = require('chalk');

const gravityParticlesbldApi = require('@buildit/gravity-particles/build-api');
const msPackageJson = require('modularscale-sass/package.json');
const msEyeglassExports = require('modularscale-sass/eyeglass-exports');

const pkgPaths = require('./paths.js');
const bldConsts = require('../build-consts.js');
const uiLibPaths = require('../build-api.js');

const taskNamePrefix = 'ui-lib:';

function copyGravityParticles() {
  return gulp.src(gravityParticlesbldApi.distPath('scss/**/*'))
    // Add metadata JSON file
    .pipe(file(
      bldConsts.versionFilename,
      JSON.stringify({
        version: gravityParticlesbldApi.version,
      }, undefined, 2),
    ))
    .pipe(gulp.dest(pkgPaths.srcSassExtPath(bldConsts.gravityParticlesDirname)));
}
copyGravityParticles.displayName = `${taskNamePrefix}copy-ext-lib:gravity-particles`;
copyGravityParticles.description = 'Copies Gravity Particles SASS lib to source folder.';

function copyModularscale() {
  // Reliable way to figure out the path to modularscale-sass's directory
  // within this project's node_modules/
  const msPackageJsonPath = require.resolve('modularscale-sass/package.json');
  const msPackageRoot = path.dirname(msPackageJsonPath);

  // Use modularscale-sass's Eyeglass manifest to get the dir
  // where its SASS sources are kept
  const msEyeglassManifest = msEyeglassExports();

  return gulp.src([
    // Copy entire SASS sources
    path.resolve(msEyeglassManifest.sassDir, '**', '*'),

    // Copy license file
    path.resolve(msPackageRoot, 'license.md'),
  ])
    // Add metadata JSON file
    .pipe(file(
      bldConsts.versionFilename,
      JSON.stringify({
        version: msPackageJson.version,
      }, undefined, 2),
    ))
    .pipe(gulp.dest(pkgPaths.srcSassExtPath(bldConsts.modularscaleDirname)));
}
copyModularscale.displayName = `${taskNamePrefix}copy-ext-lib:modularscale-sass`;
copyModularscale.description = 'Copies Modularscale SASS lib to source folder.';

function sassBuildTask() {
  const sassOptions = {};

  const mainSassFileFilter = filter(
    `**/${uiLibPaths.srcSassMainFilename.replace(/\.scss$/, '.css')}`,
    {
      restore: true,
    },
  );

  return gulp.src(uiLibPaths.srcSassPath('*.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass(eyeglass(sassOptions))).on('error', sass.logError)

  // Rename index.css to gravity.css, but leave other
  // filenames unchanged
    .pipe(mainSassFileFilter)
    .pipe(rename(uiLibPaths.distCssFilename))
    .pipe(mainSassFileFilter.restore)

  // Post-process CSS to optimize and minify
    .pipe(postcss([
      cssMqPacker({
        sort: true,
      }),
      cssnano(),
    ]))

    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(uiLibPaths.distPath()));
}
sassBuildTask.displayName = `${taskNamePrefix}sass`;
sassBuildTask.description = 'Compiles SASS.';

const titleIdSuffix = '__title';

function svgSymbolsTask() {
  const svgFileFilter = filter('**/*.svg', { restore: true });

  return gulp.src(gravityParticlesbldApi.distWebSvgPath('**', '*.svg'))
    .pipe(
      // Rename SVG files to prefix their respective dirnames.
      //
      // E.g. logo/gravity.svg --> logo/logo-gravity.svg
      //
      // This is needed as only the filename will later be used
      // to generate the symbol IDs. So we end up with an ID of
      // "logo-gravity" in the above example rather than just
      // "gravity".
      rename((svgPath) => {
        // eslint-disable-next-line no-param-reassign
        svgPath.basename = `${path.basename(svgPath.dirname)}-${svgPath.basename}`;
      }),
    )
    .pipe(svgSymbols({
      svgAttrs: {
        style: 'display: none;',
        'aria-hidden': 'true',
      },
      templates: [
        'default-svg',
        path.resolve(__dirname, 'templates', 'symbols.json'),
      ],
      transformData(svg, defaultData) {
        // Add the titleIdSuffix to the data passed into our
        // symbols.json template
        return Object.assign(defaultData, {
          titleIdSuffix,
        });
      },
    }))
    .pipe(svgFileFilter) // Exclude JSON file from passing through cheerio
    .pipe(cheerio({
      run($) {
        // Add an ID to the <title> element of each SVG symbol
        // This is so that we can later reference it via
        // aria-labelledby for better a11y.
        $('symbol').each((index, element) => {
          const symbol = $(element);
          const symbolId = symbol.attr('id');
          const title = symbol.children('title');
          title.attr('id', symbolId + titleIdSuffix);
        });
      },
      parserOptions: {
        xmlMode: true,
      },
    }))
    .pipe(svgFileFilter.restore)
    .pipe(rename({
      basename: bldConsts.svgSymbolsBasename,
    }))
    .pipe(gulp.dest(uiLibPaths.distPath()));
}
svgSymbolsTask.displayName = `${taskNamePrefix}svg-symbols`;
svgSymbolsTask.description = `Compiles ${uiLibPaths.distSvgSymbolsFilename} file.`;

function copyJsTask() {
  return gulp.src(pkgPaths.srcJsPath('**', '*.js'))
    .pipe(gulp.dest(uiLibPaths.distPath()));
}
copyJsTask.displayName = `${taskNamePrefix}js`;
copyJsTask.description = 'Copies JS files.';

// Composite task to do complete UI lib build
const buildTasks = gulp.series(
  gulp.parallel(copyGravityParticles, copyModularscale),
  gulp.parallel(sassBuildTask, svgSymbolsTask, copyJsTask),
);
buildTasks.displayName = `${taskNamePrefix}build`;
buildTasks.description = 'Builds the Gravity UI library.';

function watchTask(done) {
  const watchers = [
    {
      name: 'SASS',
      paths: [uiLibPaths.srcSassPath('**', '*.scss')],
      config: {},
      tasks: sassBuildTask,
    },
    {
      name: 'SVG Sprites',
      paths: [pkgPaths.srcSvgSymbolsPath('**', '*.svg')],
      config: {},
      tasks: svgSymbolsTask,
    },
    {
      name: 'JS',
      paths: [pkgPaths.srcJsPath('**', '*.js')],
      config: {},
      tasks: copyJsTask,
    },
  ];

  watchers.forEach((watcher) => {
    // eslint-disable-next-line no-console
    console.log(`\n${chalk.bold(`Watching ${watcher.name}:`)}`);

    // eslint-disable-next-line no-console
    watcher.paths.forEach((p) => console.log(`  ${p}`));

    gulp.watch(watcher.paths, watcher.config, watcher.tasks);
  });
  done();
}
watchTask.displayName = `${taskNamePrefix}watch`;
watchTask.description = 'Watches UI library files';

module.exports = {
  sassBuildTask,
  svgSymbolsTask,
  buildTasks,
  watchTask,
};

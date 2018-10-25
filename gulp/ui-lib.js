const gulp = require('gulp');
const sass = require('gulp-sass');
const svgo = require('gulp-svgo');
const svgSymbols = require('gulp-svg-symbols');
const rename = require("gulp-rename");
const cheerio = require('gulp-cheerio');
const filter = require('gulp-filter');

const eyeglass = require('eyeglass');
const chalk = require('chalk');

const paths = require('./paths.js');
const plServer = require('./patternlab.js').plServer;

const taskNamePrefix = 'ui-lib:';


function sassBuildTask () {
  const sassOptions = {};

  const mainSassFileFilter = filter(
    `**/${paths.mainSassFilename.replace(/\.scss$/, '.css')}`,
    {
      restore: true
    }
  );

  return gulp.src(`${paths.srcSassDir}/*.scss`)
    .pipe(sass(eyeglass(sassOptions))).on('error', sass.logError)
    // Only rename the main CSS file
    .pipe(mainSassFileFilter)
    .pipe(rename({
      basename: paths.cssFileBasename,
    }))
    .pipe(mainSassFileFilter.restore)
    .pipe(gulp.dest(paths.bldUiLibDir))
}
sassBuildTask.displayName = taskNamePrefix + 'sass';
sassBuildTask.description = 'Compiles SASS.';


const titleIdSuffix = '__title';

function svgSymbolsTask () {
  const svgFileFilter = filter('**/*.svg', { restore: true });

  return gulp.src(paths.normalizePath(paths.srcSymbolsDir, '**', '*.svg'))
    .pipe(svgo({
      plugins: [
        {
          removeTitle: false
        },
        {
          removeViewBox: false
        },
        {
          removeDimensions: true
        },
        {
          sortAttrs: true
        },
        {
          // Our SVG symbols should be shapes only,
          // therefore removing styling attributes.
          // If this breaks the appearance of an SVG, then the
          // SVG file needs fixing.
          removeAttrs: {
            attrs: [
              'fill',
              'font-.*',
              'letter-.*',
              'opacity',
              'stroke',
              'style',
              'word-.*'
            ]
          }
        }
      ]
    }))
    .pipe(svgSymbols({
      svgAttrs: {
        'style': 'display: none;',
        'aria-hidden': 'true'
      },
      templates: [
        'default-svg',
        paths.normalizePath(__dirname, 'templates', 'symbols.json')
      ],
      transformData: function(svg, defaultData, options) {
        // Add the titleIdSuffix to the data passed into our
        // symbols.json template
        return Object.assign(defaultData, {
          titleIdSuffix
        });
      }
    }))
    .pipe(svgFileFilter) // Exclude JSON file from passing through cheerio
    .pipe(cheerio({
      run: function($, file) {
        // Add an ID to the <title> element of each SVG symbol
        // This is so that we can later reference it via
        // aria-labelledby for better a11y.
        $('symbol').each(function(){
          const symbol = $(this);
          const symbolId = symbol.attr('id');
          const title = symbol.children('title');
          title.attr('id', symbolId + titleIdSuffix);
        });
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(svgFileFilter.restore)
    .pipe(rename({
      basename: paths.symbolsBasename
    }))
    .pipe(gulp.dest(paths.bldUiLibDir))
}
svgSymbolsTask.displayName = taskNamePrefix + 'svg-symbols';
svgSymbolsTask.description = 'Compiles symbols.svg file.';


function copyJsTask() {
  return gulp.src(paths.normalizePath(paths.srcJsDir, '**', '*.js'))
    .pipe(gulp.dest(paths.bldUiLibDir));
}
copyJsTask.displayName = taskNamePrefix + 'js';
copyJsTask.description = 'Copies JS files.';

// Composite task to do complete UI lib build
const buildTasks = gulp.parallel(sassBuildTask, svgSymbolsTask, copyJsTask);
buildTasks.displayName = taskNamePrefix + 'build';
buildTasks.description = 'Builds the Gravity UI library.';


function watchTask() {
  const watchers = [
    {
      name: 'SASS',
      paths: [paths.normalizePath(paths.srcSassDir, '**', '*.scss')],
      config: { awaitWriteFinish: true },
      tasks: gulp.series(sassBuildTask, plServer.refreshCSS)
    },
    {
      name: 'SVG Sprites',
      paths: [paths.normalizePath(paths.srcSymbolsDir, '**', '*.svg')],
      config: { awaitWriteFinish: true },
      tasks: svgSymbolsTask
    },
    {
      name: 'JS',
      paths: [paths.normalizePath(paths.srcJsDir, '**', '*.js')],
      config: { awaitWriteFinish: true },
      tasks: gulp.series(copyJsTask, plServer.reload)
    }
  ];

  watchers.forEach(watcher => {
    console.log('\n' + chalk.bold('Watching ' + watcher.name + ':'));
    watcher.paths.forEach(p => console.log('  ' + p));
    gulp.watch(watcher.paths, watcher.config, watcher.tasks);
  });
  console.log();
}
watchTask.displayName = taskNamePrefix + 'watch';
watchTask.description = 'Watches UI library files';



module.exports = {
  sassBuildTask,
  svgSymbolsTask,
  buildTasks,
  watchTask
};


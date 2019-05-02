const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const svgo = require('gulp-svgo');
const svgSymbols = require('gulp-svg-symbols');
const rename = require("gulp-rename");
const cheerio = require('gulp-cheerio');
const filter = require('gulp-filter');

const eyeglass = require('eyeglass');
const chalk = require('chalk');

const pkgPaths = require('./paths.js');
const bldConsts = require('../build-consts.js');
const uiLibPaths = require('../build-api.js');

const taskNamePrefix = 'ui-lib:';


function sassBuildTask () {
  const sassOptions = {};

  const mainSassFileFilter = filter(
    `**/${uiLibPaths.srcSassMainFilename.replace(/\.scss$/, '.css')}`,
    {
      restore: true
    }
  );

  return gulp.src(uiLibPaths.srcSassPath('*.scss'))
    .pipe(sass(eyeglass(sassOptions))).on('error', sass.logError)
    // Only rename the main CSS file
    .pipe(mainSassFileFilter)
    .pipe(rename(uiLibPaths.distCssFilename))
    .pipe(mainSassFileFilter.restore)
    .pipe(gulp.dest(uiLibPaths.distPath()))
}
sassBuildTask.displayName = taskNamePrefix + 'sass';
sassBuildTask.description = 'Compiles SASS.';


const titleIdSuffix = '__title';

function svgSymbolsTask () {
  const svgFileFilter = filter('**/*.svg', { restore: true });

  return gulp.src(pkgPaths.srcSvgSymbolsPath('**', '*.svg'))
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
        path.resolve(__dirname, 'templates', 'symbols.json')
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
      basename: bldConsts.svgSymbolsBasename
    }))
    .pipe(gulp.dest(uiLibPaths.distPath()))
}
svgSymbolsTask.displayName = taskNamePrefix + 'svg-symbols';
svgSymbolsTask.description = `Compiles ${uiLibPaths.distSvgSymbolsFilename} file.`;


function copyJsTask() {
  return gulp.src(pkgPaths.srcJsPath('**', '*.js'))
    .pipe(gulp.dest(uiLibPaths.distPath()));
}
copyJsTask.displayName = taskNamePrefix + 'js';
copyJsTask.description = 'Copies JS files.';

// Composite task to do complete UI lib build
const buildTasks = gulp.parallel(sassBuildTask, svgSymbolsTask, copyJsTask);
buildTasks.displayName = taskNamePrefix + 'build';
buildTasks.description = 'Builds the Gravity UI library.';


function watchTask(done) {
  const watchers = [
    {
      name: 'SASS',
      paths: [uiLibPaths.srcSassPath('**', '*.scss')],
      config: {},
      tasks: sassBuildTask
    },
    {
      name: 'SVG Sprites',
      paths: [pkgPaths.srcSvgSymbolsPath('**', '*.svg')],
      config: {},
      tasks: svgSymbolsTask
    },
    {
      name: 'JS',
      paths: [pkgPaths.srcJsPath('**', '*.js')],
      config: {},
      tasks: copyJsTask
    }
  ];

  watchers.forEach(watcher => {
    console.log('\n' + chalk.bold('Watching ' + watcher.name + ':'));
    watcher.paths.forEach(p => console.log('  ' + p));
    gulp.watch(watcher.paths, watcher.config, watcher.tasks);
  });
  done();
}
watchTask.displayName = taskNamePrefix + 'watch';
watchTask.description = 'Watches UI library files';



module.exports = {
  sassBuildTask,
  svgSymbolsTask,
  buildTasks,
  watchTask
};


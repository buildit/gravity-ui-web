/******************************************************
 * PATTERN LAB NODE
 * EDITION-NODE-GULP
 * The gulp wrapper around patternlab-node core, providing tasks to interact with the core library.
******************************************************/
const gulp = require('gulp');
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const sass = require('gulp-sass');
const eyeglass = require('eyeglass');


/******************************************************
 * PATTERN LAB  NODE WRAPPER TASKS with core library
******************************************************/
const config = require('./patternlab-config.json');
const patternlab = require('@pattern-lab/patternlab-node')(config);

function build() {
  return patternlab.build({
    watch: argv.watch,
    cleanPublic: config.cleanPublic
  }).then(() => {
    // do something else when this promise resolves
  });
}

function serve() {
  // PL serve() barfs on a first-time run (when no dist/ dir
  // exists) unless we do a build() first.
  return build()
    .then(() => {
      patternlab.serve({
        cleanPublic: config.cleanPublic
      })
    })
    .then(() => {
      // do something else when this promise resolves
    });
}

gulp.task('patternlab:version', function (done) {
  patternlab.version();
  done();
});

gulp.task('patternlab:help', function (done) {
  patternlab.help();
  done();
});

gulp.task('patternlab:patternsonly', function (done) {
  patternlab.patternsonly(config.cleanPublic);
  done();
});

gulp.task('patternlab:liststarterkits', function (done) {
  patternlab.liststarterkits();
  done();
});

gulp.task('patternlab:loadstarterkit', function (done) {
  patternlab.loadstarterkit(argv.kit, argv.clean);
  done();
});

gulp.task('patternlab:build', function () {
  return build().then(() => {
    // do something else when this promise resolves
  });
});

gulp.task('patternlab:serve', function () {
  return serve().then(() => {
    // do something else when this promise resolves
  });
});

gulp.task('patternlab:installplugin', function (done) {
  patternlab.installplugin(argv.plugin);
  done();
});



/******************************************************
 * Extra tasks
******************************************************/

function absPath( ...parts ) {
  return path.resolve( __dirname, ...parts );
}


const gravityPaths = {
  src: {
    sass: './src/sass/'
  }
}



gulp.task('gravity:sass', function () {
  const sassOptions = {
    // TODO: Eyeglass integration
  };

  return gulp.src(
      absPath(gravityPaths.src.sass, '**/*.scss')
    )
    .pipe(
      sass(
        eyeglass(sassOptions)
      )
    )
    .on('error', sass.logError)
    .pipe( gulp.dest( absPath(config.paths.public.css) ) );
});


gulp.task('gravity:sass-watch', function () {
  return gulp.watch(
    absPath(gravityPaths.src.sass, '**/*.scss'),
    gulp.series('gravity:sass')
  );
});




gulp.task('styleguide', gulp.parallel('gravity:sass', 'patternlab:build'));

gulp.task('serve', gulp.parallel(
  gulp.series('gravity:sass', 'gravity:sass-watch'),
  'patternlab:serve')
);

gulp.task('default', gulp.series('gravity:sass'));

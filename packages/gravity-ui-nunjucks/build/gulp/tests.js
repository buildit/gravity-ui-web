const taskNamePrefix = 'tests:';

const gulp = require('gulp');
const jasmine = require('gulp-jasmine');

function runA11yTests() {
  return gulp.src('__tests__/*.spec.js')
    .pipe(jasmine());
}
runA11yTests.displayName = `${taskNamePrefix}a11y`;
runA11yTests.description = 'Run accessibility tests.';

module.exports = {
  runA11yTests,
};

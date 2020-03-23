const taskNamePrefix = 'tests:';

const Jasmine = require('jasmine');

function runA11yTests(done) {
  const jasmine = new Jasmine();

  jasmine.onComplete((passed) => {
    if (passed) {
      done();
    } else {
      done('At least one a11y test failed');
    }
  });

  jasmine.execute(['__tests__/*.spec.js']);
}
runA11yTests.displayName = `${taskNamePrefix}a11y`;
runA11yTests.description = 'Run accessibility tests.';

module.exports = {
  runA11yTests,
};

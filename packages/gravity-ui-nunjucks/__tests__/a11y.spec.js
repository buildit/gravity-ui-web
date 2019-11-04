const AxeBuilder = require('axe-webdriverjs');
const selenium = require('selenium-webdriver');
const util = require('util');

let driver;

describe('A11y tests', () => {
  beforeEach((done) => {
    driver = new selenium.Builder().forBrowser('chrome').build();

    driver.get('http://localhost:3000/components/preview/text-input').then(() => done());
  });

  afterEach((done) => {
    driver.quit().then(() => {
      done();
    });
  });

  it('should have no accessibility violations', (done) => {
    driver
      .findElement(selenium.By.css('input'))
      .then(() => {
        AxeBuilder(driver)
          .analyze((err, results) => {
            console.log('Accessibility Violations: ', results.violations.length);
            if (results.violations.length > 0) {
              console.log(util.inspect(results.violations, true, null));
            }
            expect(results.violations.length).toBe(0);
            done();
          });
      });
  });
});

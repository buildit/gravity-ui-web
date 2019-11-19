const AxeBuilder = require('axe-webdriverjs');
const selenium = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { getViolations, getComponentsNames } = require('./_helpers');
const pkgEnvs = require('../build/envs');
const { excludedA11yFiles: excludedFiles, excludedA11yRules: excludedRules } = require('../test-consts');
const fractal = require('../fractal');

describe('A11y tests', () => {
  let driver;
  const components = fractal.components
    .flattenDeep()
    .toArray()
    .reduce((accumulator, currentValue) => {
      if (currentValue.alias !== null) {
        accumulator.push(currentValue.alias);
      }
      return accumulator;
    }, []);
  const componentNames = getComponentsNames(components, excludedFiles);

  componentNames.forEach((component) => {
    describe(`${component} component`, () => {
      beforeEach((done) => {
        driver = new selenium.Builder()
          .forBrowser('chrome')
          .setChromeOptions(
            new chrome.Options()
              .headless()
              .windowSize({ width: 640, height: 480 }),
          )
          .build();
        const componentUrl = `${pkgEnvs.getCurrentEnvInfo().url}/components/preview/${component}`;
        driver.get(componentUrl).then(() => done());
      });

      afterEach((done) => {
        driver.quit().then(() => {
          done();
        });
      });

      it('should have no accessibility violations', (done) => {
        driver
          .findElement(selenium.By.tagName('body'))
          .then(() => {
            AxeBuilder(driver)
              .disableRules(excludedRules)
              .analyze((err, results) => {
                expect(results.violations.length).toBe(0);
                if (results.violations.length > 0) {
                  const violations = getViolations(results.violations);
                  // eslint-disable-next-line no-console
                  console.log('\x1b[34m', `\nURL: ${pkgEnvs.getCurrentEnvInfo().url}/components/preview/${component}`);
                  violations.forEach((violation) => {
                    // eslint-disable-next-line no-console
                    console.log('\x1b[31m', violation);
                  });
                }
                done();
              });
          });
      });
    });
  });
});

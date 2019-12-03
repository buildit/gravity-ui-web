const { AxePuppeteer } = require('axe-puppeteer');
const puppeteer = require('puppeteer');
const { getComponentsNames, getViolations } = require('./_helpers');
const pkgEnvs = require('../build/envs');
const { excludedA11yFiles, excludedA11yRules } = require('../test-consts');

describe('A11y tests', () => {
  const componentNames = getComponentsNames(excludedA11yFiles);
  let browser;
  let page;

  beforeAll(async (done) => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setBypassCSP(true);
    done();
  });

  afterAll(async (done) => {
    await browser.close();
    done();
  });

  componentNames.forEach((component) => {
    describe(`${component} component`, () => {
      it('should have no accessibility violations', (done) => {
        try {
          (async () => {
            await page.goto(`${pkgEnvs.getCurrentEnvInfo().url}/components/preview/${component}`);

            const results = await new AxePuppeteer(page)
              .disableRules(excludedA11yRules)
              .analyze();
            if (results.violations.length > 0) {
              expect(results.violations.length).toBe(0);
              const violations = getViolations(results.violations);
              // eslint-disable-next-line no-console
              console.log('\x1b[34m', `\nURL: ${pkgEnvs.getCurrentEnvInfo().url}/components/preview/${component}`);
              violations.forEach((violation) => {
                // eslint-disable-next-line no-console
                console.log('\x1b[31m', violation.message);
                // eslint-disable-next-line no-console
                violation.nodes.forEach((node) => (console.log('\x1b[37m', `${node.html}\n`)));
              });
            }

            done();
          })();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      });
    });
  });
});

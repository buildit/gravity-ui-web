/**
 * Files to be excluded from the search algorithm that collect
 * all the templates to be tested in the accessibility tets.
 *
 * They are mostly SVG files and templates with no content.
 */

const excludedA11yFiles = [
  '_preview',
  'navigation',
  'symbols',
  'svg-symbols',
  'image',
  'inline-svg-symbol',
  'logotype',
  'logo',
  'wiprodigital',
  'designit',
  'icon',
];

/**
 * Accessibility rules that are being excluded from the components tests.
 * More about axe-core rules in https://dequeuniversity.com/rules/axe/3.4
 */
const excludedA11yRules = [
  'landmark-one-main',
  'page-has-heading-one',
  'bypass',
  'region',
];

module.exports = {
  excludedA11yFiles,
  excludedA11yRules,
};

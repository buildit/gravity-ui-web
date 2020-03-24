module.exports = {
  extends: 'stylelint-config-sass-guidelines',
  plugins: [
    'stylelint-scss',
    'stylelint-order',
  ],
  ignoreFiles: [
    'node_modules',
    'src/sass/_external/**/*',
  ],
  rules: {
    'at-rule-name-case': 'lower',
    'color-named': 'never',
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],
    'declaration-property-value-blacklist': {
      // Disallow explicit color values.
      // People should always use the color system var() or SASS functions/mixins.
      // Note, we don't need to worry about named colors here as the `color-named`
      // rule already takes care of that.
      '/color$/': '/(#[a-f0-9]{3,6}|rgba?\\(.*?\\)|hsla?\\(.*?\\))/',
    },
    indentation: 2,
    'max-empty-lines': 2,
    'max-nesting-depth': 3,
    'media-feature-name-case': 'lower',
    'media-feature-name-value-whitelist': {
      '/width$/': [
        '/^grav-breakpoint\\(.+\\)$/',
        '/^\\$\\w[\\w\\d-]+$/',
      ],
    },
    'no-duplicate-selectors': true,
    'no-empty-first-line': true,
    'no-eol-whitespace': true,
    'no-missing-end-of-source-newline': true,
    'order/properties-alphabetical-order': null,
    'order/order': [
      {
        type: 'at-rule',
        name: 'extend',
      },
      {
        type: 'at-rule',
        name: 'include',
        hasBlock: false,
      },
      'dollar-variables',
      'custom-properties',
      'declarations',
      {
        type: 'at-rule',
        name: 'include',
        hasBlock: true,
      },
      'rules',
    ],
    'order/properties-order': [
      [
        'content',
        'display',
        'flex',
        'flex-wrap',
        'width',
        'min-width',
        'max-width',
        'height',
        'min-height',
        'max-height',
        'position',
        'top',
        'right',
        'bottom',
        'left',
        'margin',
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',
        'padding',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',
        'border',
        'border-width',
        'border-top-width',
        'border-right-width',
        'border-bottom-width',
        'border-left-width',
      ],
      {
        unspecified: 'bottomAlphabetical',
      },
    ],
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'scss/at-extend-no-missing-placeholder': true,
    'scss/at-function-pattern': '^_?grav-\\w+(-[-\\w]+)?$',
    'scss/at-mixin-argumentless-call-parentheses': 'never',
    'scss/at-mixin-pattern': '^_?grav-\\w+(-[-\\w]+)?$',
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/dollar-variable-pattern': [
      '^_?grav-((co|sp|st|tr)-[-\\w]+|\\w\\w\\w+(-[-\\w]+)?)$',
      {
        ignore: 'local',
      },
    ],
    'scss/selector-no-redundant-nesting-selector': true,
    'selector-class-pattern': '^grav-[cou]-[a-z]+((--|-|__)?[a-z]+)*$',
    'selector-combinator-space-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ['attribute'],
      },
    ],
    'unit-blacklist': [
      'px', 'q', 'mm', 'cm', 'in',
    ],
  },
};

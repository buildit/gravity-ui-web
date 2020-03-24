# [3.0.0](https://github.com/buildit/gravity-ui-web/compare/gravity-ui-web-v2.2.4...gravity-ui-web-v3.0.0) (2020-03-24)


### Bug Fixes

* **a11y:** fix article's a11y violation ([743c605](https://github.com/buildit/gravity-ui-web/commit/743c6055e989ff8d4068ca0a363019e025eb9d4f))
* **a11y:** fix card violations ([3f4cba1](https://github.com/buildit/gravity-ui-web/commit/3f4cba14c618c96b8f42f891d21f85164421a3bb)), closes [#375](https://github.com/buildit/gravity-ui-web/issues/375)
* **a11y:** update gravity-particles version ([b864736](https://github.com/buildit/gravity-ui-web/commit/b864736cea44ccf59e3523dc89eab1593303b67f)), closes [#387](https://github.com/buildit/gravity-ui-web/issues/387)
* **basic card list:** changed breakpoint for two column layout ([acbe86d](https://github.com/buildit/gravity-ui-web/commit/acbe86d676e87716c214daee3ffda5bb210ed748))
* **basic card list:** only set required margins ([62cb841](https://github.com/buildit/gravity-ui-web/commit/62cb8410735b36557c0cbe70ba06131a9fb81c3b))
* **basic cards list:** remove whitespace on list sides ([d9e4b2a](https://github.com/buildit/gravity-ui-web/commit/d9e4b2a256de8268eecc95175bd3b6711d204e63))
* **callout:** remove margin from list when in columns ([5d7587d](https://github.com/buildit/gravity-ui-web/commit/5d7587d3f2bb26b30dd488ddaf418cac7332c40e))
* **callout:** tweaks layout ([af320c1](https://github.com/buildit/gravity-ui-web/commit/af320c1d5182fed60ed56893ec551de0395c0bfa))
* **card-basic:** fixes size of picture elements ([e44da69](https://github.com/buildit/gravity-ui-web/commit/e44da690f1685125d25219ca3606c7eb2a700be2))
* **cite:** move cite to inline text ([8d347d3](https://github.com/buildit/gravity-ui-web/commit/8d347d34b919630d1f54126d44dc1737aba092ce))
* **container:** undoes layout regression caused by previous "fix" ([d5c86ad](https://github.com/buildit/gravity-ui-web/commit/d5c86adfd263a1c8aa3f689a6a69aa4d9add86b0))
* **hero:** makes container overlap banner ([aef22c2](https://github.com/buildit/gravity-ui-web/commit/aef22c270ca34f07c511425a9da1ac92a62a8289))
* **layout:** fixes broken container max-width value ([cc4f453](https://github.com/buildit/gravity-ui-web/commit/cc4f4533063d7020b93bdca691b487ad5b7d7012))
* **layouts:** n-column layouts no longer cause horizontal scrolling ([4c18a3c](https://github.com/buildit/gravity-ui-web/commit/4c18a3c75ccd0987e2022ec399b2b090df0f541f))
* **package.json:** web package no longer fails on test ([d8edea6](https://github.com/buildit/gravity-ui-web/commit/d8edea69b3f4198c86d56fb1497aba89e2477fca))
* **pre elements:** ensured pre elements with lots of text can scroll ([f52b60f](https://github.com/buildit/gravity-ui-web/commit/f52b60f594e5976c215cc7731cd3c49436fc2b2c))
* **related items:** used breakpoint code from typography changes ([0bbddb1](https://github.com/buildit/gravity-ui-web/commit/0bbddb181f867b0a1ed106ee4e3908ac5da81f9d))
* **spacing:** added incomplete xxl spacing unit ([4c3295b](https://github.com/buildit/gravity-ui-web/commit/4c3295b5a5cd05ee3870daf9ee7b0ca4abaeee70))
* **svg symbols:** fixes missing title IDs ([256a828](https://github.com/buildit/gravity-ui-web/commit/256a8281d1614dbcebceb8f204734cbc670fab32)), closes [#369](https://github.com/buildit/gravity-ui-web/issues/369)
* **typography:** fixes text scaling behaviour ([6ee3f92](https://github.com/buildit/gravity-ui-web/commit/6ee3f922ec27e128f4bb9baa11e22f3fcae04222))


### Code Refactoring

* removed job list component ([b1a972f](https://github.com/buildit/gravity-ui-web/commit/b1a972f2a3867a5fb3b5be267d5d316ab2e02081))
* **column layout:** refactored layouts to use new column layout ([c3bcfe8](https://github.com/buildit/gravity-ui-web/commit/c3bcfe8c3f84d28192587c2fbf6661148ba7658b))
* removes clear() SASS mixin ([6df5c7f](https://github.com/buildit/gravity-ui-web/commit/6df5c7f2692f7892dfd134cd4d71e8144b305e83))
* removes list-image-links and logo-image components ([274cf6e](https://github.com/buildit/gravity-ui-web/commit/274cf6e6765453c14a6029df66388973d95caf6d)), closes [#275](https://github.com/buildit/gravity-ui-web/issues/275)
* removes redundant `grav-o-section` class ([027782c](https://github.com/buildit/gravity-ui-web/commit/027782cf5cb801cde27981a846c82ec3cef2059c))


### Features

* **3 column class list:** add 3 column class ([58d1294](https://github.com/buildit/gravity-ui-web/commit/58d129456383ab7d2ca97e4217fd314dbdf7bbd4))
* **3col-list-justified:** new 3 column list with justified text ([0d345df](https://github.com/buildit/gravity-ui-web/commit/0d345df1e7c91766c96e99a4b17696ad9eef8080))
* **a11y:** add a11y tests to Travis CI ([85778f2](https://github.com/buildit/gravity-ui-web/commit/85778f2dc521ba8afb4695db1c158ec90e413c06))
* **articles:** new related items component ([4735694](https://github.com/buildit/gravity-ui-web/commit/4735694cd2ca135548b4296b9052beff915b1f8e))
* **basic card:** added hover colour and svg icon treatment ([cbe7ed6](https://github.com/buildit/gravity-ui-web/commit/cbe7ed61278d565bc16ad69d5c480c8b4247dc42))
* **basic card:** adjusted font size for copy section ([3072504](https://github.com/buildit/gravity-ui-web/commit/307250459160c25b35598821901b96f48c5f31df))
* **basic card component:** add notch to image when card is a link ([149e539](https://github.com/buildit/gravity-ui-web/commit/149e539df12f4bfea5ff86907e4d38557e1ab8e3))
* **basic card component:** added basic card component ([a183257](https://github.com/buildit/gravity-ui-web/commit/a183257d17642d896ef315a29c50315c379fcfc7))
* **basic cards list:** ensured top margin is applied consistently ([e179a88](https://github.com/buildit/gravity-ui-web/commit/e179a8880ceb63e918124763bebb98a5e5f0e7f2)), closes [#174](https://github.com/buildit/gravity-ui-web/issues/174)
* **callout:** new callout organism component ([c8a23db](https://github.com/buildit/gravity-ui-web/commit/c8a23dbfac75a9d11870015d31a56cb03ae87f98))
* **colors:** adds dark-mode support to color system ([5d07454](https://github.com/buildit/gravity-ui-web/commit/5d07454c7362b8579cc8ebad8d7d689ee8bc1951))
* **colors:** adds SASS vars for Wipro brand colors ([434663e](https://github.com/buildit/gravity-ui-web/commit/434663e0de43de2cd205c54d04b3c5fcd1cede48))
* **colors:** updates mark element styling to use Gravity's color system ([d8d1d40](https://github.com/buildit/gravity-ui-web/commit/d8d1d409016b8d29c2b3b14e681900f5c3bd85f0))
* **colors:** updates to latest Gravity particles color schemes ([db8e888](https://github.com/buildit/gravity-ui-web/commit/db8e8889f48c67c1c83a6bdf0a5e9a3aea470252))
* **column layout:** adds mixin for full-width items ([da9506c](https://github.com/buildit/gravity-ui-web/commit/da9506c517394916247544429be3773a3a28784b))
* **debug.css:** adds warning about invisible first-children ([3ea62ae](https://github.com/buildit/gravity-ui-web/commit/3ea62ae9c0c113f3f004485bdba90f0f22883439)), closes [#200](https://github.com/buildit/gravity-ui-web/issues/200)
* **eslint:** moved eslint settings to a shareable config ([51339e2](https://github.com/buildit/gravity-ui-web/commit/51339e23792ae7b62e70614dafb32ab65cf490d3))
* **hero:** new hero component ([32c6870](https://github.com/buildit/gravity-ui-web/commit/32c687031b36ce16f9bad0a04a7dbeb24f83ef7e))
* **layout:** adds list reset mixin and classes ([7335c63](https://github.com/buildit/gravity-ui-web/commit/7335c6334f30ede9265570f85eed43a40fa5b7e6))
* **layout:** adds sticky-footer mixin and object class ([4dcefe1](https://github.com/buildit/gravity-ui-web/commit/4dcefe18181e948adeebe6f24375db0daadfa200))
* **layout:** makes full-bleed page layout opt-in ([a807722](https://github.com/buildit/gravity-ui-web/commit/a80772279da8fe99a75e94483d9450dddb4cfc1c))
* **layout:** makes sticky footer default configurable ([f7276b3](https://github.com/buildit/gravity-ui-web/commit/f7276b3f8bea7e953efb24940d6a1bf98e771f58))
* **layout:** standardises gap after page header ([c55d85c](https://github.com/buildit/gravity-ui-web/commit/c55d85c78cb8002209508e3ca999f2cef8edfd29))
* **links:** adjusts styling of link components ([4b36fca](https://github.com/buildit/gravity-ui-web/commit/4b36fca2e470c424e583acb372f03c61b2e3f075))
* **linting:** updates stylelint rules ([f126ab2](https://github.com/buildit/gravity-ui-web/commit/f126ab28290f7de34927f87e31745947868c910a)), closes [#245](https://github.com/buildit/gravity-ui-web/issues/245)
* adds margin utility classes ([f8c4b9c](https://github.com/buildit/gravity-ui-web/commit/f8c4b9caa45535df74be4cabc50f52de930343d9))
* **logotype:** changes SVG colouring and adds new logotype component ([7a2728f](https://github.com/buildit/gravity-ui-web/commit/7a2728fccc4920e583c9ad886e72432d4581fc11))
* **typography:** implements fluid modular scale ([c122fbf](https://github.com/buildit/gravity-ui-web/commit/c122fbfcb4e082e9ef9b341fcf796d88c293b813))
* adds optional classes for page header and footer ([e481709](https://github.com/buildit/gravity-ui-web/commit/e481709d3e05253a59653637a8d93fa9b6ac8c74)), closes [#280](https://github.com/buildit/gravity-ui-web/issues/280)
* **ostentatious copy:** added ostentatious copy component ([9c3d60c](https://github.com/buildit/gravity-ui-web/commit/9c3d60c1dd888085741c05384f354a07165679c9))
* **page heading:** added page heading component ([b75fca9](https://github.com/buildit/gravity-ui-web/commit/b75fca94cc7af1f73de39820a1202de65849d6c3))
* **page-footer:** adds smart border to top of footer ([ff2e5ab](https://github.com/buildit/gravity-ui-web/commit/ff2e5ab28304f72e6e7f9de315c67ccabd14d45e))
* **spacing settings, new padding utils:** adds padding util classes ([9cb0e94](https://github.com/buildit/gravity-ui-web/commit/9cb0e94f699e9ce160470b64d9d3ad2319d2c2f5))
* **svg:** improves colouring of inlined SVGs ([e04da74](https://github.com/buildit/gravity-ui-web/commit/e04da7417f113cb93e6a51169a9194d29ca8219c))
* **svg:** replaces old SVG symbols with ones from gravity-particles ([49eb3b4](https://github.com/buildit/gravity-ui-web/commit/49eb3b42eca08e388434b9a3f03ee2771581756c))
* **transitions:** added transition mixin and updated throughout ([0d0da87](https://github.com/buildit/gravity-ui-web/commit/0d0da87864a57c1569f79ba3b8889479569ab731))
* **two column list:** added simple two column list component ([77e41eb](https://github.com/buildit/gravity-ui-web/commit/77e41eb8a73cf4562b86b29fd9b5c4a9ea33cfc5))
* **typography:** changes fonts to Wipro Akkurat TT family ([9fca955](https://github.com/buildit/gravity-ui-web/commit/9fca955788eb8cfb4b7a8a1430676263b0214f6f))
* adds SASS mixins for smart borders ([603ff6c](https://github.com/buildit/gravity-ui-web/commit/603ff6ce2113fcd8f1961e248b9cdeefd2168ebf))
* bundles external SASS libs ([bb07594](https://github.com/buildit/gravity-ui-web/commit/bb07594779d251a1373d922add0447827125fb4b))
* improves picture element layout ([31bd6bc](https://github.com/buildit/gravity-ui-web/commit/31bd6bc750ea131d534d2ed5ff1906d1afb74f58))
* splits templates & PL setup into own NPM package ([949ca01](https://github.com/buildit/gravity-ui-web/commit/949ca01781ef8c4f89e2c574e3c1ab9cddc269b5)), closes [#241](https://github.com/buildit/gravity-ui-web/issues/241)


### BREAKING CHANGES

* **logotype:** Page header and footer components should now use grav-c-logotype class on logotype SVG.
* **typography:** - The 'secondary' entry has been removed from Gravy's typefaces config. Any references to the
'secondary' typeface should therefore be replace with 'primary' instead.
- All fonts have changed, so the visual appearance will be different. You should probably visually
inspect your layouts to ensure nothing has broken.
* **svg:** All symbol IDs have changed. The social media, "hollow b", Designit and Wipro Digital logos have
been removed.
* **layout:** grav-l-column-list mixin and grav-o-column-list class have been removed. Use grav-reset-list and
grav-o-reset-list instead.
* `grav-o-section` class is no longer available. Consider altering your designs or using the padding
utility classes instead.
* **layout:** - `<body>` now has horizontal margins, vertical padding and max-width by default. Add the `grav-o-full-bleed` class to it to restore the old behaviour.
- `.grav-o-container` class has been removed. Use `.grav-o-full-bleed__content` class instead (within a container that has the `.grav-o-full-bleed__content` class on it).
* **svg:** grav-c-icon class has been removed. Inlined SVGs now automatically get filled with the currentColor.
* **column layout:** removed `two-column-text` and `two-column-block` components
* Job List component has been removed
* The styles for the \`.grav-c-list-image-links\` and \`.grav-c-logo-image\` classes no longer exist.
* **typography:** Gravy and normaliz-scss libs have been removed, so all associated functions and mixins are no longer
available
* The clear() SASS mixin has been removed. Replace any usage of it with your own CSS clearfix.

## [2.2.4](https://github.com/buildit/gravity-ui-web/compare/gravity-ui-web-v2.2.3...gravity-ui-web-v2.2.4) (2020-01-08)


### Bug Fixes

* **package:** explicitly states compatibility with newer NodeJS versions ([c683497](https://github.com/buildit/gravity-ui-web/commit/c6834974284ea475b25bc9f3b611b4163aac4dd7))

## [2.2.3](https://github.com/buildit/gravity-ui-web/compare/gravity-ui-web-v2.2.2...gravity-ui-web-v2.2.3) (2019-08-30)


### Bug Fixes

* removes left padding from specialised lists ([b83b1bc](https://github.com/buildit/gravity-ui-web/commit/b83b1bc))

## [2.2.2](https://github.com/buildit/gravity-ui-web/compare/gravity-ui-web-v2.2.1...gravity-ui-web-v2.2.2) (2019-06-21)


### Bug Fixes

* undoes layout regression caused by previous "fix" ([c5564ea](https://github.com/buildit/gravity-ui-web/commit/c5564ea))

## [2.2.1](https://github.com/buildit/gravity-ui-web/compare/gravity-ui-web-v2.2.0...gravity-ui-web-v2.2.1) (2019-06-19)


### Bug Fixes

* adds missing width property to grav-l-container() mixin ([bab1f9a](https://github.com/buildit/gravity-ui-web/commit/bab1f9a))

# [2.2.0](https://github.com/buildit/gravity-ui-web/compare/gravity-ui-web-v2.1.1...gravity-ui-web-v2.2.0) (2019-04-26)


### Bug Fixes

* **travis:** pointed AWS paths to the correct location ([a42243f](https://github.com/buildit/gravity-ui-web/commit/a42243f))


### Features

* **commitizen:** new commitizen lerna flavored setup ([ec298b3](https://github.com/buildit/gravity-ui-web/commit/ec298b3))

## [2.1.1](https://github.com/buildit/gravity-ui-web/compare/v2.1.0...v2.1.1) (2019-04-23)


### Bug Fixes

* **.travis.yml:** cdn publish script now gets called correctly ([598b974](https://github.com/buildit/gravity-ui-web/commit/598b974))

# [2.1.0](https://github.com/buildit/gravity-ui-web/compare/v2.0.0...v2.1.0) (2019-04-23)


### Bug Fixes

* **deployment:** make PR requested changes ([ecaa546](https://github.com/buildit/gravity-ui-web/commit/ecaa546)), closes [#191](https://github.com/buildit/gravity-ui-web/issues/191)


### Features

* **deployment:** add cdn publishing ([67c43ff](https://github.com/buildit/gravity-ui-web/commit/67c43ff)), closes [#191](https://github.com/buildit/gravity-ui-web/issues/191)

# [2.0.0](https://github.com/buildit/gravity-ui-web/compare/v1.0.1...v2.0.0) (2019-04-18)


### Bug Fixes

* **page-header:** fixes linter issues ([48be1ce](https://github.com/buildit/gravity-ui-web/commit/48be1ce))
* add invertable state to images ([e47b265](https://github.com/buildit/gravity-ui-web/commit/e47b265))
* update package.json from develop ([5b23432](https://github.com/buildit/gravity-ui-web/commit/5b23432))


### Features

* dark mode ([aec230b](https://github.com/buildit/gravity-ui-web/commit/aec230b))


### BREAKING CHANGES

* it could all go horribly wrong

## [1.0.1](https://github.com/buildit/gravity-ui-web/compare/v1.0.0...v1.0.1) (2019-04-08)


### Bug Fixes

* adjust position of outline when logo is focused ([2b182c5](https://github.com/buildit/gravity-ui-web/commit/2b182c5)), closes [#211](https://github.com/buildit/gravity-ui-web/issues/211)
* **.travis.yml:** post Travis CI notifications to #buildit-gravity ([4706d82](https://github.com/buildit/gravity-ui-web/commit/4706d82))

# [1.0.0](https://github.com/buildit/gravity-ui-web/compare/v0.12.1...v1.0.0) (2019-04-04)


### Bug Fixes

* **lists:** fixes list layout ([89194b6](https://github.com/buildit/gravity-ui-web/commit/89194b6)), closes [#173](https://github.com/buildit/gravity-ui-web/issues/173)
* **pattern-library:** miscellaneous fixes for the Nunjucks conversion ([1907a9c](https://github.com/buildit/gravity-ui-web/commit/1907a9c))
* **sass:** removed redundant `.grav-c-icon-toggle-button` class ([d545e61](https://github.com/buildit/gravity-ui-web/commit/d545e61))
* pin eyeglass to 2.2.1 ([efa74bb](https://github.com/buildit/gravity-ui-web/commit/efa74bb))


### Code Refactoring

* renames package and repo references to gravity-ui-web ([25fb2b8](https://github.com/buildit/gravity-ui-web/commit/25fb2b8)), closes [#201](https://github.com/buildit/gravity-ui-web/issues/201)


### Features

* added scss files so each itcss layer can be imported individually ([c8e9f61](https://github.com/buildit/gravity-ui-web/commit/c8e9f61)), closes [#189](https://github.com/buildit/gravity-ui-web/issues/189)
* **build-api:** new, cleaner build-api ([f935362](https://github.com/buildit/gravity-ui-web/commit/f935362)), closes [#189](https://github.com/buildit/gravity-ui-web/issues/189)
* **pattern-library:** switched from Mustache to Nunjucks templates ([f67fe96](https://github.com/buildit/gravity-ui-web/commit/f67fe96))


### BREAKING CHANGES

* NPM package has been renamed from `@buildit/gravity-ui-sass` to
`@buildit/gravity-ui-web`.
* **build-api:** The build API is no longer the package's main entry point. You need to
`require('@buildit/gravity-ui-sass/build-api')` now. The available keys have also changed.

## [0.12.1](https://github.com/buildit/gravity-ui-web/compare/v0.12.0...v0.12.1) (2019-03-05)


### Bug Fixes

* **releases:** releases now always trigger on master instead of by tag ([0f2e23f](https://github.com/buildit/gravity-ui-web/commit/0f2e23f))

# [0.12.0](https://github.com/buildit/gravity-ui-web/compare/v0.11.1...v0.12.0) (2019-03-05)


### Features

* **package.json:** added support for Semantic Release ([4292a3a](https://github.com/buildit/gravity-ui-web/commit/4292a3a))

# Changelog
All notable changes to the [`gravity-ui-web` project](./README.md) will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [Unreleased]
### Changed
- Updated various dependencies
- Travis PR builds will no longer notify our internal Slack channel

### Removed
- BREAKING: Removed `.grav-c-icon-toggle-button` class. Use `.grav-c-icon-button` together with `aria-pressed` instead.

### Fixed
- Typo in docs


## [0.11.1] - 2018-11-28
### Added
- Contributing instructions and issue templates

### Changed
- Made SVG icon titles more consistent
- Migrated style guide build to use Pattern Lab 3
- Updated various dependencies
- Travis build now uses Node version specified in .nvmrc


## [0.11.0] - 2018-10-24
### Added
- Mobile nav show/hide transition
- Adding husky with precommit hook
- `debug.css` for visually flagging mark-up problems
- Updated dependencies (via Greenkeeper)

### Changed
- Increased font size of mobile nav
- Separated toggle-menu button from nav-menu in pattern library
- BREAKING: Renamed `logo-main` class to `grav-c-page-header__logo` to meet new linting rules

### Fixed
- Security issue in `hoek` dependency (issue #115)
- Nested `.grav-o-container` instances

### Removed
- BREAKING: Button, secondary and disabled CTA variants have been removed. The `grav-c-cta` class can only be used with anchor links now.


## [0.10.0] - 2018-05-23
### Changed
- Increased size and spacing of burger menu strokes
- Made all page headers transparent
- Names for colour palettes
- Stylelint rules now enforce Gravity's class and variable naming conventions
- Breaking change: `grav-c-block-link` has now been renamed to `grav-c-nav-link`

### Fixed
- Changelog formatting errors
- Fixed spurious info output in terminal by moving all list patterns under `molecules/lists`
- Removed unnecessary universal selector inside hero component, which caused layout issues in IE
- Fixed SVGs rendering at the wrong size in IE
- Added a max width to the logo so there's more space for the primary nav
- Primary nav will now wrap underneath the logo if there's not enough space for it
- Updated versions of some dependencies to resolve security audit warnings

### Removed
- dark background default in `block-link`
- dark background default in `toggle-menu`
- `page-header~light` .json file
- `page-header` .json file
- `dark-background` class


## [0.9.1] - 2018-05-03
### Added
- Pull request template for GitHub

### Changed
- Removed vertical margins from `grav-c-two-columns-text`
- Page-header now supports wrapping the logo in an `<h1>` instead of an `<a>`
- Blue gradient bg with white text removed from hero and replaced with dirty snow white bg with default body text colour

### Fixed
- List items now have margins between one another when they are wrapped in `list-inline-row`
- Headings splitting over into seperate lines in `job-list`
- Navigation bar being cropped in Firefox & Edge when viewport was scaled down


## [0.9.0] - 2018-04-27
### Added
- Github link in page footers
- Page header title now has a hover state across all pages

### Changed
- Page header no longer uses `role="banner"`
- Page footer no longer uses `role="contentinfo"`
- `a[href]` has new contrast appropriate active state text colour in `inline-text`. Set to override visited state.

### Removed
- unecessary background for `<a>` element in active state 

### Fixed
- Display of social media icons in style guide
- `<a>` elements now are no longer smaller than their child elements in `list-inline-row` by being set to inline-block.
- Missing page margins in IE11


## [0.8.0] - 2018-04-25
### Added
- Hollow version of Buildit logo
- Github icon
- SVG symbols now have IDs on their `<title>` elements
- New utility class `grav-u-max-word-count-m`. Useful to limit `p` max width for better readability

### Changed
- Buildit logo has been updated to new design
- Inline SVG component now uses `aria-labelledby` to reference SVG symbol's title
- Updated `favicon.ico` to new Buildit icon.
- BREAKING: Renamed social media SVG IDs to `icon-*`
- Inverted font-weight on `block-link`, now bold is used for the active link

### Fixed
- Toggle buttons (incl. hamburger menu button) now work in IE11
- Header now has normal height in IE11 on small screens
- SVG validation errors


## [0.7.0] - 2018-04-19
### Added
- `.grav-o-container-banner` CSS class & component.
- `extra-large` breakpoint.

### Changed
- Travis build now uses `npm ci` instead of `npm install`
- BREAKING: Image links component no longer comes with grey background
- Updated NPM dependencies to latest versions.

### Fixed
- Edge and IE11 were pushing hamburger icon downwards
- Added margin between logo and navlinks in header
- Hero text is placed above canvas
- 2 column block layout (as used in location page template) is flush with outer edges


## [0.6.1] - 2018-04-13
### Fixed
- In the job-listing component, location names and job ads are now baseline aligned
- Text in navigation block-links no longer wraps
- Improved header layout on small viewports
- Visited footer links are no longer blue


## [0.6.0] - 2018-04-10
### Added
- Sticky footer
- Image list component for showcasing company logos

### Changed
- Copy changes to about and careers pages
- Styling of hero component

### Fixed
- Stylelint issues


## [0.5.0] - 2018-04-05
### Changed
- Replaced old location page template with alternative one
  - BREAKING: `grav-c-list-two-columns` renamed to `grav-c-two-columns-text`
  - BREAKING: Markup and appearance of `grav-c-location-card` changed
- Updated hero component to contains canvas element
  - BREAKING: Markup and appearance of `grav-c-hero` changed
- Buiildit logo and favicon images

### Removed
- Old location page template
  - BREAKING: Removed `grav-o-locations-layout` class
  - BREAKING: Removed `grav-o-locations-layout-alt` class


## [0.4.0] - 2018-03-29
### Added
- Animated nav toggle button

### Changed
- Miscellaneous copy changes, based on feedback from user testing

### Fixed
- Travis build script
- Layout and links on basic and error page templates
- Eyeglass SASS support


## [0.3.0] - 2018-03-23
### Added
- Page header
- Page footer
- Careers page
- Location page
- About page
- New Buildit Logo
- Wipro Digital Logo
- Designit Logo
- CTA button
- Homepage
- Error page template
- Alternate Location page
- Social media icons and links

### Changed
- Improved typography
- Sassified pattern-scaffolding

### Fixed
- Pipeline tweaks
- Fixed color swatches on small screens


## [0.2.1] - 2018-01-25
### Added
- Basic developer and branching strategy docs

### Changed
- Colour particles in style guide now display a11y info

### Fixed
- Pre-compiled CSS is now correctly included in published NPM package


## [0.2.0] - 2018-01-19
### Added
- NVM config
- Basic font styles
- Normalize and modularscale SASS libs
- `gravity-ui-web` is now an [SASS Eyeglass](https://github.com/sass-eyeglass/eyeglass) module
- Package now exposes paths to CSS and SASS to cosnumers via its main entry point (`index.js`)

### Changed
- Improved Stylelint config
- Split gulpfile.js into modules


## [0.1.0] - 2018-01-16
### Added
- Initial SASS scaffolding
- Initial README, CHANGELOG, etc. docs
- [Stylelint](https://stylelint.io/) rules
- Gulp setup for running SASS compilation and [Pattern Lab](http://patternlab.io/)
- Initial set of UI patterns for Pattern Lab
- Initial [Gravy](https://github.com/buildit/gravy) integration

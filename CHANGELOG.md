# Changelog
All notable changes to the [`gravity-ui-sass` project](./README.md) will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [Unreleased]
### Fixed
- Removed unnecessary universal selector inside hero component, which caused layout issues in IE


## [0.9.1] - 2018-05-03
### Added
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

### Fixed
- Display of social media icons in style guide
- `<a>` elements now are no longer smaller than their child elements in `list-inline-row` by being set to inline-block.
- Missing page margins in IE11

### Removed
- unecessary background for `<a>` element in active state 


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


## [0.5.0] - 2018-04-05
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


## [0.4.0] - 2018-03-29
### Added
- Animated nav toggle button

### Changed
- Miscellaneous copy changes, based on feedback from user testing

### Fixed
- Travis build script
- Layout and links on basic and error page templates
- Eyeglass SASS support


## [0.3.0] - 2018-03-23
### Added
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

### Changed
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
- `gravity-ui-sass` is now an [SASS Eyeglass](https://github.com/sass-eyeglass/eyeglass) module
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

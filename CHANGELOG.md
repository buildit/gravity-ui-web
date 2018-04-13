# Changelog
All notable changes to the [`gravity-ui-sass` project](./README.md) will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [Unreleased]


## [0.6.1] - 2018-04-13

### Fixed
- In the job-listing component, location names and job ads are now baseline aligned
- Text in navigation block-links no longer wraps
- Improved header layout on small viewports
- Visited footer links are no longer blue


## [0.6.0] - 2018-04-10

### Changed
- Copy changes to about and careers pages
- Styling of hero component

### Added
- Sticky footer
- Image list component for showcasing company logos

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

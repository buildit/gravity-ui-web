## Purpose

This is the main Page Header that sits above every page. It contains the company logo and main site navigation.

Ideally, the Page Header is a `<header>` element that is a _direct_ child of `<body>`, in which case no class is necessary. For compatibility with frameworks or CMSes where you cannot add the page header as a direct child of `<body>`, you may use `<header class="grav-c-page-header">` instead.

When using this component, make sure the following advice is followed:

* The Page Header **must** be a descendent of `<body>` that is not nested with another [sectioning element](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines#Section_Elements_in_HTML5). This is so that it had an implict ARIA landmark role of `banner`.
* There **must** only be 1 instance of a Page Header on a page

### Home variant

This is a variation of the main Page Header component, where the Buildit logo is marked up as the level 1 heading of the page, rather than being a link. This intended for the use exclusively on the homepage of a website, because:

* It is redundant for a page to link to itself (on other pages, the logo typically links to the homepage)
* The "buildit @ wipro digital" title text of the logo SVG is a suitable H1 heading text for the homepage

## See also

* [Default landmark roles for HTML5 sectioning elements](https://www.w3.org/TR/wai-aria-practices/examples/landmarks/HTML5.html)

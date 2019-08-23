## Purpose

This is the main Page Footer that sits below every page. It contains some additional links to privacy, accessibility statements and some additional useful information.

Ideally, the Page Footer is a `<footer>` element that is a _direct_ child of `<body>`, in which case no class is necessary. For compatibility with frameworks or CMSes where you cannot add the page footer as a direct child of `<body>`, you may use `<footer class="grav-c-page-footer">` instead.

When using this component, make sure the following advice is followed:

* The Page Footer **must**_** be a descendent of `<body>` that is not nested with another [sectioning element](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines#Section_Elements_in_HTML5). This is so that it had an implict ARIA landmark role of `contentinfo`.
* There **must** only be 1 instance of a Page Footer on a page


## See also

* [Default landmark roles for HTML5 sectioning elements](https://www.w3.org/TR/wai-aria-practices/examples/landmarks/HTML5.html)
* [W3C ARIA Landmarks Example](https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/landmarks/contentinfo.html)

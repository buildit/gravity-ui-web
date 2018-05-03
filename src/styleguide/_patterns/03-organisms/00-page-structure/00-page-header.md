## Purpose

This is the main Page Header that sits above every page. It contains the company logo and main site navigation.

When using this component, make sure the following restrictions are enforced:

* The Page Header _must_ be a direct child of `<body>`
* The Page Header _should_ be the first component on the page
* There **must** only be 1 instance of a Page Header on a page

The Page Header is identified by being the only `<header>` element that is a direct child of `<body>` (which has an implict ARIA role of `banner`). Adding a class name to the Page Header component would be redundant.

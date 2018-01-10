## Purpose

Level 1 headings (`<h1>`) represent the main heading of a page or section.

Prior to HTML5, the logical outline of a page's contents was based purely on the 6 heading levels `<h1>` - `<h6>`. It was therefore customary to only have a single `<h1>` on the page to represent the page's title (and often the heading text would match that of the `<title>` element as well).

HTML5 introduced [sectioning elements](https://html.spec.whatwg.org/multipage/dom.html#sectioning-content-2) and the [outline algorithm](https://html.spec.whatwg.org/multipage/semantics.html#outlines) which means you could technically have many `<h1>`s on a page (or unusual-looking jumps in heading level) and use sectioning elements structure them into a sensible outline. However, to date none of the main web browsers support the outline algorithm in any meaningful way.

For this reason and better compatibility with pre-HTML5 browsers, bots and tools it makes sense to continue relying on the 6 heading levels to express your page's outline, even if you are making use of the sectioning elements. This advice is also echoed in the [HTML5 spec's "Headings and sections" chapter](https://html.spec.whatwg.org/multipage/semantics.html#headings-and-sections).


## Best practice

* Have one level 1 heading per page, containing the page's title


## See also

* [WHATWG HTML5 specification for `<h1>` - `<h6>`](https://html.spec.whatwg.org/multipage/semantics.html#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements)

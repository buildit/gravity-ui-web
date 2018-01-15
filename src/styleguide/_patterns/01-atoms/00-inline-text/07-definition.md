## Purpose

The `<dfn>` element represents the defining instance of a term.

The paragraph, description list group, or section that is the nearest ancestor of the `<dfn>` element must also contain the definition(s) for the term given by the `<dfn>` element.

The exact text that is being defined is determined as follows:

1. If the `<dfn>` element has a `title` attribute, then the term is the value of that attribute.
1. Else, if it contains only an `<abbr>` element with a `title` attribute, then the term is the value of that attribute.
1. Otherwise, the text content of the `<dfn>` element is the term being defined.


## Examples

In the example below, "Semantics" is the term being defined by the contents of the enclosing paragraph:

```html
<p>
  <dfn>Semantics</dfn>:
  The branch of linguistics and logic concerned with meaning.
  The two main areas are logical semantics, concerned with matters
  such as sense and reference and presupposition and implication,
  and lexical semantics, concerned with the analysis of word
  meanings and relations between them.
</p>
```

In the following example, it is "Three Letter Acronym" (i.e. the value of the `<abbr>`'s `title` attribute) and _not_ "TLA" that is being defined:

```html
<p>
  <dfn><abbr title="Three Letter Acronym">TLA</abbr></dfn>:
  Is an abbreviation, specifically an acronym, alphabetism, or
  initialism, consisting of three letters.
</p>
```


## See also

* [WHATWG HTML5 specification for `<dfn>`](https://html.spec.whatwg.org/multipage/semantics.html#the-dfn-element)
* [MDN page on the `<dfn>` element](https://developer.mozilla.org/en/docs/Web/HTML/Element/dfn)
* [Usage examples on Quackit](http://www.quackit.com/html_5/tags/html_dfn_tag.cfm)

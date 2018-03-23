## Purpose

Hyperlinks (`<a>` - short for "hypertext **anchor**"), create clickable links to other URLs. They are labelled by their content which is usually text.

It is also possible to create a placeholder link by omitting the `href` attribute. These are useful to indicate text that would normally be a clickable link if it had been relevant. A typical use for this is a website's main navigation menu - the item that corresponds to the current page can be represented by a placeholder to avoid the page linking to itself.


## Best practice

### Do _not_ make links that automatically open in a new window / tab

Links that open new windows or tabs without warning (e.g. by using the `target="_blank"` attribute) are **bad for usability**, as takes away control from the user. Furthermore, if they don't notice that a link opened in a new tab / window, it can appear to break the back button which will confuse and frustrate users. Finally, if not used together with `rel="noopener noreferrer"`, such links additionally pose a **security risk _and_ performace problem**! In short, just _don't do it_!

  * Smashing Magazine article "[Should links open in new windows?](https://www.smashingmagazine.com/2008/07/should-links-open-in-new-windows/)"
  * Jakob Nielsen's "[Top 10 Mistakes in Web Design](https://www.nngroup.com/articles/top-10-mistakes-web-design/)"
  * Sonarwhal's [`disown-opener` rule](https://sonarwhal.com/docs/user-guide/rules/disown-opener/) explains the potential security and performance risks


### Always use descriptive link text

The text of a link provides a valuable clue to users about what to expect when they click it. Link text may also be presented to users out of context (screen readers often have a facility to read out a list of links on a page), so ensuring that it is meaningful aids accessibility. Finally, [good link text can benefit SEO performance](https://moz.com/learn/seo/anchor-text) as well.

You should therefore avoid meaningless link text like "Click here", "On the next page", etc.

* **GOOD**: "The Nielsen Norman Group published a great [article about writing links](https://www.nngroup.com/articles/writing-links/)."
* **BAD**: "he Nielsen Norman Group published a great article about writing links. [Click here](https://www.nngroup.com/articles/writing-links/) to read it."

Further reading:

* "[Writing Hyperlinks: Salient, Descriptive, Start with Keyword](https://www.nngroup.com/articles/writing-links/)" by Nielsen Norman Group
* "[Writing good link text](https://www.nomensa.com/blog/2011/writing-good-link-text)" by Nomensa



## See also

* [WHATWG HTML5 specification for `<a>`](https://html.spec.whatwg.org/multipage/semantics.html#the-a-element)

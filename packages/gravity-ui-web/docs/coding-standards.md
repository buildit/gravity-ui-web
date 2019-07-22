# Coding standards

All code contributions are expected to adhere to these conventions. Where possible, we check and enforce these via linting tools. Code reviewers should also check that pull requests follow these standards.

<!--
  Tip: If using VSCode, get the "Auto Markdown TOC" extension by
  Hunter Tran to automatically update this table of contents.
  https://github.com/huntertran/markdown-toc
-->
<!-- TOC depthFrom:2 -->

- [File formatting](#file-formatting)
- [File names](#file-names)
- [HTML](#html)
- [SASS / CSS](#sass--css)
    - [General](#general)
    - [Declaration and property ordering](#declaration-and-property-ordering)
    - [Selectors](#selectors)
        - [Class names](#class-names)
        - [Further reading](#further-reading)
    - [SASS variables, functions and mixins](#sass-variables-functions-and-mixins)
    - [Media queries](#media-queries)
- [JavaScript](#javascript)
    - [Browser JS](#browser-js)
    - [Node.js build scripts](#nodejs-build-scripts)

<!-- /TOC -->

## File formatting
All our source files must:

* Use UNIX-style line endings (i.e. `\n`).
* Indentation using 2 space characters.
* Be UTF-8 encoded.
* Have a blank line at the end.

Note, we have an [`.editorconfig` file](https://editorconfig.org/) in the root of this repository. Most IDEs support this and will therefore apply the above rules automatically.

## File names
Source files should have lowercase, kebab-case filenames.

```
# Bad
CamelCaseFile.foo
SNAKE_CASE_FILE.bar

# Good
kebab-case-file.baz
```


## HTML
Any HTML code must:

* Be valid. I.e., it should pass the [W3C HTML validator](https://validator.w3.org/nu/) with no errors or warnings.
* Use lowercase element and attribute names.
* Be semantic.
    * Use HTML for what it _means_, not how it happens to look by default. This is especially true for headings - use `<h1>` - `<h6>` to outline your page, not to display text in a certain size. (We have `.grav-u-text-size-*` utility classes for that purpose)
    * While there are perfectly valid reasons for using `<div>` and `<span>`, they should generally be your last resort. Always consider if there is a more meaningful element you can use first.
* Be shallow.
    * Try to express your intent with the fewest elements and avoid the temptation of adding lots of wrapper elements - especially if they're just hooks for styling purposes. Usually, some clever CSS (perhaps with the odd pseudo element) will let you achieve the desired styling or layout without needing to bloat the HTML.
    * This makes the HTML (and the rendered DOM in your browser's dev tools) easier to read and navigate
    * In complex UIs it may also reduce the memory and processing overheads. The fewer DOM nodes there are, the quicker they can be traversed.


## SASS / CSS
### General
We use SASS (specifically, the SCSS syntax) to author our CSS. Most of the following rules would apply even if you were writing plain CSS, but some are SASS-specific:

* Don't use vendor prefixes.
    * We may use a CSS post-processor to add some automatically for better compatibility with old browsers, so it is redundant to add them manually in the source code.
* Prefer to inherit styles from the cascade over explicitly setting them.
    * We intentionally lean on the cascade as this can lead to more succinct CSS code and make it easier for us to apply far-reaching global style changes.
    * As a rule of thumb, write your HTML first. See how it looks without any additional CSS and then selectively add or override only the properties you need to.
    * Browser dev tools can be helpful here as they let you quickly identify redundant overrides.
* Use only relative length units
    * `px` values are forbidden. Font sizes, spacing and dimensions should be set using relative units like `em`, `rem` or `%`. Note, that often times [components should _not_ be setting explicit widths or heights on themselves anyway](./layout-and-grid.md#per-component-rules). As much as possible, we want to allow their default behaviour of growing to fill their parent's width and to accommodate their contents.
    * Using `em` and `rem` for text and media queries also means that our entire UI layout can scale up or down and responsively adapt based on the user's default text size preference.
* Avoid hard-coded values
    * Global SASS variables (based on the [`gravity-particles` design tokens](https://github.com/buildit/gravity-particles/)), functions and mixins exist for most values you are likely to need, such as typography values, [colors](./color-system.md), spacing values (for margins and paddings), etc.
    * Drawing from the global values helps enforce visual consistency in our UIs. It also makes future redesigns or reskins much easier to implement, since we can simply alter those central values.
    * It also makes the code easier to understand since the variable and function names convey the _purpose_ of the values, whereas the raw values do not.

As much as possible, we use [Stylelint](https://stylelint.io/) to enforce these rules. You can run it anytime via `npm run lint:style`.

### Declaration and property ordering
Within a CSS block, declarations should be ordered as follows:

```scss
.grav-foobar {
  // SASS @extends
  @extend .grav-other-thing;

  // SASS mixin @includes that do NOT use content blocks
  @include grav-fancy-mixin(...);

  // CSS custom properties
  --foobar-barfoo: 42;

  // SASS variable declartions
  $foobar: 666;

  // SASS mixing @includes that have content blocks
  @include grav-block-mixin(...) {
    // Content block
  }

  // CSS rules in the following order:
  // Display related:
  display: ...;
  
  // Sizing:
  width: ...;
  height: ...;

  // Positioning:
  position: ...;
  top: ...;
  left: ...;
  
  // Margins
  margin: ...;

  // Paddings
  padding: ...;

  // Borders
  border: ...;

  // Any other properties in
  // ALPHABETICAL ORDER
}
```

These rules are defined in [our Stylelint config](../stylelint.config.js). Search for the `order/order` rule to see the details.


### Selectors
Prefer element and attribute selectors (possibly with [combinators](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors#Combinators)) over class selectors.

> In a site afflicted by classitis, every blessed tag breaks out in its own swollen, blotchy class. Classitis is the measles of markup, obscuring meaning as it adds needless weight to every page.
>
> _Jeffrey Zeldman, Designing with Web Standards, 1st ed._

* As much as possible, we want plain, semantic HTML to be rendered sensibly. Consumers should not have to learn and apply tons of custom CSS classes to achieve simple layouts.
* We also want to promote good, semantic and accessible HTML, and "forcing" element choices via our CSS is a good way of doing this. Gravity is intentionally and unashamedly opinionated about this! For example, we intentionally do _not_ have a button class that could be applied to arbitrary elements - instead we use the `button` selector thus forcing consumers to use the actual `<button>` element when they need a button. Similarly, we don't have a modifier class for disables states. Instead we simply use `[disabled]`, so consumers have to use the `disabled` attribute.
* It is true that the performance of element selectors is typically worse than that of class selectors. But, in the grand scheme of things this is such a miniscule difference that it is highly unlikely to affect UI performance in Gravity-powered websites and apps.

```css
/* Do NOT do this: */
.form { ... }

.button-primary { ... }

.grav-c-unicorn-list__item { ... }


/* Do this: */
form { ... }

[type=submit] { ... }

.grav-c-unicorn-list > li { ... }
```

#### Class names
Wherever CSS class names are actually needed (typically for "Molecule"-level UI components and up), **we use the [BEMIT naming convention](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) with the following tweaks**:

 * All class names are prefixed with `grav-` (to avoid naming clashes with consumers' own CSS classes)
 * As per the previous section, using appropriate HTML attributes and associated selectors is preferred over defining state or modifier classes. For instance, rather than a `.grav-s-disabled` class, we should instead simply use `:disabled`.

```css
/* Objects */
.grav-o-sticky-footer { ... }

/* Components */
.grav-c-nav-menu { ... }
.grav-c-nav-menu__item--current { ... }

/* Utilities */
.grav-u-inverted { ... }
```

#### Further reading
* Tim Baxter's "[Meaningful CSS: Style It Like You Mean It](http://alistapart.com/article/meaningful-css-style-like-you-mean-it)" article.
* Heydon Pickering's "[CSS Inheritance, The Cascade And Global Scope: Your New Old Worst Best Friends](https://www.smashingmagazine.com/2016/11/css-inheritance-cascade-global-scope-new-old-worst-best-friends/)"


### SASS variables, functions and mixins
All global SASS variables, functions and mixins must have their names prefixed with `grav-`. This is to avoid naming clashes with SASS code from websites and applications that consume this library.

Additionally, where appropriate, the following prefixes should be used in names (these are deliberately 2 letters long to avoid confusion with the single letter BEMIT prefixes used on class names):

* `co` for colors (e.g. `$grav-co-primary-egg-yolk`)
* `sp` for spacing (e.g. `$grav-sp-xl`)
* `st` for strokes (e.g. `$grav-st-thick`)
* `tr` for transform-related values (e.g. `$grav-tr-speed-slow`)

Local variables (e.g. within mixins) should not use these prefixes. Any global variables that are _not_ one of the above types, should only use the `grav-` prefix.

Even though, technically all variables, functions and mixins public, we can _indicate_ that some are meant to be "private", i.e. intended only for use internally within `gravity-ui-web` but not its consumers. To do this, we can prefix their name with an underscore (`_`). Note that [SASS's forthcoming `@use` directive](https://github.com/sass/sass/blob/master/accepted/module-system.md#use) _will_ actually treat members named like this as "private", so this also prepares use for adopting that once it gets released.

Finally, the remainder of the variable names should always aim to be **succinct** and, when read from left to right, increase in specificity. This makes successive lines of related variables easier to read:

```scss
// Do NOT do this:
$grav-co-link: ...;
$grav-co-visited-link: ...;
$grav-co-active-link: ...;


// Do this:
$grav-co-link: ...;
$grav-co-link-visited: ...;
$grav-co-link-active: ...;
```


Examples:
```scss
$grav-co-fg: ...;

@mixin grav-make-awesome($foo, $bar){
  ...
}

@function grav-space($power){
  ...
}

@function _grav-private-helper-function(){
  ...
}
```


### Media queries
Width-based media queries must use the `grav-breakpoint()` SASS function to retrieve one of our pre-defined breakpoint values. Futhermore, you should not prefix the media query with `screen and ...` or `all and ...`. This is redundant nowadays and, having consistent media queries enables our CSS build to consolidate recurring media queries in the output which reduces the file size quite considerably.

```scss
/* Do NOT use redundant prefixes and hard-code values */
@media screen and (min-width: 64rem) {
  // ...
}

/* DO use the `grav-breakpoint()` function */
@media (min-width: grav-breakpoint(medium)) {
  // ...
}
```

Organise your CSS code "mobile first". I.e. begin with code _outside_ of any media query that lays our the UI as desired for narrow viewports. Then, if needed, add successive `(min-width: ...)` media queries which augment or override the rules to adapt to wider viewports.

* This avoids redundant repetition of CSS rules that apply across all viewport sizes, since all preceding rules still apply within each wider media query.
* Since the shared rules are often the bulk of the code, this also helps keeps the file size down. Typically you only need a small number of "tweaks" in each media query.

```scss
/* Do NOT do mutually exclusive MQs like this: */
@media (max-width: grav-breakpoint(small)) {
  // some rules only for narrow viewports
}
@media (min-width: grav-breakpoint(small)) and (max-width: grav-breakpoint(medium)) {
  // some rules for slighly wider viewports
}
@media (min-width: grav-breakpoint(medium)) {
  // some rules for even wider viewports
}

/* ============================ */

/* DO start with small viewports (outside of a MQ) and then
   successively adjust for ever wider viewports */

// Base rules (which apply from smallest viewport and up

@media (min-width: grav-breakpoint(small)) {
  // ADDITIONAL rules or overrides for slighly wider viewports
}
@media (min-width: grav-breakpoint(medium)) {
  // ADDITIONAL rules or overrider for wider viewports
}
// rinse, repeat
```

A good rule of thumb is to avoid `(max-width: ...)` media queries, unless you have a very good reason to do so.

⚠️ Our CSS compilation uses the [`css-mqpacker` PostCSS plug-in](https://github.com/hail2u/node-css-mqpacker) and is configured to reorder `min-width` media queries from smallest to largest in the output. If you deviate from the above coding conventions, this might alter the behaviour of your CSS!


## JavaScript
### Browser JS
Rules for JavaScript that is shipped to consumers as part of the `@buildit/gravity-ui-web` NPM package and intended to run client-side in a web browser:

_TBC_

### Node.js build scripts
Rules for JavaScript that is intended to run (without transpilation) in Node.js, primarily used for our build scripts:

We follow the rules defined in [Buildit's shared `@buildit/eslint` config](../../eslint/README.md). This is largely based on [AirBnb's _base_ JavaScript styleguide](https://github.com/airbnb/javascript), except that we use CommonJS `require(...);` and `module.exports = {...};` since Node.js does not yet support ES6 `import` and `export` natively.

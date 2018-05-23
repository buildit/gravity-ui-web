# Naming conventions

## CSS

> In a site afflicted by classitis, every blessed tag breaks out in its own swollen, blotchy class. Classitis is the measles of markup, obscuring meaning as it adds needless weight to every page.
>
> _Jeffrey Zeldman, Designing with Web Standards, 1st ed._

Inspired by Tim Baxter's "[Meaningful CSS: Style It Like You Mean It](http://alistapart.com/article/meaningful-css-style-like-you-mean-it)" article, **we use element, child (`>`) and attribute selectors in our CSS as much as we can**.

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

The main advantages of this approach are:

* More succient HTML and CSS code
* Promotes awareness and use of correct, semantic HTML
* Means that there are less class names for new developers to learn (since we lean on bog-standard HTML and CSS as much as possible)

Wherever CSS class names are actually needed (typically for "Molecule"-level UI components and up), **we use the [BEMIT naming convention](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) with the following tweaks**:

 * All class names are prefixed with `grav-` (to avoid naming clashes with consumers' own CSS classes)
 * As per the previous section, using appropriate HTML attributes and associated selectors is preferred over defining state or modifier classes. For instance, rather than a `.grav-s-disabled` class, we should instead simply use `:disabled`.
 
 For example:

```css
/* Components */
.grav-c-nav-menu { ... }
.grav-c-nav-menu__item--current { ... }

/* Utilities */
.grav-u-inverted { ... }
```

### Further reading

* Heydon Pickering's "[CSS Inheritance, The Cascade And Global Scope: Your New Old Worst Best Friends](https://www.smashingmagazine.com/2016/11/css-inheritance-cascade-global-scope-new-old-worst-best-friends/)" 


## SASS

All global SASS variables, mixins and functions must have their names prefixed with `grav-`. This is to avoid naming clashes with SASS code from websites and applications that consume this library.

Additionally, where appropriate, the following prefixes should be used in names (these are deliberately 2 letters long to avoid confusion with the single letter BEMIT prefixes used on class names):

* `co` for colors (e.g. `$grav-co-primary-egg-yolk`)
* `sp` for spacing (e.g. `$grav-sp-xl`)
* `st` for strokes (e.g. `$grav-st-thick`)
* `tr` for transform-related values (e.g. `$grav-tr-speed-slow`)

Local variables (e.g. within mixins) should not use these prefixes. Any global variables that are _not_ one of the above types, should only use the `grav-` prefix.

Finally, the remainder of the variable names should always aim to be **succinct** and, when read from left to right, increase in specificity. This makes successive lines of related variables easier to read:

```sass
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
```sass
$grav-co-fg: ...;

@mixin grav-make-awesome($foo, $bar){
  ...
}

@function grav-space($power){
  ...
}
```

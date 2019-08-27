# Fractal for people used to Pattern Lab
For a long time, [Gravity's pattern library](http://style.buildit.digital/) has used the [Pattern Lab tool](https://patternlab.io/) to generate the pattern library website. We have now migrated to [Fractal](https://fractal.build/), which is a very similar tool but had some extra features that were of use to us (see PR #262 for the rationale).

This guide is intended to help folks used to Pattern Lab to quickly get up to speed with Fractal.

<!--
  Tip: If using VSCode, get the "Auto Markdown TOC" extension by
  Hunter Tran to automatically update this table of contents.
  https://github.com/huntertran/markdown-toc
-->
<!-- TOC depthfrom:2 -->

- [Overview](#overview)
- [Terminology differences](#terminology-differences)
- [Differences in file structure](#differences-in-file-structure)
    - [Pseudo-patterns / variants](#pseudo-patterns--variants)
- [Differences within templates](#differences-within-templates)
- [Differences within JSON and context data](#differences-within-json-and-context-data)
    - [File structure](#file-structure)
    - [Data inheritance](#data-inheritance)
- [Pattern Lab features missing in Fractal](#pattern-lab-features-missing-in-fractal)
- [Features unique to Fractal](#features-unique-to-fractal)
    - [Why Gravity switched](#why-gravity-switched)

<!-- /TOC -->

## Overview
Both Pattern Lab and Fractal are essentially specialised static site generators. Given a set of per-UI-component HTML templates, associated meta-data and docs they will generate a pattern library website that showcases all of those UI components in a convenient way. While they each wrap the generated website in their own UI, as far as our UI components are concerned they _only_ generate HTML. Neither of them operates on CSS, JS or any other assets we might be using. For the most part, they have feature parity but each has some unique features that the other does not.

Therefore, for day to day work on the Gravity pattern library, not much has changed for us:

* We still use [Nunjucks](https://mozilla.github.io/nunjucks/) templates for each UI component
* Context data for the templates is provided by JSON files
    * Note this may evolve over time since Fractal supports using JavaScript files as well as JSON or YAML.
* The NPM scripts are unchanged:
    * `npm run build` will generate a static HTML build in `dist/` that can be uploaded to a web server
    * `npm start` will launch the pattern library on a local dev server and watch source files for changes (which then trigger rebuilds and reloads in the web browser)
* We still import the CSS, JS and SVG icons from [`@buildit/gravity-ui-sass`](../../gravity-ui-web/README.md)

## Terminology differences
The [Pattern Lab docs](https://patternlab.io/docs/) and [Fractal docs](https://fractal.build/guide/) sometimes use different terms for the _same_ things or equivalent features:

| Pattern Lab term | Fractal term       | Meaning |
|------------------|--------------------|---------|
| Pattern          | Component          | An individual UI pattern (aka component) being showcased within the pattern library. |
| Shorthand include syntax | Handle     | The shortened names that can be used to include other component templates, instead of full file paths. |
| Variant          | Pseudo pattern     | A means of showing different variations of a pattern (e.g. different states, light / dark versions, etc.) that can re-use a single template file but populate with different sets of context data |
| Pattern state    | Status             | The development status of an individual pattern (e.g. work in progress, ready, deprecated) |
| Pattern header & footer | Preview layout | The means by which you control the HTML top and tail (e.g. all the stuff that goes into `<head>`) that gets wrapped around each individual pattern template. This is how we link in Gravity's CSS & JS. |
| Pattern types and subtypes | Collections | The folder and corresponding navigation structure by which the patterns are organised. |
| Pattern engine   | Template engine    | The part of Pattern Lab / Fractal that supports a specific template language (Nunjucks in our case) and knows how to render that to HTML. |

## Differences in file structure
While Fractal does let you have multiple component template files in the same directory (just like Pattern Lab), we have opted to use its "[compound component](https://fractal.build/guide/components/creating-a-component.html#associating-related-files)" feature where each component has its own directory. The advantages of this are:

* Makes it easier to re-order to move components since you only need to rename the directory and not each file individually
* (Arguably) makes browsing the source files in an IDE easier since you can focus on just one component's file without all the "noise" of other components in the same collection.

Previously, in Pattern Lab, we would have component (aka pattern) templates and associated files like this:
```
some/
    category/
        12-pattern-name.njk   # template
        12-pattern-name.md    # description text
        12-pattern-name.json  # context data
```

The equivalent file names and locations in Fractal are now like this:

```
some/
    category/
        12-pattern-name/
            pattern-name.njk          # template
            README.md                 # description text
            pattern-name.config.json  # context data
```

Note that the contents of the JSON files are subtly different. Refer to the [differences within JSON and context data](#differences-within-json-and-context-data) section for more details.

### Pseudo-patterns / variants
The equivalent to Pattern Lab's [pseudo patterns](https://patternlab.io/docs/pattern-pseudo-patterns.html) are [variants](https://fractal.build/guide/components/variants.html#creating-variants). In terms of files, they work a bit differently.

In Pattern Lab, they are a separate JSON file with a `~variant-name` suffix. For example:
```
some/
    category/
        12-pattern-name.njk                # template
        12-pattern-name.json               # context data
        12-pattern-name~variant-name.json  # variant's context data
```

However, in Fractal, the variant's context data resides in the main pattern's config file `pattern-name.config.json`, so there is not a separate JSON file. On the plus side though, you can have a separate template for (some of) your variants if you wish. This file should use the following naming scheme: `pattern-name--variant-name.njk`. Refer to Fractal's docs for more details.

## Differences within templates
Both Pattern Lab and Fractal provide a short-hand naming scheme that can be used instead of a file path in templates when you `{% include ... %}`, `{% import ... %}` or `{% extend ... %}` another component. But, the naming is different:

* In Pattern Lab, short names are a lower kebabcase concatenation of the pattern's (top-level) type directory name and the pattern's name:
    * E.g. to reference: `atoms/pretty-things/shiny-thing.njk` you'd use the short name: **`atoms-shiny-thing`**.
* In Fractal, short names are simply the lower kebabcase component name prefixed by an `@` symbol:
    * E.g. to reference: `atoms/pretty-things/shiny-thing/shiny-thing.njk` you'd use the short name: **`@shiny-thing`**.
    * **Note:** Fractal components can override the filename-derived handle with something else via the component's config file. Aside from our "pages" collection (see below), we should avoid this in Gravity since it can quickly get confusing.

A consequence of is this that component (aka pattern) names now need to be globally unique (in Pattern Lab they only had to be unique within the same pattern type). For the most part this was already the case in Gravity. A notable exception were the "templates" and "pages" which both contained patterns using the same names. Fortunately, Fractal lets us defined some shared configs per collection, which are then inherited by all components in that collection. We use this to apply a `page-` prefix to all component handles in the pages collection:

* **Templates** have their standard handles derived from the file name (same as atoms, molecules and organisms do):
    * E.g. `templates/listing-page/listing-page.njk` will have `@listing-page` as its handle.
* **Pages** have `page-` prefixed to the standard handles:
    * E.g. `pages/listing-page/listing-page.njk` will have `@page-listing-page` as its handle.

## Differences within JSON and context data
### File structure
Whereas the JSON files in Pattern Lab only contain context data for templates, the equivalent files in Fractal contain configuration _and_ context data. In the simplest case, where we don't use any special configuration, we simply need to put all the context data under a top-level `context` property.

A `component-name.json` file for Pattern Lab:
```json
{
  "key1": "value1",
  "key2": "value2",
  
  "keyN": "valueN"
}
```
...will need to be changed to this for Fractal:
```json
{
  "context": {
    "key1": "value1",
    "key2": "value2",
  
    "keyN": "valueN"
  }
}
```

### Data inheritance
In Pattern Lab, a component template's context data is a merge of:

* All JSON files found in the `_data/` directory (except for `listitems.json`, see below)
* The current pattern's own JSON file, if any.

Pattern Lab augments the above with a couple of "special" variables like [`listItems`](https://patternlab.io/docs/data-listitems.html) and [`styleModifier`](https://patternlab.io/docs/pattern-stylemodifier.html). It also does some find-and-replace voodoo in included templates if you use pattern parameters. However, we don't make use of those features in Gravity.

In Fractal, a component template's context data is a merge of:

* Each parent collection's context data (starting at the top level and working down from there), if any.
* The current component's own context data, if any, from its config file.

Therefore, our top level `components.config.json`'s `context` property contains all globally available context data and is thus equivalent to what was previously within `_data/*.json`. And per-component context data sits alongside the component, just as it did in Pattern Lab.

However, what Fractal lets us do which we could not previously do in Pattern Lab is have additional, per-category context data. For instance, a lot of the data for our "pages" are essentially overrides of global placeholder content used everywhere else. However, those overrides are shared by all pages. In Pattern Lab we had to copy-paste this context data into each page's JSON file. In Fractal we can DRY up this code by having that overriding context data _once_ in the page collection's config file.


## Pattern Lab features missing in Fractal
**Developer features**:
* **Links**: [Pattern Lab makes it easy to create hyperlinks between patterns](https://patternlab.io/docs/data-link-variable.html) via the special `link` variable that gets added to the context data. Besides developer convenience, the UI is also "aware" of these links and so will update pattern info to reflect whatever pattern the user has navigated to by clicking a link. While a pattern library is probably not the best tool for UI prototyping, being able to mock-up some realistic navigation links between page templates can be helpful. Unfortunately Fractal does not have an equivalent to this feature.
    * Workaround: You can use relative URLs in Fractal (paths like `./component-handle` (note the lack of a trailing slash) seem to work). However, while the linked component will appear in the preview pane, the rest of Fractal's UI will not update accordingly.
* **Pattern parameters**: Some versions and configurations of Pattern Lab have a features that lets you "pass down" context data into included templates. However, support is limited to the Mustache template engine (in the Node version of Pattern Lab) since other template languages have their own "native" ways of doing this.
    * Workaround: We had already stopped using this feature when we converted out templates from Mustache to Nunjucks. That being said, [Nunjucks' macros and imports](https://mozilla.github.io/nunjucks/templating.html#macro) offer equivalent functionality.
* **Style modifiers**: Essentially another Pattern Lab-specific shorthand for passing down a property into an included template. Unlike pattern parameters you only pass a value, which is then available via the `styleModifier` variable in the included template.
    * Workaround: Same as for pattern parameters. In Gravity we had stopped using this anyway. You can achieve a similar thing using Nunjucks macros and imports, if needed.
* **List items**: In addition to "normal" context data, Pattern Lab has the [`listItems`](https://patternlab.io/docs/data-listitems.html) feature for defining multiple sets of context data which can then be iterated over (in a randomised order) within a template.
    * Workaround: We had already stopped using this feature as it was historically a bit buggy - especially when using a non-default template engine like we do. Newcomers to Pattern Lab also sometimes get confused by this feature. That being said, if you _really_ need something like this in Fractal you could use a JavaScript module to generate and export randomised lists of data.

**UI features**
* **Responsive preview functionality**: While Fractal's preview pane _is_ resizable (you can drag the right-hand side), Pattern Lab has richer functionality in this respect thanks to it having [ish](http://bradfrost.com/demo/ish/) integrated. So, the viewport width readout (and setting), small-ish, medium-ish, large-ish random and "disco" resize options are all absent from Fractal's UI.
* **View all**: Pattern Lab gives you free "everything including the kitchen sink" pages for all patterns, all patterns of the same type and all patterns of the same sub-type. In the UI these are accessible via the "View all" links in the navigation. Fractal does not have a direct equivalent.
    * Workaround: Fractal does have what it calls "[collators](https://fractal.build/guide/components/configuration-reference.html#component-properties)", which let you render all components of a collection to a single page. Unfortunately, it's an either-or choice though. You can have all components individually viewable and listed in the nav, _or_ you can have them all collated on a single page and a single entry in the nav. You can't have both. Consequently, they might be useful for very localised cases such as showing all button variants together, but most of the time we favour individual, per-component nav links and should therefore avoid collating.
* **Search**: Pattern Lab's UI has a handy search box that lets you quickly find patterns by name. Sadly Fractal's default UI does not have this feature.

## Features unique to Fractal
**Developer features**:
* **Arbitrary nesting of collections**: Whereas Pattern Lab restricts itself to a maximum 2 levels of folders for organising patterns, Fractal lets you have as many levels as you like. Of course, that's no excuse to have excessively deep nav structures, but it can come in handy from time to time.
    * **Per-collection context data**: Additionally, collections can provide extra context data which is then available to all of their children.
* **Cross referencing context data**: Similar to how templates can reference each other (for includes, imports, etc.) via the handle names, so too can context data. If the value of a property is an `@handle-name`, then Fractal will treat it as a [static data reference](https://fractal.build/guide/core-concepts/context-data.html#static-data-references) which will resolve to that component's context data. This can help DRY up the code by re-using existing context data rather than copy-pasting it.
* **Using JS to provide context data**: In addition to static JSON or YAML files, Fractal also supports the use of CommonJS modules to provide [dynamic context (and also config) data](https://fractal.build/guide/core-concepts/context-data.html#dynamic-data). For instance, you could use other NPM libraries or API calls to auto-generate context data.
* **Per-component preview layouts**: In addition to a global, default preview layiout, Fractal lets you [specify alternate preview layouts for individual components](https://fractal.build/guide/components/preview-layouts.html#specifying-a-preview-layout-for-a-component). This can be useful for previewing components that don't make sense or look out when taken out of context. For instance, a card which is intended to appear only in grids and thus never stretch to the full width of the viewport may look excessively wide when displayed like that. A custom preview layout that perhaps applies a realistic max-width to the card could be used to give a more true-to-life preview.
* **Docs section**: Besides just showing individual UI patterns (as Pattern Lab does too), Fractal also lets you have a [separate "docs" section](https://fractal.build/guide/documentation/#a-simple-page) where you can put useful information that isn't related to just a single component. For example, UI library setup instructions, design principles, etc.

**UI features**
* **Context data preview**: The "Context" tab below the pattern preview shows the complete (merged) context data that was passed into the pattern template. This can be a useful debugging tool when adding or editing patterns and their context data.

### Why Gravity switched
Of the above Fractal features, the main ones that motivated us to switch away from Pattern Lab were:

* **Collection context data**, **static data references** and **dynamic context data**: Because these will enable us to DRY up and tidy up our context data significantly. An that, in turn, will make future maintenance and development of our pattern library easier.
* **Docs section**: While our ambition is still to create a separate ["storefront" site](http://bradfrost.com/blog/post/the-workshop-and-the-storefront/) for Gravity, the ability to include some docs alongside our components in the pattern library (which is still very much part of our "workshop" in Brad Frost's analogy) is nonetheless useful. For instance, we can have a little welcome page to give some context and explain how and why to use the pattern library (and in due course link off to other Gravity resources).
* **Compound components**: Being able to give each component its own sub-directory may seem like a small thing, but it does give a nicer developer experience when working on the pattern library. It's also handy for maintenance in case we ever want to re-order components or move them to different collections.

Probably the feature we'll miss most from Pattern Lab is the search facility in the UI. Here's hoping that future versions of Fractal will add that!

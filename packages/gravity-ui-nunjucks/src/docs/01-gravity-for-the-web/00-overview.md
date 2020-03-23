Gravity aims to make it easy to apply its look and feel to your websites and web apps. It provides ready-made CSS and JavaScript<sup>*</sup> that you can integrate into your project. For simple projects you only need to produce appropriate HTML markup and don't need to write any of your own CSS or JavaScript. Your markup can come from static HTML files, be server-side rendered by a CMS, be generated client-side by JavaScript or any combination of those - the only requirement is that the resulting DOM is structured as mandated by this pattern library.

**Gravity aims to enourage semantic, accessible and lean markup.** Many of its CSS styles therefore target HTML elements and attributes rather than relying entirely on class names as many other UI libraries do. Our CSS is also architected such that, as much as possible, UI components _automatically_ adapt their appearance to the context they are used within. Therefore, when copying the HTML structures shown in this pattern library, pay attention to the elements, all of their attributes and how they are nested. If in doubt, consult the notes for that component or [contact the Gravity team]({{ '/docs/about-gravity/contact' | path }}) for help.

As a general rule, when working with Gravity you should follow this process:

1. **Define a clear, concise and prioritised content structure.**
    * Ask yourself: If the contents of your screen / page / UI component had to be presented in a strictly linear way (e.g. if they were read out aloud, or shown in a single column on a very narrow screen), what would the order be?
    * You might jot this down as a little bullet list somewhere or, for larger pages, even [use a spreadsheet](https://bigmedium.com/ideas/only-one-deliverable-matters.html#wordsnotwireframes) so that you can annotate each item with notes or content.
1. **Mark-up your structure with the appropriate HTML elements and patterns.**
    * Use HTML as it is intended: To express the _meaning_ of your UI. Is that text a heading or not? Is this a [button or a link](https://medium.com/simple-human/but-sometimes-links-look-like-buttons-and-buttons-look-like-links-9b371c57b3d2)?
    * Gravity's out-of-the-box styles should give your plain HTML a usable appearance and layout. If this is already sufficient for your needs, you're done!
1. **Enhance with Gravity styles & components.**
    * With the basic structure in place, you can begin adding Gravity-specific CSS classes to enhance the appearance, functionality and layout.
    * Consult [this pattern library](/) for all the available styles and components.
    * If the resulting page is sufficient for your needs, you're done.
1. **Layer on bespoke CSS.**
    * If you need to go further, you will need to add your own CSS. How you author it is entirely up to you, but Gravity provides a number of SASS variables, functions and mixins that will make it easy for you to extend your design in a manner that is consistent with Gravity's look and feel. Furthermore, as Gravity's appearance evolves and improves, your cusomisations will inherit those changes automatically.
    * You are encouraged to follow [Gravity's principles]({{ '/docs/about-gravity/principles' | path }}) for your own design and development work. This will help ensure that your extensons and customisations blend in well with Gravity's look and feel. It will also make it easier if you choose to contribute any of your extensions into Gravity's core libraries.

## Integrating Gravity into your project
### Via NPM
The recommended way to add Gravity to your web project is to install our `@buildit/gravity-ui-web` NPM package as a dependency and wiring it into your build. Refer to the [Web UI library's documentation](https://github.com/buildit/gravity-ui-web/tree/develop/packages/gravity-ui-web#readme) for detailed instructions on how to do this.

The benefits of this approach are:
* **Easy to upgrade to newer versions of Gravity.** For new minor or patch releases, a simple `npm update` followed by a rebuild will bring the latest and greatest Gravity styles into your project. Major releases will contain breaking changes, so you may need to modify your own code in order to upgrade to them. Consult the [release notes](https://github.com/buildit/gravity-ui-web/releases) for details.  We aim to keep breaking changes to a minimum, so this should be a rare occurence.
* **Easy integration into your build process.** You can `require()` or `import` Gravity's build API into your JavaScript-based build tools (Gulp, Webpack, etc.) to access file and directory paths to all the resources the library provides.

### Via CDN
Alternatively, Gravity releases are also published to [a CDN](https://static.buildit.digital/gravity-ui-web/), so you can simply link to those from your HTML. For example, to get the latest 2.x release you can use:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    <!-- Link to CDN-hosted copies of Gravity's CSS & JS -->
    <link rel="stylesheet" href="https://static.buildit.digital/gravity-ui-web/v2.x/gravity.css">
    <script defer src="https://static.buildit.digital/gravity-ui-web/v2.x/gravity.js"></script>
    ...
  </head>
  ...
</html>
```

This approach may suffice for very basic projects. It is also useful for prototypes and demos, e.g using [CodePen](https://codepen.io/).



## Integrating Gravity with other frameworks
Gravity's CSS is not designed to work alongside other frameworks. If, for instance, you have an existing website or app and you try to drop in individual Gravity UI components or layer on Gravity's CSS, the result will be highly unpredictable. Similarly, some of Gravity's core CSS styles are likely to interfere with 3rd party UI components being embedded into a Gravity app.

However, there are some options for applying some of Gravity's core visual attributes (colors, typography, spacing, etc.) to your UI:

* **Directly using Gravity's design tokens**: The `@buildit/gravity-particles` NPM package exposes Gravity's design token values, such as individual colors, as SASS variables and also as JavaScript constants. You can therefore pull those values into your code and use them to theme your UI.
* **Using Gravity's SASS settings and tools**: If using SASS, it is also possible to `@import` only Gravity's "settings" and "tools" layers. When compiled, they will not output any CSS, but they do give you access to all of Gravity's SASS variables, functions and mixins. You can then use these to theme or customise your own CSS code.

If you need help integrating Gravity into your project, have special requirements, feature requests or are facing blockers please [get in touch with us]({{ '/docs/about-gravity/contact' | path }})!

-----
<small>*) Currently, Gravity only provides some minimal JavaScript. However, the amount of JS is expected to grow in future releases to support more interactive components (e.g. collapsing sections, accordions, complex form inputs, etc.).</small>

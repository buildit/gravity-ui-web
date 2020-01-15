## Consuming SVG symbols

`gravity-ui-web` provides all the logos and icons shown here, as SVG `<symbol>` elements in the `symbols.svg` file. The contents of that file must be _inlined_ into your HTML document.

Then, whereever individual logos or icons need to be displayed, you can do so using the following markup:

```html
<svg role="img">
  <use xlink:href="#symbol-id"></use>
</svg>
```

Where `#symbol-id` is taken from the ID column of the table shown in this stylegudie for the logo or icon you wish to display.

Without further styling, the logo or icon will appear as black (`#000`) on a transparent background. However, you can use CSS to set the fill color to something else. For example:

```css
#symbol-id {
  fill: red;
}
```

## Generating the SVG symbols

`gravity-ui-web` uses an SVG icon system instead of an icon font. Furthermore, [we use `<symbols>` rather than `<defs>`](https://css-tricks.com/svg-symbol-good-choice-icons/), so that we don't need to specify the `viewBox` each time a glyph is referenced. The benefits of this approach are covered in the CSS-Tricks [Icon System with SVG Sprites](https://css-tricks.com/svg-sprites-use-better-icon-fonts/) article. Of particular appeal to us were the following:

* Richer styling control via CSS than what you can achieve with icon font glyphs.
* Easier positioning and sizing since it behaves more like an image and avoids inline quirkiness (line-heights, vertical positioning, etc.)
* Better accessibility by being able to include the text alternative in the SVG symbol itself.

The `symbols.svg` SVG symbols file is generated at build time from individual SVG files in a folder. An accompanying `symbols.json` file is generated that exposes all the available IDs and some associated meta-data.



## Purpose

Use this component wherever the Buildit logotype (i.e. the stylised "buildit @ wipro digital" text) needs to be displayed.

It uses the `inline-svg-symbol` atom (and therefore depends on `symbols.svg` having been inlined into your HTML document), but hard-codes the correct symbol ID and also sets the intrinsic width and height. Additionally, the fill colour of the graphic is [set to inherit the current CSS `color`](https://css-tricks.com/cascading-svg-fill-color/) of the parent element - in other words, the logo's colour should match that of surrounding text automatically.

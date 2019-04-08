## Purpose

Use this component to display Gravity's icons.

It uses the `inline-svg-symbol` atom (and therefore depends on `symbols.svg` having been inlined into your HTML document), but sets the intrinsic width and height to `32px` × `32px`. Additionally, the fill color of the graphic is [set to inherit the current CSS `color`](https://css-tricks.com/cascading-svg-fill-color/) of the parent element - in other words, the icon's color should match that of surrounding text automatically.

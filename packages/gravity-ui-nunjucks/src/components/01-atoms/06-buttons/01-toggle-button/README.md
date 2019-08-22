## Purpose

Toggle buttons can be used to let the user switch something between 2 states. Typically, they are used to open or close something, or to switch something on or off.

Checkboxes and switch components also allow you to present the user with a binary choice. However, those components are more appropriate choices for forms where the user is primarily inputting some data, or settings menus where they are enabling or disabling options. Toggle buttons on the other hand are usually a better choice outside of a form, for example:

* "Hamburger" navigation menus. The actual "hamburger" button that opens and closes the navigation menu is an instance of a toggle button
* Media player controls, such as a play / pause button.
* In application toolbars, for buttons that toggle certain modes on or off.


## Implementation notes

Toggle buttons must use the `aria-pressed` attribute to denote pressed (`true`) or unpressed (`false`) states. Assistive technology relies on that attribute to recognise the buttons as a _toggle_ button and convey its state to the user in a meaningful way.

Currently, browsers will not automatically toggle that attribute when the button is clicked, so some JavaScript is required to make it work. Essentially, all it needs to do is react to the button element's `click` event (which is triggered not only by mouse clicks but also screen taps and keyboard input) and toggle the value of the `aria-pressed` attribute between `true` and `false`.

`gravity-ui-web`'s simple JS library (`gravity.js`) implements this behaviour and may be used as a reference.


## See also

* [Toggle Buttons](https://inclusive-components.design/toggle-button/) on Heydon Pickering's "Inclusive Components" blog.

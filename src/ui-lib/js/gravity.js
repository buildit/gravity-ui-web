/**
 * Basic client-side JS to add basic behaviours to interactive UI components.
 *
 * Complex applications should probably replace this with a corresponding implementation
 * using their preferred framework (React, Vue, Angular, etc.). This JS code along with the
 * "pattern info" displayed for each UI component in our style guide should be used as a
 * reference when doing so.
 *
 * The important thing is that the DOM structure is Gravity's "API". Whether you generate it
 * server-side, write it into a static HTML file or generate it client-side, all implementations
 * MUST create the same HTML structures (same choice of elements and attributes) in order
 * for Gravity's CSS to style them correctly.
 *
 */
(function(){

  /**
   * Initialises all toggle buttons on the page.
   *
   * This function finds all toggle buttons and adds a click
   * event handler which toggles the value of the aria-pressed
   * attribute.
   *
   * Noe that the "click" hander is triggered by users clicking,
   * tapping or acitivating the button via the SPACE and ENTER
   * keys.
   *
   * This code is heavily inspired by Heydon Pickering's excellent
   * "Toggle Buttons" post on his "Inclusive Components" blog:
   * https://inclusive-components.design/toggle-button/
   *
   */
  function initToggleButtons() {
    const toggleButtons = document.querySelectorAll('[type=button][aria-pressed]');

    toggleButtons.forEach((toggleButton) => {
      toggleButton.addEventListener('click', (e) => {
        let pressed = toggleButton.getAttribute('aria-pressed') === 'true';
        toggleButton.setAttribute('aria-pressed', String(!pressed));
      })
    });
  }

  /**
   * Runs the various init functions once the DOM has loaded.
   */
  document.addEventListener("DOMContentLoaded", (e) => {
    initToggleButtons();
  });

})();

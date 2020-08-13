const startcase = require('lodash.startcase');
const { colors: gravityParticlesColors } = require('@buildit/gravity-particles');

/* eslint-disable no-restricted-syntax */
function makeContrastLink(brandName) {
  const url = new URL('https://contrast.crgeary.com/');

  const colorList = [];
  const brandColors = gravityParticlesColors[brandName];
  for (const paletteName of Object.keys(brandColors)) {
    const palette = brandColors[paletteName];
    for (const colorName of Object.keys(palette)) {
      const color = palette[colorName];
      colorList.push(color.substr(1));
    }
  }

  url.hash = colorList.join(',');
  return url.href;
}
/* eslint-enable no-restricted-syntax */

module.exports = {
  variants: [
    ...Object.keys(gravityParticlesColors).map((brandName, index) => ({
      name: index === 0 ? 'default' : brandName,
      label: startcase(brandName),
      context: {
        palettes: gravityParticlesColors[brandName],
        contrastLink: makeContrastLink(brandName),
      },
    })),
  ],
};

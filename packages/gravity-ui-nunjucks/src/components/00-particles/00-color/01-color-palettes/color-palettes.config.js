const startcase = require('lodash.startcase');
const { colors } = require('@buildit/gravity-particles');

module.exports = {
  variants: [
    ...Object.keys(colors).map((paletteName, index) => ({
      name: index === 0 ? 'default' : paletteName,
      label: startcase(paletteName),
      context: {
        palettes: colors[paletteName],
      },
    })),
  ],
};

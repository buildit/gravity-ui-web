const Color = require('color');
const kebabCase = require('lodash.kebabcase');
const startCase = require('lodash.startcase');
const { colorSchemes } = require('@buildit/gravity-particles');

function wcagRating(contrastRatio) {
  if (contrastRatio > 7) {
    return 'AAA';
  }
  if (contrastRatio > 4.5) {
    return 'AA';
  }
  if (contrastRatio > 3) {
    return 'AA-lrg'; // AA for large text (>-18pt) and UI elements
  }
  return 'Fail';
}

function gravityCssCustomPropName(group, colorName) {
  return `--grav-co-grp-${group}-${kebabCase(colorName)}`;
}

function generateColorSchemeTableData(colorScheme) {
  const groupAColorNames = Object.keys(colorScheme.groupA);
  const groupBColorNames = Object.keys(colorScheme.groupB);

  const tableData = [];
  const headerRow = [null].concat(groupAColorNames.map((name) => gravityCssCustomPropName('a', name))); // top-left cell is empty
  tableData.push(headerRow);

  // Loop "down" the rows of the table, one for each group B color
  for (let i = 0; i < groupBColorNames.length; i += 1) {
    const groupBColorName = groupBColorNames[i];
    const row = [gravityCssCustomPropName('b', groupBColorName)]; // left-most cell has color name

    // Loop "across" the current row, adding one cell for each group A color
    for (let j = 0; j < groupAColorNames.length; j += 1) {
      const groupAColorName = groupAColorNames[j];
      const colorPair = {
        colorA: colorScheme.groupA[groupAColorName],
        colorB: colorScheme.groupB[groupBColorName],
      };

      const colorA = new Color(colorPair.colorA);
      const colorB = new Color(colorPair.colorB);

      colorPair.contrastRatio = colorA.contrast(colorB);
      colorPair.wcagRating = wcagRating(colorPair.contrastRatio);

      row.push(colorPair);
    }

    tableData.push(row);
  }

  return tableData;
}

const colorSchemeTables = [];
Object.keys(colorSchemes).forEach((colorSchemeName) => {
  const colorScheme = colorSchemes[colorSchemeName];
  const colorSchemeData = {
    table: generateColorSchemeTableData(colorScheme),
    humanName: startCase(colorSchemeName),
    kebabName: kebabCase(colorSchemeName),
  };

  colorSchemeTables.push(colorSchemeData);
});

module.exports = colorSchemeTables;

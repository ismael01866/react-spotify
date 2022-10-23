const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const buildTSCommand = () => `npm tsc --noEmit`;

const buildPrettierCommand = (filenames) =>
  `prettier --config .prettierrc --write ${filenames.join(' ')}`;

module.exports = {
  '*.{ts,tsx}': [buildTSCommand],
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, buildPrettierCommand]
};

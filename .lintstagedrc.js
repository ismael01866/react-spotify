const path = require('path');

const buildEsLintCommand = (filenames) =>
  `next lint --cache --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const buildStyleLintCommand = (filenames) =>
  `stylelint --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const buildPrettierCommand = (filenames) =>
  `prettier --config .prettierrc --write ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const buildTSCCommand = () => `tsc --pretty --noEmit`;

module.exports = {
  '*.{ts,tsx}': [buildTSCCommand],
  '*.{js,jsx,ts,tsx,css,scss,md,json}': [buildPrettierCommand],
  '*.{js,jsx,ts,tsx}': [buildEsLintCommand],
  '*.{css,scss}': [buildStyleLintCommand]
};

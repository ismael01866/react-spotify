const path = require('path');

const buildTSCCommand = () => `tsc --pretty --noEmit`;

const buildNextLintCommand = (filenames) =>
  `next lint --cache --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const buildEsLintCommand = (filenames) => `eslint --fix ${filenames.join(' ')}`;

const buildStyleLintCommand = (filenames) =>
  `stylelint --fix ${filenames.join(' ')}`;

const buildPrettierCommand = (filenames) =>
  `prettier --config .prettierrc --write ${filenames.join(' ')}`;

module.exports = {
  '*.{ts,tsx}': [buildTSCCommand],
  '*.{js,jsx,ts,tsx,css,scss,md,json}': [buildPrettierCommand],
  '*.{js,jsx,ts,tsx}': [buildEsLintCommand, buildNextLintCommand],
  '*.{css,scss}': [buildStyleLintCommand]
};

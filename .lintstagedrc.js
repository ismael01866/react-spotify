const path = require('path');

// const buildEslintCommand = (filenames) =>
//   `next lint --cache --fix --file ${filenames
//     .map((f) => path.relative(process.cwd(), f))
//     .join(' --file ')}`;

// const buildPrettierCommand = (filenames) =>
//   `prettier --config .prettierrc --write ${filenames.join(' ')}`;

const buildStyleLintCommand = (filenames) =>
  `stylelint --fix ${filenames.join(' ')}`;

module.exports = {
  // '*.{ts, tsx}': 'tsc --project tsconfig.json --pretty --noEmit',
  // '*.{js, jsx, ts, tsx}': [buildEslintCommand],
  '*.{css, scss}, *.{module.scss}': [buildStyleLintCommand]
  // '*.{js, jsx, ts, tsx, css, scss, md, json}': [buildPrettierCommand]
};

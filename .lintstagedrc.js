const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --cache --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const buildPrettierCommand = (filenames) =>
  `prettier --config .prettierrc --write ${filenames.join(' ')}`;

module.exports = {
  '*.{ts, tsx}': 'npm run type-check',
  '*.{js, jsx, ts, tsx}': [buildEslintCommand],
  '*.{css, scss}': 'stylelint --fix',
  '*.{js, jsx, ts, tsx, css, scss, md, json}': [buildPrettierCommand]
};

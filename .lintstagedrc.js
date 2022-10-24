const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --cache --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const buildTSCommand = () => `npm run type-check`;

const buildPrettierCommand = (filenames) =>
  `prettier --config .prettierrc --write ${filenames.join(' ')}`;

module.exports = {
  '*.{ts, tsx}': [buildTSCommand],
  '*.{js, jsx, ts, tsx}': [buildEslintCommand],
  '*.{js, jsx, ts, tsx, css, scss, md, json}': [buildPrettierCommand]
};

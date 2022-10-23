const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const buildTSCommand = () => `npm run type-check`;

const buildPrettierCommand = (filenames) =>
  `prettier --config .prettierrc --write ${filenames.join(' ')}`;

module.exports = {
  '*.ts?(x)': 'npm run type-check'
  // '**/*.{js?(x),ts?(x)}': [buildEslintCommand, buildPrettierCommand]
};

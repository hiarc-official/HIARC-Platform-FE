// .lintstaged.config.js
const path = require('path');

const EXCLUDED_DIRS = ['apps/intro/', 'apps/rating/'];

const buildEslintCommand = (filenames) => {
  const filtered = filenames.filter((file) => {
    const relative = path.relative(process.cwd(), file); // 절대경로 → 상대경로
    return !EXCLUDED_DIRS.some((excludedDir) => relative.startsWith(excludedDir));
  });

  if (filtered.length === 0) return [];

  const filesByApp = filtered.reduce(
    (acc, file) => {
      const relative = path.relative(process.cwd(), file);
      if (relative.startsWith('apps/intra/')) acc.intra.push(file);
      else if (relative.startsWith('apps/admin/')) acc.admin.push(file);
      else acc.root.push(file);
      return acc;
    },
    { intra: [], admin: [], root: [] }
  );

  const commands = [];

  if (filesByApp.intra.length) {
    commands.push(
      `cd apps/intra && eslint --fix ${filesByApp.intra
        .map((file) => path.relative('apps/intra', file))
        .join(' ')}`
    );
  }

  if (filesByApp.admin.length) {
    commands.push(
      `cd apps/admin && eslint --fix ${filesByApp.admin
        .map((file) => path.relative('apps/admin', file))
        .join(' ')}`
    );
  }

  if (filesByApp.root.length) {
    commands.push(
      `eslint --fix ${filesByApp.root
        .map((file) => path.relative(process.cwd(), file))
        .join(' ')}`
    );
  }

  return commands;
};

module.exports = {
  '**/*.{js,jsx,ts,tsx}': buildEslintCommand,
};
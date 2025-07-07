/* eslint-disable */
const path = require('path');

const buildEslintCommand = (filenames) => {
  const filesByApp = filenames.reduce(
    (acc, file) => {
      if (file.startsWith('apps/intra/')) {
        acc.intra.push(file);
      } else if (file.startsWith('apps/admin/')) {
        acc.admin.push(file);
      } else {
        acc.root.push(file);
      }
      return acc;
    },
    { intra: [], admin: [], root: [] }
  );

  const commands = [];

  if (filesByApp.intra.length) {
    commands.push(
      `cd apps/intra && eslint --fix ${filesByApp.intra
        .map((f) => path.relative('apps/intra', f))
        .join(' ')}`
    );
  }

  if (filesByApp.admin.length) {
    commands.push(
      `cd apps/admin && eslint --fix ${filesByApp.admin
        .map((f) => path.relative('apps/admin', f))
        .join(' ')}`
    );
  }

  if (filesByApp.root.length) {
    commands.push(
      `eslint --fix ${filesByApp.root.map((f) => path.relative(process.cwd(), f)).join(' ')}`
    );
  }

  return commands;
};

module.exports = {
  '*.{js,jsx,ts,tsx}': buildEslintCommand,
};
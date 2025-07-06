/* eslint-disable */
const path = require('path');

const buildEslintCommand = (filenames) => {
  const filesByApp = filenames.reduce(
    (acc, file) => {
      if (file.startsWith('apps/hiarc/')) {
        acc.hiarc.push(file);
      } else if (file.startsWith('apps/manage/')) {
        acc.manage.push(file);
      } else {
        acc.root.push(file);
      }
      return acc;
    },
    { hiarc: [], manage: [], root: [] }
  );

  const commands = [];

  if (filesByApp.hiarc.length) {
    commands.push(
      `cd apps/hiarc && eslint --fix ${filesByApp.hiarc
        .map((f) => path.relative('apps/hiarc', f))
        .join(' ')}`
    );
  }

  if (filesByApp.manage.length) {
    commands.push(
      `cd apps/manage && eslint --fix ${filesByApp.manage
        .map((f) => path.relative('apps/manage', f))
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
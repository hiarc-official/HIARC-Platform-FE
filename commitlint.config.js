// commitlint.config.js
export default {
  rules: {
    'header-max-length': [2, 'always', 50],
    'scope-empty': [0, 'always'],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'ci', 'refactor', 'test', 'docs', 'chore'],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
  },
  defaultIgnores: true,
};

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Set a saner max-lengths.
    'header-max-length': [2, 'always', 200],
    'body-max-line-length': [2, 'always', 300],

    // Disable requirement to not allow a full stop.
    'subject-full-stop': [0, 'never', '.'],

    // Disable restrictions on subject case.
    'subject-case': [0, 'never', []],
  },
};

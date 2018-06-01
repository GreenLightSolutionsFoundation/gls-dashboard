module.exports = {
  env: {
    jest: true,
    "test": {
      "presets": ["es2015", "stage-0"]
    }
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
  },
};

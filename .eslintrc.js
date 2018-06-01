module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'plugin:vue/essential',
    '@vue/prettier'
  ],
  rules: {
    'prettier/prettier': ['error']
  },
  env: {
    "test": {
      "presets": ["es2015", "stage-0"]
    }
  }
}

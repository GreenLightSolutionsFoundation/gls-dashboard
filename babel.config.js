module.exports = {
  presets: [
    '@vue/app',
    [
      'env',
      {
        targets: {
          node: '6.11',
          browsers: ['> 5% in US', 'last 2 versions'],
        },
        modules: false,
      },
    ],
  ],
  env: {
    test: {
      plugins: ['transform-es2015-modules-commonjs'],
    },
  },
};

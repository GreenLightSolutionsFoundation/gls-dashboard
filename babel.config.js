module.exports = {
  presets: ['@vue/app'],
  env: {
    test: {
      plugins: ['transform-es2015-modules-commonjs'],
    },
  },
};

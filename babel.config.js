module.exports = {
  plugins: ['@babel/transform-runtime'],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { browsers: 'last 2 versions' },
      },
    ],
  ],
};

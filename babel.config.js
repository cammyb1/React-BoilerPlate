module.exports = {
  presets: [['@babel/env', { modules: false }], '@babel/react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/syntax-dynamic-import',
    'add-module-exports',
    'transform-object-entries',
  ],
  env: {
    test: {
      presets: ['@babel/env', '@babel/react'],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/transform-modules-commonjs',
        'dynamic-import-node',
      ],
    },
  },
};

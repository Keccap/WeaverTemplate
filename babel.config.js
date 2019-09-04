const presets = [
  [
    '@babel/env',
    {
      modules: false,
      useBuiltIns: 'usage',
      corejs: 3
    },
  ],
];

const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-optional-chaining'
];

module.exports = {
  presets,
  plugins
};

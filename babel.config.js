module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
  ],
};

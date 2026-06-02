module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    ['module-resolver', {
      alias: {
        '@firebase': './src/services/firebase',
      }
    }]
  ]
};
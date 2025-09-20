module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // ✅ recommended for Expo SDK 50+
    plugins: [
      "react-native-worklets/plugin" // ✅ replaced reanimated plugin
    ],
  };
};

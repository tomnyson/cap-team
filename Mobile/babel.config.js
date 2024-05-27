module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null, // Hoặc blocklist nếu bạn đang sử dụng phiên bản mới hơn của react-native-dotenv
        whitelist: null, // Hoặc allowlist nếu bạn đang sử dụng phiên bản mới hơn của react-native-dotenv
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};

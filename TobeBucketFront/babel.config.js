module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env', // '@env'로 모듈을 import합니다.
          path: '.env',       // 환경 변수 파일 경로
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
};

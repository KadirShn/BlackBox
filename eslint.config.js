const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['.expo-scaffold/**', 'dist/**', 'coverage/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
]);

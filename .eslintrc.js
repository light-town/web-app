module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    semi: ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        useTabs: false,
        arrowParens: 'avoid',
        endOfLine: 'crlf',
      },
    ],
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true,
      },
    ],
  },
};

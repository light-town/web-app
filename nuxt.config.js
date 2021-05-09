export default {
  ssr: true,
  head: {
    title: 'web-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      },
    ],
  },
  css: ['~/assets/css/main.scss'],
  plugins: ['~/plugins/axios', '~/plugins/api'],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'cookie-universal-nuxt',
    'portal-vue/nuxt',
    'nuxt-i18n',
  ],
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
  },
  i18n: {
    locales: [
      { code: 'en', name: 'English (US)', iso: 'en-US', file: 'en-US.json' },
      { code: 'ru', name: 'Русский', iso: 'ru-RU', file: 'ru-RU.json' },
    ],
    lazy: true,
    langDir: '~/locales/',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      onlyOnRoot: true,
    },
  },
};

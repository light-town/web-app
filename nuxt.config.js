export default {
  ssr: true,
  server: {
    port: process.env.PORT,
    host: process.env.HOST,
  },
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
  plugins: ['~/plugins/axios', '~/plugins/api', '~/plugins/i18n'],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg',
  ],
  modules: ['@nuxtjs/axios', 'cookie-universal-nuxt', 'portal-vue/nuxt'],
  build: {},
};

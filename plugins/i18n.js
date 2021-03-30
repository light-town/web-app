import i18next from 'i18next';
import en from '~/locales/en';
import ru from '~/locales/ru';

export default async ({ $cookies }, inject) => {
  const locale = $cookies.get('locale');

  const t = await i18next.init({
    lng: locale,
    fallbackLng: 'en',
    debug: false,
    resources: {
      en,
      ru,
    },
  });

  inject('t', t);
};

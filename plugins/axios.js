export default async ({ $axios }) => {
  $axios.defaults.baseURL = process.env.NUXT_ENV_API_HTTP_URL;
  $axios.defaults.withCredentials = true;

  const response = await $axios.get('/auth/csrf-token');

  $axios.setHeader('X-CSRF-TOKEN', response.data.data['X-CSRF-TOKEN']);
};

export default async ({ $axios, store, redirect }) => {
  $axios.defaults.baseURL = process.env.NUXT_ENV_API_HTTP_URL;
  $axios.defaults.withCredentials = true;

  const response = await $axios.get('/auth/csrf-token');

  $axios.setHeader('X-CSRF-TOKEN', response.data.data['X-CSRF-TOKEN']);

  $axios.interceptors.request.use(req => ({
    ...req,
    headers: {
      ...req.headers,
      Authorization: `Bearer ${store.state.auth.session?.token}`,
    },
  }));

  $axios.interceptors.response.use(res => {
    if (res.status === 401) {
      redirect('/sign-in');
    }
    return res;
  });
};

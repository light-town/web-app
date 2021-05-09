export default async ({ $axios, store, redirect }) => {
  $axios.defaults.withCredentials = true;

  const res = await $axios.get('/auth/csrf-token');
  $axios.setHeader('X-CSRF-Token', res.data.data['X-CSRF-TOKEN']);

  $axios.onRequest(req => {
    return {
      ...req,
      headers: {
        ...req.headers.common,
        Authorization: `Bearer ${store.state.auth.session?.token}`,
      },
    };
  });

  /* $axios.onError(error => {
    if (error.response.status === 401) redirect('/sign-in');
  }); */
};

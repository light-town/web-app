export default async ({ $axios, store, redirect }) => {
  $axios.defaults.withCredentials = true;
  $axios.defaults.refreshed = false;

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

  $axios.interceptors.response.use(null, error => {
    if (error.response.status === 401) {
      return redirect('/sign-in');

      /* if ($axios.defaults.refreshed) {
        $axios.defaults.refreshed = false;
        return Promise.reject(error);
      } */

      /* try {
        const newToken = await this.authService.refresh(session);
        this.authService.authorize(newToken);

        error.config.headers.Authorization = `Bearer ${newToken}`;
      } catch (e) {
        return Promise.reject(e);
      }

      this.#refreshed = true; */

      /* return instance(error.config); */
    } else return Promise.reject(error);
  });
};

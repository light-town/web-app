export default async ({ $axios, store, redirect }) => {
  $axios.interceptors.request.use(req => {
    return {
      ...req,
      headers: {
        ...req.headers,
        Authorization: `Bearer ${store.state.auth.session?.token}`,
      },
    };
  });

  $axios.onError(error => {
    if (error.response.status === 401) {
      redirect('/sign-in');
    }
  });
};

export default ({ app, redirect }) => {
  const sessionUuid = app.store.state.auth.session?.uuid;

  if (!sessionUuid) redirect('/sign-in');
};

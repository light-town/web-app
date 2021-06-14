export default ({ app, redirect }) => {
  const sessionUuid = app.store.state.auth.session?.uuid;

  if (sessionUuid) return;

  redirect('/sign-in');
};

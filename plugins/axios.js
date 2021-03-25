export default ({ $axios }) => {
  $axios.defaults.baseURL = process.env.NUXT_ENV_API_HTTP_URL;
  $axios.defaults.withCredentials = true;
};

import createApi from '~/services';

export default ({ $axios }, inject) => {
  inject('api', createApi($axios));
};

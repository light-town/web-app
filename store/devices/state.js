import * as fetchStatuses from '~/store/fetch-statuses';

export default () => ({
  deviceUuid: null,
  error: null,
  fetchStatus: fetchStatuses.NONE,
});

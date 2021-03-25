export default class AbstractService {
  constructor(options) {
    this.axios = options?.axios;
  }
}

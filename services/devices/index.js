import AbstractService from '../abstract-service';

export default class Devices extends AbstractService {
  getOne(options) {
    return this.axios
      .get(`/devices/${options?.uuid}`)
      .then(response => response.data);
  }

  getAll() {
    return this.axios.get('/devices').then(response => response.data);
  }

  registerDevice({ os }) {
    return this.axios.post('/devices', { os }).then(response => response.data);
  }
}

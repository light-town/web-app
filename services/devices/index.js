import AbstractService from '../abstract-service';

export default class Devices extends AbstractService {
  getAll() {
    return this.axios.get('/devices').then(response => response.data);
  }

  registerDevice({ os }) {
    return this.axios.post('/devices', { os }).then(response => response.data);
  }
}

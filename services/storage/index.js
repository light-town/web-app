import AbstractService from '../abstract-service';

export default class StorageService extends AbstractService {
  async setItem(key, value) {
    await localStorage.setItem(key, value);
  }

  async getItem(key) {
    return await localStorage.getItem(key);
  }

  async removeItem(key) {
    await localStorage.removeItem(key);
  }
}

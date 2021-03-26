import AbstractService from '../abstract-service';

export default class StorageService extends AbstractService {
  setItem(key, value, options) {
    let val = value;

    if (options?.json) val = JSON.stringify(val);

    return Promise.resolve(localStorage.setItem(key, val));
  }

  getItem(key, options) {
    const value = localStorage.getItem(key);

    if (value && options?.parseJson) return JSON.parse(value);

    return Promise.resolve(value);
  }

  removeItem(key) {
    return Promise.resolve(localStorage.removeItem(key));
  }
}

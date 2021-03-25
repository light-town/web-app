import AuthService from './auth';
import DevicesService from './devices';
import StorageService from './storage';

export default axios => ({
  auth: new AuthService({ axios }),
  devices: new DevicesService({ axios }),
  storage: new StorageService(),
});

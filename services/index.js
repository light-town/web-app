import AuthService from './auth';
import DevicesService from './devices';
import StorageService from './storage';
import AccountsService from './accounts';
import SubscriptionsService from './subscriptions';
import KeySetsService from './key-sets';
import VaultsService from './vaults';
import VaultFoldersService from './vault-folders';
import VaultCategoriesService from './vault-categories';

export default axios => ({
  storage: new StorageService(),
  auth: new AuthService({ axios }),
  devices: new DevicesService({ axios }),
  accounts: new AccountsService({ axios }),
  subscriptions: new SubscriptionsService(),
  keySets: new KeySetsService({ axios }),
  vaults: new VaultsService({ axios }),
  vaultFolders: new VaultFoldersService({ axios }),
  vaultCategories: new VaultCategoriesService({ axios }),
});

<template>
  <ui-grid direction="column">
    <slot :items="rows" :loading="loading"></slot>
  </ui-grid>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import core from '@light-town/core';
import { UiGrid } from '@light-town/ui';
import DateFormater from '~/tools/date-formater';

const OPERATIONS = {
  EQUAL: 'equal',
  NOT_EQUAL: 'not',
};

const CRITERIAS = {
  VAULT_NAME: 'vault-name',
  FOLDER_NAME: 'folder-name',
  ITEM_NAME: 'item-name',
};

export default {
  name: 'SearchParamsParser',
  components: {
    UiGrid,
  },
  props: {
    query: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      folders: [],
      items: [],
    };
  },
  computed: {
    ...mapGetters(['currentAccount']),
    ...mapState({
      muk: state => state['key-sets'].masterUnlockKey,
    }),
    rows() {
      return [...this.folders, ...this.items].map(i => ({
        ...i,
        lastUpdatedAt: DateFormater.formatFromString(i.lastUpdatedAt),
        createdAt: DateFormater.formatFromString(i.createdAt),
      }));
    },
    parsedQuery() {
      const regex = /^(\w+)\[([a-zA-Z0-9\- ]+)\]$/u;
      return Object.entries(this.query)
        .map(([queryName, value]) => {
          const matches = queryName.match(regex);

          if (!matches || matches.length !== 3) {
            console.error('invalud key search');
            return {};
          }

          // eslint-disable-next-line no-unused-vars
          const [_, op, criteria] = matches;

          return {
            criteria,
            op,
            value,
          };
        })
        .reduce((prev, val) => ({ ...prev, [val?.criteria]: val }), {});
    },
  },
  watch: {
    query() {
      this.computeResult();
    },
  },
  created() {
    this.computeResult();
  },
  methods: {
    async computeResult() {
      this.loading = true;

      const [
        { data: encKeySets },
        { data: encVaults },
        { data: encVaultFolders },
        { data: encVaultItems },
      ] = await Promise.all([
        this.$api.keySets.getKeySets(this.currentAccount.uuid),
        this.$api.vaults.getVaults(),
        this.$api.vaultFolders.getFolders(),
        this.$api.vaultItems.getItems({
          onlyOverview: true,
        }),
      ]);

      const primaryKeySet =
        await core.helpers.keySets.decryptPrimaryKeySetHelper(
          encKeySets.find(k => k.isPrimary),
          this.muk
        );

      const vaults = (
        await Promise.all(
          encVaults
            .filter(v => v.keySetUuid === primaryKeySet.uuid)
            .map(v =>
              core.helpers.vaults.decryptVaultByPrivateKeyHelper(
                v,
                primaryKeySet.privateKey
              )
            )
        )
      ).filter(
        v =>
          !this.parsedQuery[CRITERIAS.VAULT_NAME] ||
          this.compareBy(
            v.overview.name,
            this.parsedQuery[CRITERIAS.VAULT_NAME].op,
            this.parsedQuery[CRITERIAS.VAULT_NAME].value
          )
      );

      const allFolders = (
        await Promise.all(
          vaults.map(v =>
            core.helpers.vaultFolders.decryptVaultFoldersHelper(
              encVaultFolders
                .filter(f => v.uuid === f.vaultUuid)
                .map(f => ({ ...f, vaultName: v.overview.name })),
              v.key
            )
          )
        )
      ).reduce((prev, val) => [...prev, ...val], []);

      const folders = allFolders
        .filter(
          f =>
            !this.parsedQuery[CRITERIAS.FOLDER_NAME] ||
            this.compareBy(
              f.overview.name,
              this.parsedQuery[CRITERIAS.FOLDER_NAME].op,
              this.parsedQuery[CRITERIAS.FOLDER_NAME].value
            )
        )
        .map(f => ({
          ...f,
          isFolder: true,
          folderName:
            allFolders.find(af => af.uuid === f.parentFolderUuid)?.overview
              .name ?? '',
        }));

      const allItems = (
        await Promise.all(
          vaults.map(v =>
            core.helpers.vaultItems.decryptVaultItemsHelper(
              encVaultItems
                .filter(
                  i =>
                    v.uuid === i.vaultUuid &&
                    ((i.folderUuid &&
                      folders.find(f => f.uuid === i.folderUuid)) ||
                      !this.parsedQuery[CRITERIAS.FOLDER_NAME])
                )
                .map(i => ({ ...i, vaultName: v.overview.name })),
              v.key
            )
          )
        )
      ).reduce((prev, val) => [...prev, ...val], []);

      const items = allItems
        .filter(
          i =>
            !this.parsedQuery[CRITERIAS.ITEM_NAME] ||
            this.compareBy(
              i.overview.name,
              this.parsedQuery[CRITERIAS.ITEM_NAME].op,
              this.parsedQuery[CRITERIAS.ITEM_NAME].value
            )
        )
        .map(i => ({
          ...i,
          isItem: true,
          folderName:
            allFolders.find(af => af.uuid === i.folderUuid)?.overview.name ??
            '',
        }));

      this.folders = !this.parsedQuery[CRITERIAS.ITEM_NAME] ? folders : [];
      this.items = items;
      this.loading = false;
    },
    compareBy(value, op, needs) {
      const regexResult = new RegExp(`^${needs.toLowerCase()}`).test(
        value.toLowerCase()
      );

      return (
        (op === OPERATIONS.EQUAL && regexResult) ||
        (op === OPERATIONS.NOT_EQUAL && !regexResult)
      );
    },
  },
};
</script>

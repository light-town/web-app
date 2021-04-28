<template>
  <ui-grid align-items="center" class="vault-content-search-line">
    <ui-grid align-items="center" class="vault-content-search-line__head">
      <ui-button variant="text" class="vault-content-search-line__btn">
        <loupe-icon class="vault-content-search-line__icon"></loupe-icon>
      </ui-button>
    </ui-grid>
    <ui-token-selector
      v-model="tokens"
      :dropdown-items="currentDropdownItems"
      placeholder="Search or filter results..."
      :hide-dropdown-with-no-items="false"
      :allow-user-defined-tokens="allowUserDefinedTokens"
      :loading="loading"
      :value="tokens"
      class="vault-content-search-line__tokens"
      @token-added="handleTokenAdded"
      @token-removed="handleTokenRemoved"
      @enter="handleEnter"
    >
      <template #token-template="{ token }">
        <ui-token
          :class="[
            'vault-content-search-line__token',
            {
              'vault-content-search-line__token-head':
                token.type === 'criteria' && tokens[0] !== token,
            },
          ]"
          :view-only="token.type !== 'value'"
          @close="handleRemoveTokenBtnClick(token)"
        >
          <ui-grid align-items="center" justify="space-between">
            {{ token.name }}
          </ui-grid>
        </ui-token>
      </template>

      <template #dropdown-item-controls-template="{ dropdownItem }">
        <p>{{ dropdownItem.desc }}</p>
      </template>
    </ui-token-selector>
  </ui-grid>
</template>

<script>
import _ from 'lodash';
import { mapGetters, mapState } from 'vuex';
import core from '@light-town/core';
import * as uuid from 'uuid';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiToken from '~/ui/token/index.vue';
import UiTokenSelector from '~/ui/token-selector/index.vue';
import LoupeIcon from '~/assets/loupe.svg?inline';

export default {
  name: 'SearchVaultContentByTokens',
  components: {
    UiGrid,
    UiButton,
    UiToken,
    UiTokenSelector,
    LoupeIcon,
  },
  data() {
    return {
      loading: false,
      allowUserDefinedTokens: false,
      tokens: [],
      criterias: [
        {
          id: uuid.v4(),
          name: 'Vault name',
          queryName: 'vault-name',
          type: 'criteria',
        },
        {
          id: uuid.v4(),
          name: 'Folder name',
          queryName: 'folder-name',
          type: 'criteria',
        },
        {
          id: uuid.v4(),
          name: 'Item name',
          queryName: 'item-name',
          type: 'criteria',
        },
      ],
      operators: [
        {
          id: uuid.v4(),
          name: '=',
          type: 'operator',
          desc: 'is',
          queryName: 'equal',
        },
        {
          id: uuid.v4(),
          name: '!=',
          type: 'operator',
          desc: 'is not',
          queryName: 'not',
        },
      ],
      currentDropdownItems: [],
    };
  },
  computed: {
    ...mapState({
      muk: state => state['key-sets'].masterUnlockKey,
    }),
    ...mapGetters(['currentAccount']),
  },
  created() {
    this.currentDropdownItems = this.criterias;

    if (this.$route.path !== '/search') return;

    const regex = /^(\w+)\[([a-zA-Z0-9\- ]+)\]$/u;
    Object.entries(this.$route.query).forEach(([queryName, value]) => {
      const matches = queryName.match(regex);

      console.log(matches, queryName);

      if (!matches || matches.length !== 3) {
        console.error('invalud key search');
        return;
      }

      // eslint-disable-next-line no-unused-vars
      const [_, operator, criteria] = matches;

      this.tokens.push(this.criterias.find(c => c.queryName === criteria));
      this.tokens.push(this.operators.find(op => op.queryName === operator));
      this.tokens.push({
        id: uuid.v4(),
        name: value,
        type: 'value',
      });
    });
  },
  methods: {
    handleTokenAdded(token) {
      this.allowUserDefinedTokens = false;
      this.currentDropdownItems = [];

      if (!token.type) token.type = 'value';

      const currentTokenIndex = this.tokens.indexOf(token);

      if (token.type === 'criteria') {
        this.currentDropdownItems = this.getOperators();
      } else if (token.type === 'operator') {
        this.allowUserDefinedTokens = true;
        this.getValues(this.tokens[currentTokenIndex - 1]);
      } else if (token.type === 'value') {
        this.currentDropdownItems = this.criterias;
      }
    },
    handleTokenRemoved(token) {
      this.allowUserDefinedTokens = false;
      this.currentDropdownItems = [];

      const currentTokenIndex = this.tokens.indexOf(token);

      if (token.type === 'criteria') {
        this.currentDropdownItems = this.criterias;
      } else if (token.type === 'operator') {
        this.currentDropdownItems = this.getOperators();
      } else if (token.type === 'value') {
        this.allowUserDefinedTokens = true;
        this.getValues(this.tokens[currentTokenIndex - 2]);
      }
    },
    handleRemoveTokenBtnClick(token) {
      const currentTokenIndex = this.tokens.indexOf(token);

      this.tokens.splice(currentTokenIndex - 2, 3);

      if (!this.tokens.length) this.currentDropdownItems = this.criterias;
    },
    getOperators() {
      return this.operators;
    },
    async getValues(criteria) {
      this.loading = true;

      switch (criteria.name) {
        case 'Vault name': {
          const { data: encKeySets } = await this.$api.keySets.getKeySets(
            this.currentAccount.uuid
          );
          const primaryKeySet = await core.helpers.keySets.decryptPrimaryKeySetHelper(
            encKeySets.find(k => k.isPrimary),
            this.muk
          );
          const { data: encVaults } = await this.$api.vaults.getVaults();
          const vault = await core.helpers.vaults.decryptVaultByPrivateKeyHelper(
            encVaults.find(v => v.keySetUuid === primaryKeySet.uuid),
            primaryKeySet.privateKey
          );

          this.currentDropdownItems = [
            { id: vault.uuid, name: vault.overview.name, type: 'value' },
          ];
          break;
        }
        case 'Folder name': {
          const { data: encKeySets } = await this.$api.keySets.getKeySets(
            this.currentAccount.uuid
          );
          const primaryKeySet = await core.helpers.keySets.decryptPrimaryKeySetHelper(
            encKeySets.find(k => k.isPrimary),
            this.muk
          );
          const { data: encVaults } = await this.$api.vaults.getVaults();
          const vault = await core.helpers.vaults.decryptVaultByPrivateKeyHelper(
            encVaults.find(v => v.keySetUuid === primaryKeySet.uuid),
            primaryKeySet.privateKey
          );
          const {
            data: encVaultFolders,
          } = await this.$api.vaultFolders.getFolders();

          const folders = await core.helpers.vaultFolders.decryptVaultFoldersHelper(
            encVaultFolders.filter(f => f.vaultUuid === vault.uuid),
            vault.key
          );

          this.currentDropdownItems = _.uniqWith(
            folders,
            (a, b) => a.overview.name === b.overview.name
          ).map(f => ({
            id: f.uuid,
            name: f.overview.name,
            type: 'value',
          }));
          break;
        }
        case 'Item name': {
          const { data: encKeySets } = await this.$api.keySets.getKeySets(
            this.currentAccount.uuid
          );
          const primaryKeySet = await core.helpers.keySets.decryptPrimaryKeySetHelper(
            encKeySets.find(k => k.isPrimary),
            this.muk
          );
          const { data: encVaults } = await this.$api.vaults.getVaults();
          const vault = await core.helpers.vaults.decryptVaultByPrivateKeyHelper(
            encVaults.find(v => v.keySetUuid === primaryKeySet.uuid),
            primaryKeySet.privateKey
          );
          const { data: encVaultItems } = await this.$api.vaultItems.getItems({
            onlyOverview: true,
          });

          const items = await core.helpers.vaultItems.decryptVaultItemsHelper(
            encVaultItems.filter(i => i.vaultUuid === vault.uuid),
            vault.key
          );

          this.currentDropdownItems = _.uniqWith(
            items,
            (a, b) => a.overview.name === b.overview.name
          ).map(i => ({
            id: i.uuid,
            name: i.overview.name,
            type: 'value',
          }));
          break;
        }
      }

      this.loading = false;
    },
    handleEnter() {
      let options = '';

      for (let i = 0; i < this.tokens.length; i += 3) {
        const criteria = this.tokens[i].queryName;
        const operator = this.tokens[i + 1].queryName;
        const value = this.tokens[i + 2].name;

        options += `&${operator}[${criteria}]=${value}`;
      }

      this.$router.push(`/search?${options}`);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

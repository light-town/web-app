<template>
  <ui-token-selector
    v-model="tokens"
    :dropdown-items="currentDropdownItems"
    placeholder="Search or filter results..."
    :hide-dropdown-with-no-items="false"
    :allow-user-defined-tokens="false"
    :loading="true"
    @token-added="handleTokenAdded"
    @token-removed="handleTokenRemoved"
  >
    <template #token-content="{ token }">
      <ui-token
        :class="{
          'search-teams-by-tokens__token-head':
            token.type === 'criteria' && tokens[0] !== token,
        }"
        :view-only="token.type !== 'value'"
        @close="handleRemoveTokenBtnClick(token)"
      >
        <ui-grid align-items="center" justify="space-between">
          {{ token.name }}
        </ui-grid>
      </ui-token>
    </template>

    <template #dropdown-item-content="{ dropdownItem }">
      <ui-button variant="text" class="ui-token-selector__dropdown-item-btn">
        <ui-grid align-items="center" justify="space-between">
          <ui-grid align-items="center"
            ><p>{{ dropdownItem.name }}</p></ui-grid
          >
          <ui-grid
            align-items="center"
            justify="flex-end"
            class="search-teams-by-tokens__dropdown-item-desc"
          >
            <p>{{ dropdownItem.desc }}</p>
          </ui-grid>
        </ui-grid>
      </ui-button>
    </template>
  </ui-token-selector>
</template>

<script>
import * as uuid from 'uuid';
import UiGrid from '~/ui/grid/index.vue';
import UiToken from '~/ui/token/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiTokenSelector from '~/ui/token-selector/index.vue';

export default {
  name: 'SearchTeamsByTokens',
  components: {
    UiButton,
    UiToken,
    UiTokenSelector,
    UiGrid,
  },
  data() {
    return {
      tokens: [],
      criterias: [
        { id: 1, name: 'Folder name', type: 'criteria' },
        { id: 2, name: 'Item name', type: 'criteria' },
        { id: 3, name: 'Owner', type: 'criteria' },
      ],
      currentDropdownItems: [],
    };
  },
  created() {
    this.currentDropdownItems = this.criterias;
  },
  methods: {
    handleTokenAdded(token) {
      if (token.type === 'criteria') {
        this.currentDropdownItems = this.getOperators();
      } else if (token.type === 'operator') {
        this.currentDropdownItems = this.getValues();
      } else if (token.type === 'value') {
        this.currentDropdownItems = this.criterias;
      }
    },
    handleTokenRemoved(token) {
      if (token.type === 'criteria') {
        this.currentDropdownItems = this.criterias;
      } else if (token.type === 'operator') {
        this.currentDropdownItems = this.getOperators();
      } else if (token.type === 'value') {
        this.currentDropdownItems = this.getValues();
      }
    },
    handleRemoveTokenBtnClick(_, token) {
      const currentTokenIndex = this.tokens.indexOf(token);

      this.tokens.splice(currentTokenIndex - 2, 3);

      if (!this.tokens.length) this.currentDropdownItems = this.criterias;
    },
    /* handle(token); */
    getOperators() {
      return [
        { id: uuid.v4(), name: '=', type: 'operator', desc: 'is' },
        { id: uuid.v4(), name: '!=', type: 'operator', desc: 'is not' },
      ];
    },
    getValues() {
      return [
        { id: uuid.v4(), name: 'Vault', type: 'value' },
        { id: uuid.v4(), name: 'Vault 2', type: 'value' },
        { id: uuid.v4(), name: 'Vault 3', type: 'value' },
        { id: uuid.v4(), name: 'Vault 4', type: 'value' },
        { id: uuid.v4(), name: 'Vault 5', type: 'value' },
        { id: uuid.v4(), name: 'Vault 6', type: 'value' },
        { id: uuid.v4(), name: 'Vault 7', type: 'value' },
        { id: uuid.v4(), name: 'Vault 8', type: 'value' },
        { id: uuid.v4(), name: 'Vault 9', type: 'value' },
        { id: uuid.v4(), name: 'Vault 9.1', type: 'value' },
        { id: uuid.v4(), name: 'Vault 9.2', type: 'value' },
      ];
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

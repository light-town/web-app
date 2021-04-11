<template>
  <ui-grid
    align-items="center"
    :class="[
      'ui-token-selector',
      {
        'ui-token-selector_focus': isFocus,
      },
    ]"
    @click.native="handleGlobalClick"
    @keydown.native="handleGlobalKeyDown"
  >
    <ui-grid
      v-for="token in tokens"
      :key="token.id"
      tabindex="-1"
      class="ui-token-selector__token"
      @keydown.native="handleGlobalKeyDown"
    >
      <slot
        name="token-content"
        :token="token"
        :handleCloseBtnClick="handleCloseBtnClick"
      >
        <ui-token @close="handleCloseBtnClick(token)">
          {{ token.name }}
        </ui-token>
      </slot>
    </ui-grid>

    <input
      ref="input"
      v-model="inputText"
      type="text"
      class="ui-token-selector__input"
      :placeholder="tokens.length ? '' : placeholder"
      @keydown="handleInputKeyDown"
    />

    <ui-popup
      :open="Boolean(anchor)"
      :anchor="{ root: anchor }"
      position="left-bottom"
      @close="closeDropdown"
    >
      <ui-grid
        ref="dropdown"
        direction="column"
        class="ui-token-selector__dropdown"
        @keydown.native="handleGlobalKeyDown"
      >
        <template v-if="remainingDropdownItems.length">
          <ui-grid
            v-for="dropdownItem in remainingDropdownItems"
            :key="dropdownItem.id"
            tabindex="-1"
            class="ui-token-selector__dropdown-item"
            :data-index="dropdownItem.id"
            @click="handleDropdownItemClick(dropdownItem)"
          >
            <slot name="dropdown-item-content" :dropdownItem="dropdownItem">
              <ui-button
                variant="text"
                class="ui-token-selector__dropdown-item-btn"
              >
                {{ dropdownItem.name }}
              </ui-button>
            </slot>
          </ui-grid>
        </template>
        <template v-else-if="allowUserDefinedTokens && inputText.length">
          <slot name="user-defined-token-content" :inputText="inputText">
            <ui-grid tabindex="-1" class="ui-token-selector__dropdown-item">
              <ui-button
                variant="text"
                class="ui-token-selector__dropdown-item-btn"
              >
                Add "{{ inputText }}"
              </ui-button>
            </ui-grid>
          </slot>
        </template>
        <template v-else-if="loading">
          <slot name="loading-content">
            <ui-grid
              class="ui-token-selector__dropdown-item-loading"
              align-items="center"
              justify="center"
            >
              <ui-loading></ui-loading>
            </ui-grid>
          </slot>
        </template>
        <template v-else>
          <slot name="no-results-content">
            <ui-grid class="ui-token-selector__dropdown-item-empty">
              <p>No matches found</p>
            </ui-grid>
          </slot>
        </template>
      </ui-grid>
    </ui-popup>
  </ui-grid>
</template>

<script>
import * as uuid from 'uuid';
import UiGrid from '~/ui/grid/index.vue';
import UiToken from '~/ui/token/index.vue';
import UiPopup from '~/ui/popup/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiLoading from '~/ui/loading/index.vue';

export default {
  name: 'UiTokenSelector',
  components: {
    UiGrid,
    UiToken,
    UiPopup,
    UiButton,
    UiLoading,
  },
  props: {
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    dropdownItems: {
      type: Array,
      required: true,
    },
    hideDropdownWithNoItems: {
      type: Boolean,
      requred: false,
      defualt: false,
    },
    allowUserDefinedTokens: {
      type: Boolean,
      requred: false,
      defualt: false,
    },
    loading: {
      type: Boolean,
      requred: false,
      defualt: false,
    },
  },
  data() {
    return {
      isFocus: false,
      inputText: '',
      anchor: null,
      tokens: [],
    };
  },
  computed: {
    remainingDropdownItems() {
      return this.dropdownItems.filter(
        i =>
          !this.tokens.find(t => t.id === i.id) &&
          (!this.inputText.length || i.name.includes(this.inputText))
      );
    },
  },
  mounted() {
    this.isFocus = document.activeElement === this.$refs?.input;
  },
  updated() {
    this.isFocus = document.activeElement === this.$refs?.input;
  },
  methods: {
    addToken(token) {
      this.tokens.push(token);

      this.$emit('token-added', token);
      this.$emit('input', this.tokens);
    },
    removeToken(token) {
      this.tokens = this.tokens.filter(t => t !== token);

      this.$emit('token-removed', token);
      this.$emit('input', this.tokens);
    },
    openDropdown() {
      if (!this.remainingDropdownItems.length && this.hideDropdownWithNoItems)
        return;

      this.anchor = this.$refs.input;
    },
    closeDropdown() {
      this.anchor = null;
    },
    clearTextInput() {
      this.inputText = '';
    },
    handleDropdownItemClick(dropdownItem) {
      this.closeDropdown();

      this.clearTextInput();

      this.addToken(dropdownItem);
    },
    handleEnterKeyPress() {
      const existsToken = this.dropdownItems.find(
        i => i.name === this.inputText
      );

      if (existsToken) {
        this.addToken(existsToken);
      } else if (this.allowUserDefinedTokens) {
        this.addToken({ id: uuid.v4(), name: this.inputText });
      } else return;

      this.setTextInputFocus();

      this.clearTextInput();
    },
    handleCloseBtnClick(token) {
      this.removeToken(token);

      this.closeDropdown();
    },
    handleGlobalClick() {
      this.setTextInputFocus();

      this.openDropdown();
    },
    handleGlobalKeyDown(e) {
      if (!this.anchor || !['ArrowUp', 'ArrowDown', 'Enter'].includes(e.code))
        return;

      if (
        e.code === 'Enter' &&
        this.allowUserDefinedTokens &&
        this.inputText.length &&
        !this.remainingDropdownItems.length
      ) {
        this.addToken({ id: uuid.v4(), name: this.inputText });
        this.clearTextInput();
        this.setTextInputFocus();
        return;
      }

      e.preventDefault();

      const currentFocusedItem = this.$refs.dropdown.$el.querySelector(
        '.ui-token-selector__dropdown-item:focus'
      );

      if (!currentFocusedItem) {
        this.$refs.dropdown.$el
          .querySelector('.ui-token-selector__dropdown-item')
          ?.focus();
        return;
      }

      if (e.code === 'ArrowUp') {
        if (!currentFocusedItem.previousSibling) {
          this.setTextInputFocus();
        } else {
          currentFocusedItem.previousSibling.focus();
        }
      } else if (e.code === 'ArrowDown' && currentFocusedItem.nextSibling) {
        currentFocusedItem.nextSibling.focus();
      } else if (e.code === 'Enter') {
        const currentItemIndex = currentFocusedItem.getAttribute('data-index');

        const currentItem = this.remainingDropdownItems.find(
          i => i.id.toString() === currentItemIndex
        );

        this.addToken(currentItem);
        this.clearTextInput();
        this.setTextInputFocus();
      }
    },
    handleInputKeyDown(e) {
      if (
        e.code !== 'Backspace' ||
        this.inputText.length ||
        !this.tokens.length
      )
        return;

      const removedToken = this.tokens[this.tokens.length - 1];
      this.inputText = removedToken.name;

      this.removeToken(removedToken);
    },
    setTextInputFocus() {
      this.$refs.input.focus();
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

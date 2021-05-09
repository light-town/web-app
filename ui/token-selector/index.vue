<template>
  <ui-grid
    align-items="center"
    :class="[
      'ui-token-selector',
      {
        'ui-token-selector_focus': isFocus,
      },
    ]"
    tabindex="0"
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
        name="token-template"
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
      @blur="handleBlurInput"
    />

    <ui-popup v-if="Boolean(root)" :anchor="{ root }" position="left-bottom">
      <ui-menu
        ref="menu"
        :focusable="false"
        @keydown.native="handleGlobalKeyDown"
      >
        <template v-if="allowUserDefinedTokens && inputText.length && !loading">
          <slot name="user-defined-token-template" :inputText="inputText">
            <ui-menu-item
              id="user-defined-token"
              tabindex="-1"
              @click="handleDropdownItemClick(dropdownItem)"
            >
              <template #text> Add "{{ inputText }}" </template>
            </ui-menu-item>
          </slot>
        </template>
        <template v-if="remainingDropdownItems.length">
          <ui-menu-item
            v-for="dropdownItem in remainingDropdownItems"
            :id="dropdownItem.id"
            :key="dropdownItem.id"
            :data-index="dropdownItem.id"
            @click="handleDropdownItemClick(dropdownItem)"
          >
            <template #icon>
              <slot
                name="dropdown-item-icon-template"
                :dropdownItem="dropdownItem"
              >
              </slot>
            </template>
            <template #text>
              <slot
                name="dropdown-item-text-template"
                :dropdownItem="dropdownItem"
              >
                {{ dropdownItem.name }}
              </slot>
            </template>
            <template #controls>
              <slot
                name="dropdown-item-controls-template"
                :dropdownItem="dropdownItem"
              >
              </slot>
            </template>
          </ui-menu-item>
        </template>
        <template v-else-if="loading">
          <slot name="loading-template">
            <ui-menu-loading> </ui-menu-loading>
          </slot>
        </template>
        <template v-else-if="!allowUserDefinedTokens">
          <slot name="no-results-template">
            <ui-menu-item id="no-matches-found">
              <template #text> No matches found </template>
            </ui-menu-item>
          </slot>
        </template>
      </ui-menu>
    </ui-popup>
  </ui-grid>
</template>

<script>
import * as uuid from 'uuid';
import UiGrid from '~/ui/grid/index.vue';
import UiToken from '~/ui/token/index.vue';
import UiPopup from '~/ui/portal/index.vue';
import UiMenu from '~/ui/menu/index.vue';
import UiMenuItem from '~/ui/menu/item.vue';
import UiMenuLoading from '~/ui/menu/loading.vue';

export default {
  name: 'UiTokenSelector',
  components: {
    UiGrid,
    UiToken,
    UiPopup,
    UiMenuLoading,
    UiMenu,
    UiMenuItem,
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
    value: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      isFocus: false,
      inputText: '',
      root: null,
      tokens: [],
    };
  },
  computed: {
    remainingDropdownItems() {
      const re = new RegExp(`^${this.inputText.toLowerCase()}`);
      return this.dropdownItems.filter(
        i =>
          !this.tokens.find(t => t.id === i.id) &&
          (!this.inputText.length || re.test(i.name.trim().toLowerCase()))
      );
    },
  },
  watch: {
    value() {
      this.tokens = this.value;
    },
  },
  created() {
    this.tokens = this.value;
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

      this.$emit('input', this.tokens);
      this.$emit('token-added', token);
    },
    removeToken(token) {
      this.tokens = this.tokens.filter(t => t !== token);

      this.$emit('input', this.tokens);
      this.$emit('token-removed', token);
    },
    openDropdown() {
      if (!this.remainingDropdownItems.length && this.hideDropdownWithNoItems)
        return;

      this.root = this.$refs.input;

      const root = document.getElementById('app-page-content');
      root.addEventListener('click', this.closeDropdown, {
        once: true,
        capture: true,
      });
      root.addEventListener('contextmenu', this.closeDropdown, {
        once: true,
        capture: true,
      });

      window.addEventListener('blur', this.close, { once: true });
    },
    closeDropdown(e) {
      if (!this.$refs.menu) return;

      this.$refs.menu.close();
      this.$nextTick(() => {
        this.root = null;
        this.$emit('close', e);
      });
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
      if (!this.root || !['ArrowUp', 'ArrowDown', 'Enter'].includes(e.code))
        return;

      if (
        e.code === 'Enter' &&
        this.allowUserDefinedTokens &&
        this.inputText
          .length /* &&
        !this.remainingDropdownItems.length */
      ) {
        this.addToken({ id: uuid.v4(), name: this.inputText });
        this.clearTextInput();
        this.setTextInputFocus();
        return;
      }

      e.preventDefault();

      if (e.code === 'ArrowUp') {
        if (
          !this.$refs.menu.hasPreviousItem(this.$refs.menu.context.activeItemId)
        ) {
          this.$refs.menu.setActiveItem(null);
        } else {
          this.$refs.menu.setActiveItem(
            this.$refs.menu.getPreviousItem(
              this.$refs.menu.context.activeItemId
            ).id
          );
        }
      } else if (e.code === 'ArrowDown') {
        if (!this.$refs.menu.context.activeItemId)
          this.$refs.menu.setActiveItem(this.$refs.menu.context.items[0].id);
        else if (
          this.$refs.menu.hasNextItem(this.$refs.menu.context.activeItemId)
        )
          this.$refs.menu.setActiveItem(
            this.$refs.menu.getNextItem(this.$refs.menu.context.activeItemId).id
          );
      } else if (e.code === 'Enter') {
        const currentItemId = this.$refs.menu.getActiveItem()?.id;

        const currentItem = this.remainingDropdownItems.find(
          i => i.id === currentItemId
        );

        if (!currentItem) {
          if (!this.inputText.length) this.$emit('enter', e);
          return;
        }

        this.addToken(currentItem);
        this.clearTextInput();

        this.$nextTick(() => {
          this.$refs.menu.setActiveItem(this.$refs.menu.context.items[0]?.id);
        });
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
    handleBlurInput() {
      if (!this.inputText.length || !this.allowUserDefinedTokens) return;

      this.addToken({ id: uuid.v4(), name: this.inputText });
      this.clearTextInput();
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

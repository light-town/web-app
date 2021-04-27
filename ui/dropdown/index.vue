<template>
  <ui-grid aligh-items="center" class="ui-dropdown">
    <slot name="anchor" :open="open" :opened="Boolean(root)">
      <ui-button variant="text" @click="open">{{ title }}</ui-button>
    </slot>
    <ui-portal v-if="Boolean(root)" :anchor="{ root }" position="left-bottom">
      <ui-menu ref="menu">
        <template v-if="items.length">
          <template v-for="item in items">
            <slot
              name="dropdown-item-template"
              :item="item"
              :click="handleMenuItemClick.bind(this, item)"
            >
              <ui-menu-item :id="item.name" @click="handleMenuItemClick(item)">
                <template #text>
                  {{ item.name }}
                </template>
              </ui-menu-item>
            </slot>
          </template>
        </template>
        <template v-else-if="loading">
          <slot name="loading">
            <ui-menu-loading></ui-menu-loading>
          </slot>
        </template>
        <template v-else>
          <slot name="empty">
            <ui-menu-item id="empty-menu-item">
              <template #text>
                {{ $t('Empty') }}
              </template>
            </ui-menu-item>
          </slot>
        </template>
      </ui-menu>
    </ui-portal>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiPortal from '~/ui/portal/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiMenu from '~/ui/menu/index.vue';
import UiMenuItem from '~/ui/menu/item.vue';
import UiMenuLoading from '~/ui/menu/loading.vue';

export default {
  name: 'UiDropdown',
  components: {
    UiGrid,
    UiPortal,
    UiButton,
    UiMenu,
    UiMenuItem,
    UiMenuLoading,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return { root: null, request: false };
  },
  mounted() {
    window.addEventListener('blur', this.close);
  },
  beforeDestroy() {
    window.removeEventListener('blur', this.close);
  },
  methods: {
    handlePopupClose() {
      this.close();
    },
    handleMenuItemClick(item, event) {
      this.$emit('dropdown-item-click', item, event);
      this.close();
    },
    open(e) {
      if (this.root) {
        this.close();
        this.$nextTick(() => {
          this.$nextTick(() => {
            this.open(e);
          });
        });
        return;
      }

      this.root = e.currentTarget;

      this.$emit('open');

      const root = document.getElementsByClassName('page-layout')[0];
      root.addEventListener('click', this.close, {
        once: true,
        capture: true,
      });
      root.addEventListener('contextmenu', this.close, {
        once: true,
        capture: true,
      });
    },
    close(e) {
      if (!this.$refs.menu || !this.root) return;

      this.$refs.menu.close();
      this.$nextTick(() => {
        this.root = null;
        this.$emit('close', e);
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

<template>
  <ui-grid aligh-items="center" class="ui-dropdown">
    <slot name="anchor" :open="open" :opened="Boolean(root)">
      <ui-button variant="text" @click="open">{{ title }}</ui-button>
    </slot>
    <ui-portal v-if="Boolean(root)" :anchor="{ root }" position="left-bottom">
      <ui-menu ref="menu">
        <template v-if="loading">
          <slot name="loading">
            <ui-menu-loading></ui-menu-loading>
          </slot>
        </template>
        <template v-else>
          <slot name="dropdown-items" :close="close"> </slot>
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
import UiMenuLoading from '~/ui/menu/loading.vue';

export default {
  name: 'UiDropdown',
  components: {
    UiGrid,
    UiPortal,
    UiButton,
    UiMenu,
    UiMenuLoading,
  },
  props: {
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
    return { root: null };
  },
  methods: {
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

      const root = document.getElementById('app-page-layout');
      root.addEventListener('click', this.close, {
        once: true,
        capture: true,
      });
      root.addEventListener('contextmenu', this.close, {
        once: true,
        capture: true,
      });

      window.addEventListener('blur', this.close, { once: true });
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

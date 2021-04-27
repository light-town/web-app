<template>
  <ui-grid>
    <slot
      name="anchor"
      :selectedItem="selected"
      :opened="Boolean(root)"
      :open="open"
    >
    </slot>
    <ui-portal v-if="Boolean(root)" :anchor="{ root }" position="left-bottom">
      <ui-menu ref="menu" class="ui-select__items">
        <template v-if="items.length">
          <template v-for="item in items">
            <slot
              name="item-template"
              :item="item"
              :selectedItem="selected"
              :select="handleItemClick.bind(this, item)"
            >
              <ui-menu-item :id="item.name" @click="handleItemClick(item)">
                <template #text>
                  {{ item.name }}
                </template>
              </ui-menu-item>
            </slot>
          </template>
        </template>
        <template v-else-if="loading">
          <slot name="loading-template">
            <ui-menu-loading></ui-menu-loading>
          </slot>
        </template>
        <template v-else>
          <slot name="empty-template"></slot>
        </template>
      </ui-menu>
    </ui-portal>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiPortal from '~/ui/portal/index.vue';
import UiMenu from '~/ui/menu/index.vue';
import UiMenuItem from '~/ui/menu/item.vue';
import UiMenuLoading from '~/ui/menu/loading.vue';

export default {
  name: 'UiSelect',
  components: {
    UiGrid,
    UiPortal,
    UiMenu,
    UiMenuLoading,
    UiMenuItem,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return { root: null, selected: null };
  },
  watch: {
    value() {
      this.selected = this.value;
    },
  },
  created() {
    this.selected = this.value;
  },
  mounted() {
    window.addEventListener('blur', this.close);
  },
  beforeDestroy() {
    window.removeEventListener('blur', this.close);
  },
  methods: {
    handleItemClick(item) {
      this.selected = item;

      this.$emit('input', this.selected);
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

      this.$nextTick(() => {
        this.$nextTick(() => {
          this.$refs.menu.setActiveItem(this.selected.name);
        });
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

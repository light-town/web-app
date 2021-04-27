<template>
  <ui-grid>
    <slot> </slot>
    <ui-portal v-if="Boolean(root)" :anchor="{ root }" :x="x" :y="y">
      <ui-menu ref="menu" @menu-item-click="handleItemClick">
        <slot name="menu-items"></slot>
      </ui-menu>
    </ui-portal>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiPortal from '~/ui/portal/index.vue';
import UiMenu from '~/ui/menu/index.vue';

export default {
  name: 'UiContextMenu',
  components: {
    UiGrid,
    UiPortal,
    UiMenu,
  },
  data() {
    return { x: 0, y: 0, root: null };
  },
  mounted() {
    const anchor = this.$slots.default[0].componentInstance;
    anchor.$on('contextmenu', this.open);

    window.addEventListener('blur', this.close);

    const root = document.getElementsByClassName('page-layout')[0];
    root.addEventListener('click', this.close, {
      capture: true,
    });
    root.addEventListener('contextmenu', this.close, {
      capture: true,
    });
  },
  beforeDestroy() {
    const anchor = this.$slots.default[0].componentInstance;
    anchor.$off('contextmenu', this.open);

    window.removeEventListener('blur', this.close);

    const root = document.getElementsByClassName('page-layout')[0];
    root.removeEventListener('click', this.close, {
      capture: true,
    });
    root.removeEventListener('contextmenu', this.close, {
      capture: true,
    });
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

      this.x = e.pageX;
      this.y = e.pageY;
      this.root = e.target;

      const anchor = this.$slots.default[0].componentInstance;
      anchor._data.opened = true;
    },
    close(e) {
      if (!this.$refs.menu) return;

      this.$refs.menu.close();
      this.$nextTick(() => {
        this.x = 0;
        this.y = 0;
        this.root = null;
        this.$emit('close', e);
      });
    },
    handleItemClick(e) {
      this.$emit('menu-item-click', e);
      this.close(e);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

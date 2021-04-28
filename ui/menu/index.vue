<template>
  <ui-grid
    component="ul"
    direction="column"
    class="ui-menu"
    :tabindex="focusable ? 0 : -1"
    @keydown.native="hadnleKeyDown"
  >
    <slot></slot>
  </ui-grid>
</template>

<script>
import * as uuid from 'uuid';
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'UiMenu',
  components: {
    UiGrid,
  },
  provide() {
    return {
      _menuContext: this.context,
    };
  },
  props: {
    rootMenuRef: {
      type: Object,
      required: false,
      default: null,
    },
    focusable: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      context: {
        root: this,
        items: [],
        activeItemId: null,
        isAvailableShowing: false,
      },
    };
  },
  mounted() {
    this.context.items = (this.$slots.default || [])
      .filter(i => i.componentInstance)
      .map(({ componentInstance: vm }) => {
        const id = vm.id ?? uuid.v4();
        const mouseEnterHandler = this.handleItemEnter.bind(this, vm);
        const mouseLeaveHandler = this.handleItemLeave.bind(this, vm);

        vm.$on('mouseenter', mouseEnterHandler);
        vm.$on('mouseleave', mouseLeaveHandler);
        vm.$on(
          vm.existsSubmenu ? 'menu-item-click' : 'click',
          vm.existsSubmenu ? this.handleMenuItemClick : this.handleItemClick
        );

        if (!vm.id) vm.id = id;

        return {
          id,
          vm,
          mouseEnterHandler,
          mouseLeaveHandler,
        };
      });

    this.$nextTick(() => {
      this.context.activeItemId =
        this.context.items.length &&
        !this.context.items[0].vm.existsSubmenu &&
        this.context.items[0].id
          ? this.context.items[0].id
          : null;

      if (!this.rootMenuRef && this.focusable) this.$el.focus();
    });
  },
  updated() {
    /*  if (this.context.items.length) this.close(); */

    this.context.items = (this.$slots.default || [])
      .filter(i => i.componentInstance)
      .map(({ componentInstance: vm }) => {
        const id = vm.id ?? uuid.v4();
        const mouseEnterHandler = this.handleItemEnter.bind(this, vm);
        const mouseLeaveHandler = this.handleItemLeave.bind(this, vm);

        vm.$on('mouseenter', mouseEnterHandler);
        vm.$on('mouseleave', mouseLeaveHandler);
        vm.$on(
          vm.existsSubmenu ? 'menu-item-click' : 'click',
          vm.existsSubmenu ? this.handleMenuItemClick : this.handleItemClick
        );

        if (!vm.id) vm.id = id;

        return {
          id,
          vm,
          mouseEnterHandler,
          mouseLeaveHandler,
        };
      });

    this.$nextTick(() => {
      this.context.activeItemId =
        this.context.items.length &&
        !this.context.items[0].vm.existsSubmenu &&
        this.context.items[0].id
          ? this.context.items[0].id
          : null;

      if (!this.rootMenuRef && this.focusable) this.$el.focus();
    });
  },
  methods: {
    handleItemEnter(vm) {
      if (this.context.activeItemId === vm.id) return;

      this.closeSubmenus();

      this.context.activeItemId = vm.id;
      this.context.isAvailableShowing = true;

      this.$nextTick(() => {
        this.$nextTick(() => {
          const currentItem = this.context.items.find(
            i => i.id === this.context.activeItemId
          );

          if (currentItem?.vm.$refs.submenu)
            currentItem.vm.$refs.submenu?.$el.focus();
          else this.$el.focus();
        });
      });
    },
    handleItemLeave(vm) {
      if (vm.existsSubmenu) {
        return;
      }

      this.context.activeItemId = null;
    },
    handleItemClick() {
      const vm = this.context.items.find(
        i => i.id === this.context.activeItemId
      )?.vm;

      this.$emit('menu-item-click', vm);
    },
    handleMenuItemClick(e) {
      this.$emit('menu-item-click', e);
    },
    hadnleKeyDown(e) {
      this.context.isAvailableShowing = false;

      let currentIndex = this.context.items.findIndex(
        i => i.id === this.context.activeItemId
      );

      switch (e.code) {
        case 'ArrowDown': {
          do {
            ++currentIndex;
            if (currentIndex >= this.context.items.length) currentIndex = 0;
          } while (!this.context.items[currentIndex].vm.$options.activable);

          this.context.activeItemId = this.context.items[currentIndex].id;

          e.preventDefault();
          break;
        }
        case 'ArrowUp': {
          do {
            --currentIndex;
            if (currentIndex < 0) currentIndex = this.context.items.length - 1;
          } while (!this.context.items[currentIndex].vm.$options.activable);

          this.context.activeItemId = this.context.items[currentIndex].id;
          e.preventDefault();
          break;
        }
        case 'ArrowRight': {
          this.context.isAvailableShowing = true;

          this.$nextTick(() => {
            this.$nextTick(() => {
              this.context.items[currentIndex]?.vm.$refs.submenu?.$el.focus();
            });
          });
          e.preventDefault();
          break;
        }
        case 'ArrowLeft': {
          this.context.isAvailableShowing = false;
          this.context.activeItemId = null;

          this.$nextTick(() => {
            this.$nextTick(() => {
              if (!this.rootMenuRef) return;

              const rootMenu = this.rootMenuRef;

              rootMenu.$el.focus();
              rootMenu.context.isAvailableShowing = false;
            });
          });
          e.preventDefault();
          break;
        }
        case 'Enter': {
          this.context.items[currentIndex]?.vm.$el.click();
          e.preventDefault();
          break;
        }
      }
    },
    close() {
      this.context.items.forEach(i => {
        i.vm.$off('mouseenter', i.mouseEnterHandler);
        i.vm.$off('mouseleave', i.mouseLeaveHandler);
        i.vm.$off(
          i.vm.existsSubmenu ? 'menu-item-click' : 'click',
          i.vm.existsSubmenu ? this.handleMenuItemClick : this.handleItemClick
        );

        if (i.vm.$refs.submenu) {
          i.vm.$refs.submenu.close();
          i.vm.$refs.submenu.$destroy();
          return;
        }
        i.vm.$destroy();
      });
    },
    closeSubmenus() {
      this.context.items.forEach(i => {
        if (i.vm.$refs.submenu) {
          i.vm.$refs.submenu.close();
          i.vm.$refs.submenu.$destroy();
        }
      });
    },
    setActiveItem(id) {
      this.context.activeItemId = id;
    },
    getItem(id) {
      return this.context.items.find(i => i.id === id);
    },
    getActiveItem() {
      return this.context.items.find(i => i.id === this.context.activeItemId);
    },
    hasNextItem(id) {
      const activableItems = this.context.items.filter(
        i => i.vm.$options.activable
      );

      for (let i = 0; i < activableItems.length; ++i) {
        if (activableItems[i].id === id) {
          return i + 1 < activableItems.length;
        }
      }

      return false;
    },
    getNextItem(id) {
      const activableItems = this.context.items.filter(
        i => i.vm.$options.activable
      );

      for (let i = 0; i < activableItems.length; ++i) {
        if (activableItems[i].id === id && i + 1 < activableItems.length) {
          return activableItems[i + 1];
        }
      }
    },
    hasPreviousItem(id) {
      const activableItems = this.context.items.filter(
        i => i.vm.$options.activable
      );

      for (let i = 0; i < activableItems.length; ++i) {
        if (activableItems[i].id === id) {
          return i - 1 >= 0;
        }
      }

      return false;
    },
    getPreviousItem(id) {
      const activableItems = this.context.items.filter(
        i => i.vm.$options.activable
      );

      for (let i = 0; i < activableItems.length; ++i) {
        if (activableItems[i].id === id && i - 1 >= 0) {
          return activableItems[i - 1];
        }
      }
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

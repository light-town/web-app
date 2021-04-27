<template>
  <ui-grid
    v-if="!forceClose"
    :class="['ui-popup', { 'ui-popup_visible': show }]"
    direction="column"
    :style="{ left: localX, top: localY }"
  >
    <slot></slot>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'UiPopup',
  components: {
    UiGrid,
  },
  props: {
    anchor: {
      type: Object,
      required: false,
      default: null,
    },
    position: {
      type: String,
      required: false,
      default: 'left-top',
      validator(val) {
        return [
          'left-top',
          'left-bottom',
          'right-top',
          'right-bottom',
        ].includes(val);
      },
    },
    contentClass: {
      type: String,
      required: false,
      default: '',
    },
    x: {
      type: Number,
      required: false,
      default: null,
    },
    y: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      localX: 0,
      localY: 0,
      show: false,
      forceClose: false,
    };
  },
  computed: {
    root() {
      return this.anchor?.root?.getBoundingClientRect();
    },
  },
  mounted() {
    this.updatePos();
  },
  updated() {
    this.updatePos();
  },
  methods: {
    updatePos() {
      const contentRect = this.$el.getBoundingClientRect();

      if (this.x !== null && this.y !== null) {
        const popupWidth = contentRect.width;
        const popupHeight = contentRect.height;

        const maxAvailableWidth = window.innerWidth;
        const maxAvailableHeight = window.innerHeight;

        const x =
          this.x + popupWidth > maxAvailableWidth
            ? this.x - popupWidth
            : this.x;
        const y =
          this.y + popupHeight > maxAvailableHeight
            ? this.y - popupHeight
            : this.y;

        this.localX = `${x}px`;
        this.localY = `${y}px`;

        this.show = true;
        return;
      }

      if (!this.root) return;

      const x =
        window.scrollX +
        (this.position === 'left-top' || this.position === 'left-bottom'
          ? this.root.left
          : this.root.left + this.root.width);

      const y =
        window.scrollY +
        (this.position === 'left-top' || this.position === 'right-top'
          ? this.root.top
          : this.root.top + this.root.height);

      const anchorWidth = this.root.width;
      const anchorHeight = this.root.height;

      const maxWidth = window.innerWidth + window.scrollX;
      const maxHeight = window.innerHeight + window.scrollY;

      const diffX =
        x + contentRect.width > maxWidth ? maxWidth - x - contentRect.width : 0;

      const diffY =
        y + contentRect.height > maxHeight
          ? maxHeight - y - contentRect.height
          : 0;

      if (diffX < 0) this.localX = `${x - contentRect.width - anchorWidth}px`;
      else this.localX = `${x}px`;

      if (diffY < 0) this.localY = `${y - contentRect.height - anchorHeight}px`;
      else this.localY = `${y}px`;

      this.show = true;
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

<template>
  <portal to="modals-location">
    <ui-grid
      v-if="open"
      class="ui-popup"
      :style="{ left: localX, top: localY }"
    >
      <div
        ref="content"
        tabindex="-1"
        direction="column"
        @blur.prevent="handleBackgroundClick"
      >
        <slot></slot>
      </div>
    </ui-grid>
  </portal>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'UiPopup',
  components: {
    UiGrid,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
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
      requird: false,
      default: null,
    },
  },
  data() {
    return {
      localX: 0,
      localY: 0,
    };
  },
  computed: {
    root() {
      return this.anchor?.root?.getBoundingClientRect();
    },
  },
  watch: {
    open() {
      if (this.open) {
        this.$nextTick(() => {
          this.$nextTick(() => {
            this.$refs.content.focus();
          });
        });
      }
    },
  },
  beforeUpdate() {
    this.updatePos();
  },
  mounted() {
    this.updatePos();
  },
  methods: {
    handleBackgroundClick() {
      this.$emit('close');
    },
    updatePos() {
      if (this.x !== null && this.y !== null) {
        this.localX = `${this.x}px`;
        this.localY = `${this.y}px`;
        return;
      }

      if (!this.anchor || !this.$refs.content) return;

      const rect = this.$refs.content.$el.getBoundingClientRect();

      const x =
        this.position === 'left-top' || this.position === 'left-bottom'
          ? this.root.left
          : this.root.left + this.root.width;

      const y =
        this.position === 'left-top' || this.position === 'right-top'
          ? this.root.top
          : this.root.top + this.root.height;

      const width = this.root.width;
      const height = this.root.height;

      const maxWidth = window.innerWidth;
      const maxHeight = window.innerHeight;

      const diffX = x + rect.width > maxWidth ? maxWidth - x - rect.width : 0;
      const diffY =
        y + rect.height > maxHeight ? maxHeight - y - rect.height : 0;

      if (diffX < 0) this.localX = `${x - rect.width + width}px`;
      else this.localX = `${x}px`;

      if (diffY < 0) this.localY = `${y - rect.height + height}px`;
      else this.localY = `${y}px`;
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

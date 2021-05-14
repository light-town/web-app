<template>
  <ui-grid>
    <slot v-if="isTableContentViewWay" name="table"></slot>
    <slot v-if="isGridContentViewWay" name="grid"></slot>
  </ui-grid>
</template>

<script>
import { mapState } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import * as ContentViewWays from '~/store/config/content-view-ways';

export default {
  name: 'ContentViewer',
  components: {
    UiGrid,
  },
  computed: {
    ...mapState({
      currentContentViewWay: state => state.config.contentViewWay,
    }),
    isTableContentViewWay() {
      return this.currentContentViewWay === ContentViewWays.TABLE;
    },
    isGridContentViewWay() {
      return this.currentContentViewWay === ContentViewWays.GRID;
    },
  },
};
</script>

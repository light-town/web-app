<template>
  <ui-grid class="ui-w-full ui-h-full ui-overflow-auto">
    <slot v-if="isTableContentViewWay" name="table"></slot>
    <slot v-if="isGridContentViewWay" name="grid"></slot>
  </ui-grid>
</template>

<script>
import { mapState } from 'vuex';
import { UiGrid } from '@light-town/ui';
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

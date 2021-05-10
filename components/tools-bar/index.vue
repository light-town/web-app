<template>
  <ui-grid align-items="center" justify="space-between" class="tools-bar">
    <slot></slot>
    <ui-grid align-items="center" justify="flex-end" class="tools-bar__btns">
      <ui-button
        variant="text"
        class="tools-bar__btn"
        @click="changeContentView"
      >
        <menu-icon v-if="isGridContentViewWay" class="tools-bar__btn-icon" />
        <list-icon
          v-else-if="isTableContentViewWay"
          class="tools-bar__btn-icon"
        />
      </ui-button>
      <ui-button variant="text" class="tools-bar__btn">
        <info-icon class="tools-bar__btn-icon" />
      </ui-button>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import InfoIcon from '~/assets/info.svg?inline';
import MenuIcon from '~/assets/menu.svg?inline';
import ListIcon from '~/assets/list.svg?inline';
import * as configActionTypes from '~/store/config/types';
import * as ContentViewWays from '~/store/config/content-view-ways';

export default {
  name: 'ToolsBar',
  components: {
    UiGrid,
    UiButton,
    InfoIcon,
    MenuIcon,
    ListIcon,
  },
  computed: {
    ...mapState({
      contentViewWay: state => state.config.contentViewWay,
    }),
    isTableContentViewWay() {
      return this.contentViewWay === ContentViewWays.TABLE;
    },
    isGridContentViewWay() {
      return this.contentViewWay === ContentViewWays.GRID;
    },
  },
  created() {
    this.loadContentViewWay();
  },
  updated() {
    this.loadContentViewWay();
  },
  methods: {
    ...mapActions({
      loadContentViewWay: configActionTypes.LOAD_CONTENT_VIEW_WAY,
      setContentViewWay: configActionTypes.SET_CONTENT_VIEW_WAY,
    }),
    changeContentView() {
      this.setContentViewWay({
        way:
          this.contentViewWay === ContentViewWays.GRID
            ? ContentViewWays.TABLE
            : ContentViewWays.GRID,
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

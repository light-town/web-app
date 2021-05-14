<template>
  <ui-grid align-items="center" class="app-page-navbar">
    <ui-grid align-items="center" class="app-page-nav__new-element-btn">
      <new-element-button />
    </ui-grid>
    <app-page-nav :items="items">
      <template v-for="item in items" #[`item-icon-template(${item.name})`]>
        <component
          :is="item.icon"
          :key="item.name"
          class="app-page-nav__list-item-icon"
        />
      </template>
    </app-page-nav>
    <ui-grid
      v-if="showToolBtns"
      align-items="center"
      justify="flex-end"
      class="app-page-nav__tool-btns"
    >
      <ui-button
        variant="text"
        class="app-page-nav__tool-btn"
        @click="changeContentView"
      >
        <menu-icon
          v-if="isGridContentViewWay"
          class="app-page-nav__tool-btn-icon"
        />
        <list-icon
          v-else-if="isTableContentViewWay"
          class="app-page-nav__tool-btn-icon"
        />
      </ui-button>
      <ui-button variant="text" class="app-page-nav__tool-btn">
        <info-icon class="app-page-nav__tool-btn-icon" />
      </ui-button>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppPageNav from '../nav/index.vue';
import NewElementButton from '../new-element-button/index.vue';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiBadge from '~/ui/badge/index.vue';
import CubeOfNotesStackIcon from '~/assets/cube-of-notes-stack.svg?inline';
import TeamsIcon from '~/assets/share.svg?inline';
import ClockIcon from '~/assets/clock.svg?inline';
import StarIcon from '~/assets/star.svg?inline';
import TrashIcon from '~/assets/trash.svg?inline';
import InfoIcon from '~/assets/info.svg?inline';
import MenuIcon from '~/assets/menu.svg?inline';
import ListIcon from '~/assets/list.svg?inline';
import * as configActionTypes from '~/store/config/types';
import * as ContentViewWays from '~/store/config/content-view-ways';

export const NavigationListItemEnum = {
  MY_VAULTS: 'My Vaults',
  TEAMS: 'Teams',
  RECENT: 'Recent',
  STARRED: 'Starred',
  BIN: 'Bin',
};

export default {
  name: 'AccountNavbar',
  components: {
    UiGrid,
    UiButton,
    UiBadge,
    CubeOfNotesStackIcon,
    TeamsIcon,
    ClockIcon,
    StarIcon,
    TrashIcon,
    AppPageNav,
    NewElementButton,
    InfoIcon,
    MenuIcon,
    ListIcon,
  },
  props: {
    showToolBtns: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapState({
      contentViewWay: state => state.config.contentViewWay,
      vaults: state => Object.values(state.vaults.all),
    }),
    vaultsNumber() {
      return this.vaults.length;
    },
    teamsNumber() {
      return 0;
    },
    isTableContentViewWay() {
      return this.contentViewWay === ContentViewWays.TABLE;
    },
    isGridContentViewWay() {
      return this.contentViewWay === ContentViewWays.GRID;
    },
    items() {
      return [
        {
          name: this.$t(NavigationListItemEnum.MY_VAULTS),
          count: this.vaultsNumber,
          icon: 'cube-of-notes-stack-icon',
          href: '/vaults',
          active: /^\/vaults\/?/.test(this.$route.path),
        },
        {
          name: this.$t(NavigationListItemEnum.TEAMS),
          count: this.teamsNumber,
          icon: 'teams-icon',
          href: '/teams',
          active: /^\/teams\/?/.test(this.$route.path),
        },
        {
          name: this.$t(NavigationListItemEnum.RECENT),
          count: 0,
          icon: 'clock-icon',
          href: '/recent',
          active: this.$route.path === '/recent',
        },
        {
          name: this.$t(NavigationListItemEnum.STARRED),
          count: 0,
          icon: 'star-icon',
          href: '/starred',
          active: this.$route.path === '/starred',
        },
        {
          name: this.$t(NavigationListItemEnum.BIN),
          count: 0,
          icon: 'trash-icon',
          href: '/bin',
          active: this.$route.path === '/bin',
        },
      ];
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

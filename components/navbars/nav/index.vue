<template>
  <ui-grid align-items="center" component="nav" class="app-page-nav">
    <ui-grid align-items="center" component="ul" class="app-page-nav__list">
      <ui-button
        v-for="item in items"
        :key="item.name"
        component="li"
        variant="text"
        class="app-page-nav__list-item"
        :class="{ 'app-page-nav__list-item_active': item.active }"
      >
        <slot :name="`item-icon-template(${item.name})`"></slot>
        <p class="app-page-nav__list-item-text">{{ item.name }}</p>
        <ui-badge v-if="item.count > 0" variant="contained" color="green">
          {{ item.count }}
        </ui-badge>
        <NuxtLink
          :to="item.href"
          class="app-page-nav__list-item-link"
        ></NuxtLink>
      </ui-button>
    </ui-grid>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiBadge from '~/ui/badge/index.vue';

export default {
  name: 'AppPageNav',
  components: {
    UiGrid,
    UiButton,
    UiBadge,
  },
  props: {
    vaultsNumber: {
      type: Number,
      required: false,
      default: 0,
    },
    teamsNumber: {
      type: Number,
      required: false,
      default: 0,
    },
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

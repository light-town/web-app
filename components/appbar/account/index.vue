<template>
  <ui-grid align-items="center" class="appbar__account">
    <ui-avatar
      name="Michael"
      :size="44"
      class="appbar__account-icon"
    ></ui-avatar>
    <p class="appbar__account-text">Michail Shcherbakov</p>
    <arrow-icon class="appbar__account-btn"></arrow-icon>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiAvatar from '~/ui/avatar/index.vue';
import ArrowIcon from '~/assets/right-arrow.svg?inline';

export default {
  name: 'Account',
  components: {
    UiGrid,
    UiAvatar,
    ArrowIcon,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

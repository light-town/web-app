<template>
  <ui-grid class="vault" direction="column">
    <ui-grid class="vault__overview" direction="column">
      <ui-skeleton width="44px" height="44px" radius="4px"></ui-skeleton>
      <ui-skeleton width="156px" height="30px" radius="4px"></ui-skeleton>
      <ui-skeleton width="60px" height="16px" radius="4px"></ui-skeleton>
      <ui-skeleton width="100px" height="16px" radius="4px"></ui-skeleton>
    </ui-grid>
    <ui-grid class="vault__controls">
      <ui-grid
        class="control-btn_skeleton"
        align-items="center"
        justify="center"
      >
        <ui-skeleton width="94px" height="18px" radius="4px"></ui-skeleton>
      </ui-grid>
      <ui-grid
        class="control-btn_skeleton"
        align-items="center"
        justify="center"
      >
        <ui-skeleton width="94px" height="18px" radius="4px"></ui-skeleton>
      </ui-grid>
    </ui-grid>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiSkeleton from '~/ui/skeleton/index.vue';

export default {
  name: 'Vault',
  components: {
    UiGrid,
    UiSkeleton,
  },
};
</script>

<style lang="scss" src="../index.scss"></style>

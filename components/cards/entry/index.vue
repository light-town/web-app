<template>
  <ui-card class="entry-card" v-bind="$attrs" v-on="$listeners">
    <template #header>
      <ui-grid
        direction="row-reverse"
        align-items="center"
        justify="space-between"
        class="entry-card__header"
      >
        <ui-button variant="text" class="entry-card__edit-btn">
          <more-icon class="entry-card__edit-btn-icon"></more-icon>
        </ui-button>
      </ui-grid>
    </template>
    <template #body>
      <ui-grid
        direction="column"
        align-items="center"
        justify="space-between"
        class="entry-card__body"
      >
        <slot name="body"></slot>
      </ui-grid>
    </template>
    <template #footer>
      <ui-grid align-items="center" justify="center" class="entry-card__footer">
        <slot name="footer"></slot>
      </ui-grid>
    </template>
  </ui-card>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiCard from '~/ui/card/index.vue';
import UiButton from '~/ui/button/index.vue';
import MoreIcon from '~/assets/more.svg?inline';

export default {
  name: 'EntryCard',
  components: {
    UiGrid,
    UiCard,
    UiButton,
    MoreIcon,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

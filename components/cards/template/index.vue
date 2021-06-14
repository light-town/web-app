<template>
  <ui-card class="template-card" v-bind="$attrs" v-on="$listeners">
    <template #header>
      <ui-grid
        direction="row-reverse"
        align-items="center"
        justify="space-between"
        class="template-card__header"
      >
        <slot name="header">
          <ui-button variant="text" class="template-card__edit-btn">
            <more-icon class="template-card__edit-btn-icon"></more-icon>
          </ui-button>
        </slot>
      </ui-grid>
    </template>
    <template #body>
      <ui-grid
        direction="column"
        align-items="center"
        justify="space-between"
        class="template-card__body"
      >
        <slot name="body"></slot>
      </ui-grid>
    </template>
    <template #footer>
      <ui-grid
        align-items="center"
        justify="center"
        class="template-card__footer"
      >
        <slot name="footer"></slot>
      </ui-grid>
    </template>
  </ui-card>
</template>

<script>
import { UiGrid, UiCard, UiButton } from '@light-town/ui';
import MoreIcon from '~/assets/more.svg?inline';

export default {
  name: 'TemplateCard',
  components: {
    UiGrid,
    UiCard,
    UiButton,
    MoreIcon,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

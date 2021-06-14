<template>
  <template-card class="showcase-card">
    <template #header>
      <ui-grid align-items="center" justify="center"> </ui-grid
    ></template>
    <template #body>
      <ui-grid align-items="center" justify="center">
        <showcase-illustration
          class="showcase-card__illustrate"
        ></showcase-illustration>
      </ui-grid>
    </template>
    <template #footer>
      <ui-grid
        align-items="center"
        justify="center"
        class="showcase-card__footer"
      >
        <template v-if="variant === 'folder'">
          <add-item-button></add-item-button>
          <add-folder-button></add-folder-button>
        </template>
        <template v-else-if="variant === 'vault'">
          <add-vault-button></add-vault-button>
        </template>
      </ui-grid>
    </template>
  </template-card>
</template>

<script>
import { UiGrid } from '@light-town/ui';
import AddFolderButton from './add-folder-button.vue';
import AddItemButton from './add-item-button.vue';
import AddVaultButton from './add-vault-button.vue';
import TemplateCard from '~/components/cards/template/index.vue';
import ShowcaseIllustration from '~/assets/illustrations/showcase.svg?inline';

export default {
  name: 'PrimaryCard',
  components: {
    UiGrid,
    TemplateCard,
    ShowcaseIllustration,
    AddFolderButton,
    AddItemButton,
    AddVaultButton,
  },
  props: {
    variant: {
      type: String,
      required: false,
      default: 'vault',
      validator(val) {
        return ['folder', 'vault', 'team'];
      },
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

<template>
  <ui-grid
    direction="column"
    align-items="center"
    justify="center"
    class="empty-vault-stub"
  >
    <empty-vault-icon class="empty-vault-stub__illustrate" />
    <ui-grid
      direction="column"
      align-items="center"
      class="empty-vault-stub__text"
    >
      <p class="empty-vault-stub__title">
        {{ $t('Your vault is empty') }}
      </p>
      <p class="empty-vault-stub__desc">
        {{ $t('To create a folder or item, right-click on an empty space') }}
      </p>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { UiGrid } from '@light-town/ui';
import EmptyVaultIcon from '~/assets/empty-folder.svg?inline';

export default {
  name: 'EmptyVaultStub',
  components: {
    UiGrid,
    EmptyVaultIcon,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

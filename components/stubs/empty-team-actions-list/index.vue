<template>
  <ui-grid
    direction="column"
    align-items="center"
    justify="center"
    class="empty-vault-stub"
  >
    <empty-team-list-illustration class="empty-vault-stub__illustrate" />
    <ui-grid
      direction="column"
      align-items="center"
      class="empty-vault-stub__text"
    >
      <p class="empty-vault-stub__title">
        {{ $t(`Activity log is empty`) }}
      </p>
      <p class="empty-vault-stub__desc">
        {{
          $t('None of the members have performed any actions in the team yet')
        }}
      </p>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { UiGrid } from '@light-town/ui';
import EmptyTeamListIllustration from '~/assets/document.svg?inline';

export default {
  name: 'EmptyTeamListStub',
  components: {
    UiGrid,
    EmptyTeamListIllustration,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

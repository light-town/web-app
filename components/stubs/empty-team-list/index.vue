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
        {{ $t(`You haven't joined any teams yet`) }}
      </p>
      <p class="empty-vault-stub__desc">
        {{ $t('To create a team, right-click on an empty space') }}
      </p>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { UiGrid } from '@light-town/ui';
import EmptyTeamListIllustration from '~/assets/illustrations/team.svg?inline';

export default {
  name: 'EmptyVaultStub',
  components: {
    UiGrid,
    EmptyTeamListIllustration,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

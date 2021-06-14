<template>
  <ui-grid>
    <ui-dropdown :loading="loading">
      <template #anchor="{ open }">
        <ui-button variant="outlined" class="new-element-button" @click="open">
          <add-icon class="new-element-button__icon" />
          <p class="new-element-button__text">{{ $t('New') }}</p>
        </ui-button>
      </template>
      <template #dropdown-items="{ close }">
        <ui-menu-item id="team" @click="handleDropdownItemClick($event, close)">
          <template #text>
            {{ $t('Team') }}
          </template>
        </ui-menu-item>
      </template>
    </ui-dropdown>
    <new-team-modal
      :open="showNewTeamModal"
      @close="showNewTeamModal = false"
    />
  </ui-grid>
</template>
<script>
import { UiGrid, UiButton, UiDropdown, UiMenuItem } from '@light-town/ui';
import AddIcon from '~/assets/add.svg?inline';
import NewTeamModal from '~/components/modals/new-team/index.vue';

export default {
  name: 'CreationTeamsButton',
  components: {
    UiGrid,
    UiButton,
    UiDropdown,
    UiMenuItem,
    AddIcon,
    NewTeamModal,
  },
  data() {
    return {
      showNewTeamModal: false,
      loading: false,
    };
  },
  methods: {
    handleDropdownItemClick(e, close) {
      this.showNewTeamModal = true;
      close(e);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

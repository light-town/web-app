<template>
  <ui-grid direction="column" class="sidebar__menu">
    <ui-button variant="text" class="sidebar__menu-item">
      <ui-grid align-items="center">
        <home-icon class="sidebar__menu-item-icon"></home-icon>
        <p class="sidebar__menu-item-text">Overview</p>
      </ui-grid>
    </ui-button>
    <ui-button
      variant="text"
      :class="[
        'sidebar__menu-item',
        { 'sidebar__menu-item_active': vaultPage },
      ]"
    >
      <ui-grid align-items="center">
        <supplies-icon class="sidebar__menu-item-icon"></supplies-icon>
        <p class="sidebar__menu-item-text">Vaults</p>
      </ui-grid>
    </ui-button>
    <ui-button variant="text" class="sidebar__menu-item"
      ><ui-grid align-items="center">
        <teams-icon class="sidebar__menu-item-icon"></teams-icon>
        <p class="sidebar__menu-item-text">Teams</p>
      </ui-grid>
    </ui-button>
    <ui-button variant="text" class="sidebar__menu-item">
      <ui-grid align-items="center">
        <question-icon class="sidebar__menu-item-icon"></question-icon>
        <p class="sidebar__menu-item-text">Help Center</p>
      </ui-grid>
    </ui-button>
    <ui-button variant="text" class="sidebar__menu-item"
      ><ui-grid align-items="center">
        <settings-icon class="sidebar__menu-item-icon"></settings-icon>
        <p class="sidebar__menu-item-text">Settings</p>
      </ui-grid>
    </ui-button>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import HomeIcon from '~/assets/home.svg?inline';
import QuestionIcon from '~/assets/question.svg?inline';
import TeamsIcon from '~/assets/share.svg?inline';
import SuppliesIcon from '~/assets/supplies.svg?inline';
import SettingsIcon from '~/assets/settings.svg?inline';

export default {
  name: 'Menu',
  components: {
    UiGrid,
    UiButton,
    HomeIcon,
    QuestionIcon,
    TeamsIcon,
    SuppliesIcon,
    SettingsIcon,
  },
  computed: {
    vaultPage() {
      return this.$route.name === 'vaults';
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

<template>
  <ui-grid component="ul" direction="column" class="sidebar__menu">
    <ui-button
      component="li"
      variant="text"
      class="sidebar__menu-item"
      @click="redirect('/overview')"
    >
      <ui-grid direction="column" align-items="center" justify="center">
        <home-icon class="sidebar__menu-item-icon"></home-icon>
        <p class="sidebar__menu-item-text">Overview</p>
      </ui-grid>
    </ui-button>
    <ui-button
      component="li"
      variant="text"
      :class="[
        'sidebar__menu-item',
        { 'sidebar__menu-item_active': vaultsPage },
      ]"
      @click="$router.push('/vaults')"
    >
      <ui-grid direction="column" align-items="center" justify="center">
        <supplies-icon class="sidebar__menu-item-icon"></supplies-icon>
        <p class="sidebar__menu-item-text">Vaults</p>
      </ui-grid>
    </ui-button>
    <ui-button
      component="li"
      variant="text"
      :class="[
        'sidebar__menu-item',
        { 'sidebar__menu-item_active': teamsPage },
      ]"
      @click="$router.push('/teams')"
    >
      <ui-grid direction="column" align-items="center" justify="center">
        <teams-icon class="sidebar__menu-item-icon"></teams-icon>
        <p class="sidebar__menu-item-text">Teams</p>
      </ui-grid>
    </ui-button>
    <ui-button component="li" variant="text" class="sidebar__menu-item">
      <ui-grid direction="column" align-items="center" justify="center">
        <question-icon class="sidebar__menu-item-icon"></question-icon>
        <p class="sidebar__menu-item-text">Help</p>
      </ui-grid>
    </ui-button>
    <ui-button component="li" variant="text" class="sidebar__menu-item">
      <ui-grid direction="column" align-items="center" justify="center">
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
    vaultsPage() {
      return /^\/vaults\/?/.test(this.$route.path);
    },
    teamsPage() {
      return /^\/teams\/?/.test(this.$route.path);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

<template>
  <ui-grid class="vault" direction="column">
    <ui-grid class="vault__overview" direction="column">
      <ui-avatar :name="title" :size="44" class="vault__icon"></ui-avatar>
      <p class="vault__title">{{ title }}</p>
      <p class="vault__items">
        <span>{{ items }}</span> {{ $t('items') }}
      </p>
      <p class="vault__desc">{{ desc }}</p>
    </ui-grid>
    <ui-grid class="vault__controls">
      <ui-button
        variant="text"
        class="control-btn"
        @click="handleManageBtnClick"
      >
        <ui-grid align-items="center" justify="center">
          <settings-icon class="control-btn__icon"></settings-icon>
          <p class="control-btn__text">{{ $t('Manage') }}</p>
        </ui-grid>
      </ui-button>
      <ui-button
        variant="text"
        class="control-btn"
        @click="handleOpenVaultBtnClick"
      >
        <ui-grid align-items="center" justify="center">
          <p class="control-btn__text">{{ $t('Open Vault') }}</p>
          <arrow-icon
            class="control-btn__icon control-btn__icon_flip"
          ></arrow-icon>
        </ui-grid>
      </ui-button>
    </ui-grid>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiAvatar from '~/ui/avatar/index.vue';
import SettingsIcon from '~/assets/settings-filled.svg?inline';
import ArrowIcon from '~/assets/right-arrow.svg?inline';

export default {
  name: 'Vault',
  components: {
    UiGrid,
    UiButton,
    UiAvatar,
    SettingsIcon,
    ArrowIcon,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    items: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  methods: {
    handleManageBtnClick(e) {
      this.$emit('manage', e);
    },
    handleOpenVaultBtnClick(e) {
      this.$emit('open-vault', e);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

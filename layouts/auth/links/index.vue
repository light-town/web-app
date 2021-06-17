<template>
  <ui-grid align-items="center" justify="space-between" class="links">
    <select-languages></select-languages>
    <ui-grid class="links__support">
      <ui-button variant="text" class="links__btn">{{ $t('Help') }}</ui-button>
      <ui-button
        variant="text"
        class="links__btn"
        @click="redirectToPrivacyPage"
      >
        {{ $t('Privacy') }}
      </ui-button>
      <ui-button variant="text" class="links__btn" @click="redirectToTermsPage">
        {{ $t('Terms') }}
      </ui-button>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { UiGrid, UiButton } from '@light-town/ui';
import SelectLanguages from '../select-language/index.vue';

export default {
  name: 'Links',
  components: {
    UiGrid,
    UiButton,
    SelectLanguages,
  },
  methods: {
    redirectToPrivacyPage() {
      this.$router.push('/legal/privacy');
    },
    redirectToTermsPage() {
      this.$router.push('/legal/terms-of-service');
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

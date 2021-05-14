<template>
  <default-page-template>
    <ui-grid direction="column" class="h-full">
      <appbar class="app-page__appbar" />
      <ui-grid class="app-page__header-layout" direction="column">
        <ui-grid class="app-page__breadcrumbs-layout">
          <slot name="breadcrumbs"></slot>
        </ui-grid>
        <ui-grid class="app-page__title-layout">
          <slot name="title">
            <p v-if="title.length > 0" class="app-page__title">{{ title }}</p>
          </slot>
        </ui-grid>
      </ui-grid>
      <ui-grid class="app-page__nav-layout">
        <slot name="nav"></slot>
      </ui-grid>
      <ui-grid class="app-page__main-layout">
        <slot name="main"></slot>
      </ui-grid>
    </ui-grid>
  </default-page-template>
</template>

<script>
import { mapActions } from 'vuex';
import DefaultPageTemplate from './default-page-template.vue';
import UiGrid from '~/ui/grid/index.vue';
import Appbar from '~/components/appbar/index.vue';
import * as authActionTypes from '~/store/auth/types';
import * as devicesActionTypes from '~/store/devices/types';
import * as accountsActionTypes from '~/store/accounts/types';
import * as cacheActionTypes from '~/store/cache/types';
import * as keySetsActionTypes from '~/store/key-sets/types';

export default {
  name: 'AppPage',
  components: {
    UiGrid,
    Appbar,
    DefaultPageTemplate,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  async created() {
    await this.initCacheService();
    await this.initAuthService();
    await this.initDevicesService();
    await this.initAccountsService();
    await this.loadKeySets();
  },
  methods: {
    ...mapActions({
      initCacheService: cacheActionTypes.INIT,
      initAuthService: authActionTypes.INIT,
      initDevicesService: devicesActionTypes.INIT,
      initAccountsService: accountsActionTypes.INIT,
      loadKeySets: keySetsActionTypes.LOAD_KEY_SETS,
    }),
  },
};
</script>

<style lang="scss">
#app[data-theme-mode='light'] {
  --color-app-page-title-text: var(--color-gray-650);
}

.app-page {
  &__appbar,
  &__header-layout,
  &__nav-layout,
  &__main-layout {
    padding: 0 2.5rem;
  }

  &__nav-layout {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  &__main-layout {
    overflow: auto;
    height: 100%;
  }

  &__header-layout {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  &__title {
    font-size: 2em;
    font-weight: 700;

    color: var(--color-app-page-title-text);
  }
}
</style>

<template>
  <ui-grid align-items="center" class="account" @click="e => $emit('click', e)">
    <user-icon class="account__icon"></user-icon>
    <ui-grid direction="column">
      <p class="account__username">{{ name }}</p>
      <p class="account__key">
        {{ version }}-{{ uuid }} •••••• ••••• ••••• ••••• •••••
      </p>
    </ui-grid>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UserIcon from '~/assets/user.svg?inline';

export default {
  name: 'Account',
  components: {
    UiGrid,
    UserIcon,
  },
  props: {
    version: {
      type: String,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" src="./account.scss"></style>

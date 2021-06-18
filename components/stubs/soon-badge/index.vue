<template>
  <ui-badge :title="$t('Soon')"></ui-badge>
</template>

<script>
import { UiBadge } from '@light-town/ui';

export default {
  name: 'SoonBadge',
  components: {
    UiBadge,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

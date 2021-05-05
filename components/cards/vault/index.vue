<template>
  <primary-card v-bind="$attrs" v-on="$listeners"></primary-card>
</template>

<script>
import PrimaryCard from '~/components/cards/primary/index.vue';

export default {
  name: 'VaultCard',
  components: {
    PrimaryCard,
  },
};
</script>

<template>
  <primary-card
    label-entries-inside="{n} Members"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import PrimaryCard from '~/components/cards/primary/index.vue';

export default {
  name: 'TeamCard',
  components: {
    PrimaryCard,
  },
};
</script>

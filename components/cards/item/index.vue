<template>
  <secondary-card v-bind="$attrs" v-on="$listeners"></secondary-card>
</template>

<script>
import SecondaryCard from '~/components/cards/secondary/index.vue';

export default {
  name: 'ItemCard',
  components: {
    SecondaryCard,
  },
};
</script>

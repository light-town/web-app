<template>
  <ui-grid></ui-grid>
</template>

<script>
import { UiGrid } from '@light-town/ui';

export default {
  components: {
    UiGrid,
  },
  mounted() {
    this.$router.push('/sign-in/identifier');
  },
};
</script>

<template>
  <div>
    <div>
      <p>Contained buttons</p>
      <ui-button variant="contained">Button</ui-button>
      <ui-button variant="contained" disabled>Button</ui-button>
    </div>
    <div>
      <p>Outlined buttons</p>
      <ui-button variant="outlined">Button</ui-button>
      <ui-button variant="outlined" disabled>Button</ui-button>
    </div>
    <div>
      <p>Text buttons</p>
      <ui-button variant="text">Button</ui-button>
      <ui-button variant="text" disabled>Button</ui-button>
    </div>
  </div>
</template>

<script>
import UiButton from '~/ui/button/index.vue';

export default {
  name: 'IndexPage',
  components: {
    UiButton,
  },
};
</script>

<style></style>

<template>
  <ui-grid direction="column">
    <ui-grid>
      <ui-grid direction="column">
        <p>Contained buttons</p>
        <ui-grid direction="column">
          <p>Naturally</p>
          <ui-button variant="contained">Button</ui-button>
        </ui-grid>
        <ui-grid direction="column">
          <p>Disabled</p>
          <ui-button variant="contained" disabled>Button</ui-button>
        </ui-grid>
      </ui-grid>
      <ui-grid direction="column">
        <p>Outlined buttons</p>
        <ui-grid direction="column">
          <p>Naturally</p>
          <ui-button variant="outlined">Button</ui-button>
        </ui-grid>
        <ui-grid direction="column">
          <p>Disabled</p>
          <ui-button variant="outlined" disabled>Button</ui-button>
        </ui-grid>
      </ui-grid>
      <ui-grid direction="column">
        <p>Text buttons</p>
        <ui-grid direction="column">
          <p>Naturally</p>
          <ui-button variant="text">Button</ui-button>
        </ui-grid>
        <ui-grid direction="column">
          <p>Disabled</p>
          <ui-button variant="text" disabled>Button</ui-button>
        </ui-grid>
      </ui-grid>
    </ui-grid>
    <ui-grid direction="column">
      <p>Input</p>
      <ui-input type="text" placeholder="Enter Account Key"></ui-input>
    </ui-grid>
  </ui-grid>
</template>

<script>
import UiButton from '~/ui/button/index.vue';
import UiGrid from '~/ui/grid/index.vue';
import UiInput from '~/ui/input/index.vue';

export default {
  name: 'IndexPage',
  components: {
    UiButton,
    UiGrid,
    UiInput,
  },
};
</script>

<style></style>

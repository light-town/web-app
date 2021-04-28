<template>
  <portal to="modals-location">
    <ui-grid v-if="open" class="ui-modal" align-items="center" justify="center">
      <ui-grid
        class="ui-modal__background"
        @click="handleBackgroundClick"
      ></ui-grid>
      <ui-grid class="ui-modal__content" direction="column">
        <ui-grid class="ui-modal__header">
          <slot name="header">
            <p class="ui-modal__header-title">{{ title }}</p>
          </slot>
        </ui-grid>
        <ui-grid class="ui-modal__body">
          <slot></slot>
        </ui-grid>
        <ui-grid class="ui-modal__footer" justify="flex-end">
          <slot name="footer">
            <ui-button variant="outlined" @click="$emit('canceled', $event)">{{
              $t('Cancel')
            }}</ui-button>
            <ui-button variant="contained" @click="$emit('granted', $event)">{{
              $t('Ok')
            }}</ui-button>
          </slot>
        </ui-grid>
      </ui-grid>
    </ui-grid>
  </portal>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';

export default {
  name: 'UiModal',
  components: {
    UiGrid,
    UiButton,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  methods: {
    handleBackgroundClick(e) {
      this.$emit('close', e);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>

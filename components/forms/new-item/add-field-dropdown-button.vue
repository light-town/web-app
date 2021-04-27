<template>
  <ui-dropdown
    :title="title"
    :items="items"
    @dropdown-item-click="item => $emit('dropdown-item-click', item)"
  >
    <template #anchor="{ open }">
      <ui-button
        variant="outlined"
        class="button-item-field__btn new-item-form__add-field-btn"
        @click="open"
      >
        {{ title }}
      </ui-button>
    </template>
  </ui-dropdown>
</template>

<script>
import UiButton from '~/ui/button/index.vue';
import UiDropdown from '~/ui/dropdown/index.vue';

export default {
  name: 'AddItemDropdownButton',
  components: {
    UiButton,
    UiDropdown,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      title: this.$t('Add field'),
    };
  },
};
</script>

<style lang="scss"></style>
